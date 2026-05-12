"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";

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

const requiredLabels: Record<keyof LeadFormState, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone",
  location: "Location",
  birthday: "Birthday",
  licensed: "Licensing status",
  relocate: "Relocation preference",
  notes: "Notes",
  consent: "Consent",
};

function getErrors(state: LeadFormState) {
  const errors: Partial<Record<keyof LeadFormState, string>> = {};

  for (const key of [
    "firstName",
    "lastName",
    "email",
    "phone",
    "location",
    "birthday",
    "licensed",
    "relocate",
  ] as const) {
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

export function LeadModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error" | "submitting";
    message: string;
  }>({ type: "idle", message: "" });

  const canSubmit = useMemo(
    () => form.consent && status.type !== "submitting",
    [form.consent, status.type],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = getErrors(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      return;
    }

    setStatus({ type: "submitting", message: "Sending your application..." });

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
    setErrors({});
    setStatus({ type: "success", message: payload.message });
  }

  function updateField<Key extends keyof LeadFormState>(
    key: Key,
    value: LeadFormState[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
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
          onClick={onClose}
          aria-label="Close join team form"
        >
          ×
        </button>

        <p className="eyebrow">Join the Team</p>
        <h2 id={titleId}>Tell us where you are headed.</h2>
        <p id={descriptionId}>
          Complete the application and a Summit recruiter will reach out with
          next steps.
        </p>

        <form className="lead-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>
              <span>First Name</span>
              <input
                value={form.firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
                required
              />
              {errors.firstName ? <small>{errors.firstName}</small> : null}
            </label>

            <label>
              <span>Last Name</span>
              <input
                value={form.lastName}
                onChange={(event) => updateField("lastName", event.target.value)}
                required
              />
              {errors.lastName ? <small>{errors.lastName}</small> : null}
            </label>

            <label>
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
              />
              {errors.email ? <small>{errors.email}</small> : null}
            </label>

            <label>
              <span>Phone</span>
              <div className="phone-field">
                <span>US +1</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  required
                />
              </div>
              {errors.phone ? <small>{errors.phone}</small> : null}
            </label>

            <label>
              <span>Location</span>
              <input
                value={form.location}
                onChange={(event) => updateField("location", event.target.value)}
                required
              />
              {errors.location ? <small>{errors.location}</small> : null}
            </label>

            <label>
              <span>Birthday</span>
              <input
                type="date"
                value={form.birthday}
                onChange={(event) => updateField("birthday", event.target.value)}
                required
              />
              {errors.birthday ? <small>{errors.birthday}</small> : null}
            </label>
          </div>

          <fieldset>
            <legend>Are you currently licensed to sell insurance?</legend>
            <div className="radio-row">
              {["YES", "NO"].map((option) => (
                <label key={option} className="radio-pill">
                  <input
                    type="radio"
                    name="licensed"
                    checked={form.licensed === option}
                    onChange={() => updateField("licensed", option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors.licensed ? <small>{errors.licensed}</small> : null}
          </fieldset>

          <fieldset>
            <legend>Are you willing to relocate for this position?</legend>
            <div className="radio-row">
              {["YES", "NO"].map((option) => (
                <label key={option} className="radio-pill">
                  <input
                    type="radio"
                    name="relocate"
                    checked={form.relocate === option}
                    onChange={() => updateField("relocate", option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors.relocate ? <small>{errors.relocate}</small> : null}
          </fieldset>

          <label>
            <span>Anything else we should know?</span>
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
              onChange={(event) => updateField("consent", event.target.checked)}
            />
            <span>
              I accept the <Link href="/terms-of-use">Terms of Use</Link> and{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>.
            </span>
          </label>

          {errors.consent ? <small>{errors.consent}</small> : null}

          <div className="form-status" role="status" aria-live="polite">
            {status.message}
          </div>

          <button type="submit" className="button-submit" disabled={!canSubmit}>
            {status.type === "submitting" ? "SENDING..." : "JOIN THE TEAM"}
          </button>
        </form>
      </div>
    </div>
  );
}
