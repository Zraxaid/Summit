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
  commission: string;
  commitment: string;
  timeline: string;
  motivation: string;
  consent: boolean;
};

type LeadFormField = keyof LeadFormState;
type FieldErrors = Partial<Record<LeadFormField, string>>;
type TouchedState = Partial<Record<LeadFormField, boolean>>;

const MOTIVATION_MIN_LENGTH = 10;

const initialState: LeadFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  birthday: "",
  licensed: "",
  commission: "",
  commitment: "",
  timeline: "",
  motivation: "",
  consent: false,
};

const requiredLabels: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone",
  location: "Location",
  birthday: "Birthday",
  licensed: "Licensing status",
  commission: "Income preference",
  commitment: "Time commitment",
  timeline: "Start timeline",
};

const requiredFields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "location",
  "birthday",
  "licensed",
  "commission",
  "commitment",
  "timeline",
] as const;

// Dropdown qualifier questions, in render order. `key` maps to form state.
const selectQuestions = [
  { key: "licensed", config: siteCopy.global.modal.questions.licensing },
  { key: "commission", config: siteCopy.global.modal.questions.commission },
  { key: "commitment", config: siteCopy.global.modal.questions.commitment },
  { key: "timeline", config: siteCopy.global.modal.questions.timeline },
] as const;

function getErrors(state: LeadFormState) {
  const errors: FieldErrors = {};

  for (const key of requiredFields) {
    if (!state[key]) {
      errors[key] = `${requiredLabels[key]} is required.`;
    }
  }

  if (state.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(state.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (state.phone) {
    const digits = state.phone.replace(/\D+/g, "");

    if (digits.length < 7) {
      errors.phone = "Enter a phone number we can reach you on.";
    }
  }

  if (state.birthday) {
    const date = new Date(state.birthday);

    if (Number.isNaN(date.valueOf()) || date > new Date()) {
      errors.birthday = "Enter a real birthday.";
    }
  }

  const motivation = state.motivation.trim();
  if (motivation.length === 0) {
    errors.motivation = "Tell us a little about why you're reaching out.";
  } else if (motivation.length < MOTIVATION_MIN_LENGTH) {
    errors.motivation = "A sentence or two helps us route you to the right mentor.";
  }

  if (!state.consent) {
    errors.consent = "You must accept the terms and privacy policy.";
  }

  return errors;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

function readUtmFromLocation(): Partial<Record<(typeof UTM_KEYS)[number], string>> {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const result: Partial<Record<(typeof UTM_KEYS)[number], string>> = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);

    if (value) {
      result[key] = value;
    }
  }

  return result;
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
  recruiterSlug = null,
}: {
  isOpen: boolean;
  onClose: () => void;
  returnFocusTarget: HTMLElement | null;
  recruiterSlug?: string | null;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const statusId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);
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
        body: JSON.stringify({
          ...form,
          recruiter: recruiterSlug ?? "summit",
          utm: readUtmFromLocation(),
        }),
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
                name="firstName"
                autoComplete="given-name"
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
                name="lastName"
                autoComplete="family-name"
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
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
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
                  name="phone"
                  type="tel"
                  autoComplete="tel-national"
                  inputMode="tel"
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
                name="location"
                autoComplete="address-level2"
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
                name="birthday"
                type="date"
                autoComplete="bday"
                max={todayIso}
                min="1900-01-01"
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

          {selectQuestions.map(({ key, config }) => (
            <label key={key} className="select-field">
              <span>{config.label}</span>
              <select
                name={key}
                value={form[key]}
                onChange={(event) => {
                  updateField(key, event.target.value);
                  markTouched(key);
                }}
                onBlur={() => markTouched(key)}
                aria-invalid={Boolean(visibleErrors[key])}
                aria-describedby={visibleErrors[key] ? errorId(key) : undefined}
                required
              >
                <option value="" disabled>
                  {siteCopy.global.modal.selectPlaceholder}
                </option>
                {config.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <small id={errorId(key)} className="field-error" aria-live="polite">
                {visibleErrors[key] ?? ""}
              </small>
            </label>
          ))}

          <label>
            <span>{siteCopy.global.modal.motivationLabel}</span>
            <textarea
              name="motivation"
              rows={4}
              placeholder={siteCopy.global.modal.motivationPlaceholder}
              value={form.motivation}
              onChange={(event) => updateField("motivation", event.target.value)}
              onBlur={() => markTouched("motivation")}
              aria-invalid={Boolean(visibleErrors.motivation)}
              aria-describedby={visibleErrors.motivation ? errorId("motivation") : undefined}
              required
            />
            <small id={errorId("motivation")} className="field-error" aria-live="polite">
              {visibleErrors.motivation ?? ""}
            </small>
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
