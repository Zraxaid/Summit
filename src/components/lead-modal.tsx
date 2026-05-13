"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import { siteCopy } from "@/lib/copy";

type LeadFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  birthday: string;
  licensed: string;
  relocate: string;
  notes: string;
  consent: boolean;
};

type LeadFormField = keyof LeadFormState;
type FieldErrors = Partial<Record<LeadFormField, string>>;
type TouchedState = Partial<Record<LeadFormField, boolean>>;

const initialState: LeadFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  birthday: "",
  licensed: "",
  relocate: "",
  notes: "",
  consent: false,
};

const requiredLabels: Record<Exclude<LeadFormField, "notes">, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone",
  location: "Location",
  birthday: "Birthday",
  licensed: "Licensing status",
  relocate: "Relocation preference",
  consent: "Consent",
};

const requiredFields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "location",
  "birthday",
  "licensed",
  "relocate",
] as const;

function getErrors(state: LeadFormState) {
  const errors: FieldErrors = {};

  for (const key of requiredFields) {
    if (!state[key]) {
      errors[key] = `${requiredLabels[key]} is required.`;
    }
  }

  if (state.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!state.consent) {
    errors.consent = "You must accept the terms and privacy policy.";
  }

  return errors;
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  const selector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "textarea:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (element) =>
      !element.hasAttribute("hidden") &&
      element.getAttribute("aria-hidden") !== "true" &&
      !element.closest("[hidden]"),
  );
}

