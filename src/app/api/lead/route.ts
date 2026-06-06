import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { siteCopy } from "@/lib/copy";

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  birthday?: string;
  licensed?: string;
  relocate?: string;
  notes?: string;
  consent?: boolean;
  recruiter?: string;
  utm?: Partial<Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content", string>>;
};

const requiredFields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "location",
  "birthday",
] as const;

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const missing = requiredFields.filter((field) => !payload[field]);

  if (missing.length > 0 || !payload.consent) {
    return NextResponse.json(
      { ok: false, message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    null;
  const userAgent = request.headers.get("user-agent") ?? null;
  const referer = request.headers.get("referer") ?? null;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let leadId: string | null = null;
  let dbError: string | null = null;

  if (supabaseUrl && supabaseServiceKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false },
      });

      const { data, error } = await supabase
        .from("leads")
        .insert({
          first_name: payload.firstName,
          last_name: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          location: payload.location,
          birthday: payload.birthday,
          licensed: payload.licensed ?? null,
          relocate: payload.relocate ?? null,
          notes: payload.notes ?? null,
          consent: payload.consent ?? false,
          recruiter: payload.recruiter ?? "summit",
          utm_source: payload.utm?.utm_source ?? null,
          utm_medium: payload.utm?.utm_medium ?? null,
          utm_campaign: payload.utm?.utm_campaign ?? null,
          utm_term: payload.utm?.utm_term ?? null,
          utm_content: payload.utm?.utm_content ?? null,
          ip_address: ip,
          user_agent: userAgent,
          referer,
        })
        .select("id")
        .single();

      if (error) throw error;
      leadId = data?.id ?? null;
    } catch (error) {
      dbError = error instanceof Error ? error.message : "Unknown database error.";
      console.error("[lead] supabase insert failed:", dbError);
    }
  } else {
    console.warn(
      "[lead] SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY not set — submission not persisted.",
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.LEAD_NOTIFICATION_EMAIL ?? "zraxaid@gmail.com";
  const notifyFrom =
    process.env.LEAD_NOTIFICATION_FROM ?? "Summit Leads <onboarding@resend.dev>";

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const subject = buildSubject(payload);
      const html = renderLeadEmailHtml(payload, leadId, dbError);
      const text = renderLeadEmailText(payload, leadId, dbError);

      await resend.emails.send({
        from: notifyFrom,
        to: notifyTo.split(",").map((address) => address.trim()).filter(Boolean),
        subject,
        html,
        text,
        replyTo: payload.email,
      });
    } catch (error) {
      console.error(
        "[lead] resend send failed:",
        error instanceof Error ? error.message : error,
      );
    }
  } else {
    console.warn("[lead] RESEND_API_KEY not set — no email sent.");
  }

  return NextResponse.json({
    ok: true,
    message: siteCopy.global.modal.submitSuccess,
  });
}

function buildSubject(payload: LeadPayload) {
  const name = `${payload.firstName ?? ""} ${payload.lastName ?? ""}`.trim();
  const recruiter = payload.recruiter && payload.recruiter !== "summit"
    ? ` for ${payload.recruiter}`
    : "";
  return `New Summit lead${recruiter}: ${name || payload.email || "Anonymous"}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildRows(payload: LeadPayload): Array<[string, string]> {
  const rows: Array<[string, string]> = [
    ["Name", `${payload.firstName ?? ""} ${payload.lastName ?? ""}`.trim()],
    ["Email", payload.email ?? "—"],
    ["Phone", payload.phone ?? "—"],
    ["Location", payload.location ?? "—"],
    ["Birthday", payload.birthday ?? "—"],
    ["Currently licensed?", payload.licensed ?? "—"],
    ["Willing to relocate?", payload.relocate ?? "—"],
    ["Recruiter tag", payload.recruiter ?? "summit"],
  ];

  if (payload.notes) {
    rows.push(["Notes", payload.notes]);
  }

  const utm = payload.utm ?? {};
  const utmFragments = Object.entries(utm)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}=${value}`);
  if (utmFragments.length > 0) {
    rows.push(["UTM", utmFragments.join(" · ")]);
  }

  return rows;
}

function renderLeadEmailHtml(
  payload: LeadPayload,
  leadId: string | null,
  dbError: string | null,
) {
  const rows = buildRows(payload);
  const rowMarkup = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:12px 28px;border-bottom:1px solid rgba(255,255,255,0.06);color:#9ea5b8;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;width:180px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:12px 28px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:15px;color:#f5f1e8;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const footer = leadId
    ? `Saved · lead id <code style="color:#9ea5b8;">${escapeHtml(leadId)}</code>`
    : dbError
      ? `<span style="color:#ff9266;">Not persisted to database: ${escapeHtml(dbError)}</span>`
      : "Database persistence not configured for this deployment.";

  return `<!DOCTYPE html><html><body style="margin:0;padding:32px;background:#0a0b10;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#f5f1e8;">
    <div style="max-width:600px;margin:auto;background:#11131b;border:1px solid rgba(255,255,255,0.12);border-radius:18px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.08);">
        <div style="font-size:11px;letter-spacing:0.4em;color:#21b6ff;font-weight:700;">SUMMIT</div>
        <h1 style="margin:8px 0 0;font-size:22px;line-height:1.2;">New lead arrived</h1>
        <p style="margin:8px 0 0;color:#9ea5b8;font-size:13px;">${new Date().toISOString()}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">${rowMarkup}</table>
      <div style="padding:16px 28px;color:#6d7280;font-size:12px;background:rgba(255,255,255,0.02);">${footer}</div>
    </div>
  </body></html>`;
}

function renderLeadEmailText(
  payload: LeadPayload,
  leadId: string | null,
  dbError: string | null,
) {
  const rows = buildRows(payload);
  const lines = [
    "SUMMIT — NEW LEAD",
    new Date().toISOString(),
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    leadId
      ? `lead id: ${leadId}`
      : dbError
        ? `WARN: not persisted to database: ${dbError}`
        : "Database not configured for this deployment.",
  ];
  return lines.join("\n");
}
