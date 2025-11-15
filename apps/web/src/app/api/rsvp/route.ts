import { NextResponse } from "next/server";

interface RSVPRequest {
  fullName: string;
  email: string;
  phone?: string;
  attendees: number;
  message?: string;
  newsletter?: boolean;
  eventTitle: string;
  eventDate: string;
  token: string;
}

// Response structure from Google reCAPTCHA
interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RSVPRequest;
    const { token } = body;

    // 1. Verify the reCAPTCHA token
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

    const recaptchaResponse = await fetch(verifyUrl, { method: "POST" });

    const recaptchaData = (await recaptchaResponse.json()) as RecaptchaResponse;

    // 2. Check the verification score
    if (recaptchaData.success && recaptchaData.score >= 0.3) {
      // Send a success response back to the form
      return NextResponse.json({ message: "RSVP Confirmed!" }, { status: 200 });
    } else {
      // FAILED
      console.warn(
        "reCAPTCHA verification failed:",
        recaptchaData["error-codes"]
      );
      return NextResponse.json(
        { message: "reCAPTCHA verification failed." },
        { status: 403 } // 403 Forbidden
      );
    }
  } catch (error) {
    console.error("RSVP API Error:", error);
    return NextResponse.json(
      { message: "An error occurred." },
      { status: 500 }
    );
  }
}