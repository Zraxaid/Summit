import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "location",
    "birthday",
  ] as const;

  const missing = requiredFields.filter((field) => !payload[field]);

  if (missing.length > 0 || !payload.consent) {
    return NextResponse.json(
      { ok: false, message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Your application has been received. A Summit recruiter will follow up shortly.",
  });
}