export function LeadModal({
  isOpen,
  onClose,
  returnFocusTarget,
}: {
  isOpen: boolean;
  onClose: () => void;
  returnFocusTarget: HTMLElement | null;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const statusId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState(initialState);
  const [touched, setTouched] = useState<TouchedState>({});
  const [forceShowAllErrors, setForceShowAllErrors] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error" | "submitting";
    message: string;
  }>({ type: "idle", message: "" });

  const errors = useMemo(() => getErrors(form), [form]);

  const visibleErrors = useMemo(() => {
    const nextErrors: FieldErrors = {};

    (Object.entries(errors) as Array<[LeadFormField, string]>).forEach(([key, value]) => {
      if (value && (forceShowAllErrors || touched[key])) {
        nextErrors[key] = value;
      }
    });

    return nextErrors;
  }, [errors, forceShowAllErrors, touched]);

  const canSubmit = useMemo(() => {
    if (status.type === "submitting") {
      return false;
    }

    return Object.keys(errors).length === 0;
  }, [errors, status.type]);

  const handleDismiss = useCallback(() => {
    setTouched({});
    setForceShowAllErrors(false);
    setStatus({ type: "idle", message: "" });
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleDismiss();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements(dialogRef.current);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      returnFocusTarget?.focus();
    };
  }, [handleDismiss, isOpen, returnFocusTarget]);

  if (!isOpen) {
    return null;
  }

  function updateField<Key extends LeadFormField>(
    key: Key,
    value: LeadFormState[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setStatus((current) =>
      current.type === "error" ? { type: "idle", message: "" } : current,
    );
  }

  function markTouched<Key extends LeadFormField>(key: Key) {
    setTouched((current) => ({ ...current, [key]: true }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setForceShowAllErrors(true);

    if (Object.keys(errors).length > 0) {
      setStatus({
        type: "error",
        message: siteCopy.global.modal.formErrorSummary,
      });

      const firstErrorKey = (Object.keys(errors) as LeadFormField[])[0];
      const dialog = dialogRef.current;

      if (dialog && firstErrorKey) {
        const target = dialog.querySelector<HTMLElement>(
          `[aria-invalid="true"], [name="${firstErrorKey}"]`,
        );
        target?.focus({ preventScroll: false });
      }

      return;
    }

    setStatus({
      type: "submitting",
      message: siteCopy.global.modal.statusSubmitting,
    });

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { ok: boolean; message: string };

      if (!response.ok || !payload.ok) {
        setStatus({ type: "error", message: payload.message });
        return;
      }

      setForm(initialState);
      setTouched({});
      setForceShowAllErrors(false);
      setStatus({ type: "success", message: payload.message });
    } catch {
      setStatus({
        type: "error",
        message: siteCopy.global.modal.submitError,
      });
    }
  }

  function errorId(field: LeadFormField) {
    return `${titleId}-${field}-error`;
  }

  return (
    <div
      className="modal-backdrop"
      onClick={handleDismiss}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={handleDismiss}
          aria-label={siteCopy.global.modal.closeAriaLabel}
        >
          ×
        </button>

        <p className="eyebrow">{siteCopy.global.modal.eyebrow}</p>
        <h2 id={titleId}>{siteCopy.global.modal.headline}</h2>
        <p id={descriptionId}>
          {siteCopy.global.modal.subhead}
        </p>

        <form className="lead-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>
              <span>{siteCopy.global.modal.fieldLabels[0]}</span>
              <input
                ref={firstInputRef}
                value={form.firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
                onBlur={() => markTouched("firstName")}
                aria-invalid={Boolean(visibleErrors.firstName)}
                aria-describedby={visibleErrors.firstName ? errorId("firstName") : undefined}
                required
              />
              <small id={errorId("firstName")} className="field-error" aria-live="polite">
                {visibleErrors.firstName ?? ""}
              </small>
            </label>

            <label>
              <span>{siteCopy.global.modal.fieldLabels[1]}</span>
              <input
                value={form.lastName}
                onChange={(event) => updateField("lastName", event.target.value)}
                onBlur={() => markTouched("lastName")}
                aria-invalid={Boolean(visibleErrors.lastName)}
                aria-describedby={visibleErrors.lastName ? errorId("lastName") : undefined}
                required
              />
              <small id={errorId("lastName")} className="field-error" aria-live="polite">
                {visibleErrors.lastName ?? ""}
              </small>
            </label>

            <label>
              <span>{siteCopy.global.modal.fieldLabels[2]}</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                onBlur={() => markTouched("email")}
                aria-invalid={Boolean(visibleErrors.email)}
                aria-describedby={visibleErrors.email ? errorId("email") : undefined}
                required
              />
              <small id={errorId("email")} className="field-error" aria-live="polite">
                {visibleErrors.email ?? ""}
              </small>
            </label>

            <label>
              <span>{siteCopy.global.modal.fieldLabels[3]}</span>
              <div className="phone-field">
                <span>US +1</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  onBlur={() => markTouched("phone")}
                  aria-invalid={Boolean(visibleErrors.phone)}
                  aria-describedby={visibleErrors.phone ? errorId("phone") : undefined}
                  required
                />
              </div>
              <small id={errorId("phone")} className="field-error" aria-live="polite">
                {visibleErrors.phone ?? ""}
              </small>
            </label>

            <label>
              <span>{siteCopy.global.modal.fieldLabels[4]}</span>
              <input
                value={form.location}
                onChange={(event) => updateField("location", event.target.value)}
                onBlur={() => markTouched("location")}
                aria-invalid={Boolean(visibleErrors.location)}
                aria-describedby={visibleErrors.location ? errorId("location") : undefined}
                required
              />
              <small id={errorId("location")} className="field-error" aria-live="polite">
                {visibleErrors.location ?? ""}
              </small>
            </label>

            <label>
              <span>{siteCopy.global.modal.fieldLabels[5]}</span>
              <input
                type="date"
                value={form.birthday}
                onChange={(event) => updateField("birthday", event.target.value)}
                onBlur={() => markTouched("birthday")}
                aria-invalid={Boolean(visibleErrors.birthday)}
                aria-describedby={visibleErrors.birthday ? errorId("birthday") : undefined}
                required
              />
              <small id={errorId("birthday")} className="field-error" aria-live="polite">
                {visibleErrors.birthday ?? ""}
              </small>
            </label>
          </div>

          <fieldset>
            <legend>{siteCopy.global.modal.radioGroup1Label}</legend>
            <div className="radio-row">
              {siteCopy.global.modal.radioOptions.map((option) => (
                <label key={option} className="radio-pill">
                  <input
                    type="radio"
                    name="licensed"
                    checked={form.licensed === option}
                    onChange={() => {
                      updateField("licensed", option);
                      markTouched("licensed");
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <small id={errorId("licensed")} className="field-error" aria-live="polite">
              {visibleErrors.licensed ?? ""}
            </small>
          </fieldset>

          <fieldset>
            <legend>{siteCopy.global.modal.radioGroup2Label}</legend>
            <div className="radio-row">
              {siteCopy.global.modal.radioOptions.map((option) => (
                <label key={option} className="radio-pill">
                  <input
                    type="radio"
                    name="relocate"
                    checked={form.relocate === option}
                    onChange={() => {
                      updateField("relocate", option);
                      markTouched("relocate");
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <small id={errorId("relocate")} className="field-error" aria-live="polite">
              {visibleErrors.relocate ?? ""}
            </small>
          </fieldset>

          <label>
            <span>{siteCopy.global.modal.textareaLabel}</span>
            <textarea
              rows={4}
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
            />
          </label>

          <label className="consent-row">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => {
                updateField("consent", event.target.checked);
                markTouched("consent");
              }}
              aria-invalid={Boolean(visibleErrors.consent)}
              aria-describedby={visibleErrors.consent ? errorId("consent") : undefined}
            />
            <span>
              I accept the <Link href="/terms-of-use">{siteCopy.global.footer.legalLinks[0]}</Link> and{" "}
              <Link href="/privacy-policy">{siteCopy.global.footer.legalLinks[1]}</Link>.
            </span>
          </label>

          <small id={errorId("consent")} className="field-error" aria-live="polite">
            {visibleErrors.consent ?? ""}
          </small>

          <div id={statusId} className="form-status" role="status" aria-live="polite">
            {status.message}
          </div>

          {!canSubmit && status.type === "idle" ? (
            <p className="form-helper">{siteCopy.global.modal.submitHelper}</p>
          ) : null}

          <button type="submit" className="button-submit" disabled={!canSubmit}>
            {status.type === "submitting"
              ? siteCopy.global.modal.submittingLabel
              : siteCopy.global.modal.submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
