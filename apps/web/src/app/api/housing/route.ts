import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Zod schema for server-side validation

const housingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  organization: z.string().optional(),
  message: z.string().optional(),
  token: z.string().min(1, "reCAPTCHA token is required"),
});

// Response structure from Google reCAPTCHA
interface RecaptchaResponse {
  success: boolean;
  score: number;
  "error-codes"?: string[];
}

export async function POST(request: Request) {
  // --- Get all required environment variables ---
  const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

  // --- Check for server configuration errors ---
  if (!RECAPTCHA_SECRET_KEY || !GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("Housing API Error: Missing environment variables.");
    return NextResponse.json(
      { message: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    // Validate the incoming data
    const validation = housingFormSchema.safeParse(body);

    if (!validation.success) {
      console.warn(
        "Housing form validation failed:",
        validation.error.flatten()
      );
      return NextResponse.json(
        { message: "Invalid form data.", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    // formData
    const { token, ...formData } = validation.data;

    // Verify the reCAPTCHA token
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`;

    const recaptchaResponse = await fetch(verifyUrl, { method: "POST" });
    const recaptchaData = (await recaptchaResponse.json()) as RecaptchaResponse;

    // Check the verification score
    if (recaptchaData.success && recaptchaData.score >= 0.5) {
      // SUCCESS: User is likely human & data is valid

      // --- Nodemailer logic ---
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD,
        },
      });

      // Email to Reception House team
      await transporter.sendMail({
        from: `"Reception House" <${GMAIL_USER}>`,
        to: "mariacamila.villamizarhernandez@gmail.com",
        replyTo: formData.email,
        subject: "New Housing Partnership Inquiry",
        html: `
          <h2>New Housing Partnership Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
          <p><strong>Property Details:</strong></p>
          <p>${formData.organization || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message || "No message provided."}</p>
        `,
      });

      // Auto-confirmation email to user
      await transporter.sendMail({
        from: `"Reception House" <${GMAIL_USER}>`,
        to: formData.email,
        subject: "We received your submission!",
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${formData.name.split(" ")[0]},</p>
          <p>
            We appreciate your interest in partnering with Reception House
            to support new residents of Waterloo Region.
          </p>
          <p>Our team will review your inquiry and get back to you shortly.</p>

          <h3>Submission Summary:</h3>
          <p><strong>Property:</strong> ${formData.organization || "Not provided"}</p>
          <p>${formData.message || "No message provided."}</p>

          <br/>
          <p>Warm regards,<br/>Reception House Team</p>
        `,
      });
      // --- End of Nodemailer logic ---

      return NextResponse.json(
        { message: "Form submitted successfully!" },
        { status: 200 }
      );
    } else {
      // FAILED: User is likely a bot
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
    console.error("Housing Form Error:", error);
    return NextResponse.json(
      { error: "Failed to send housing form email" },
      { status: 500 }
    );
  }
}
