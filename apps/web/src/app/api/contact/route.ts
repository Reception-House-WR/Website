import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  token: z.string().min(1, "reCAPTCHA token is required"),
});

//response structure from Google reCAPTCHA
interface RecaptchaResponse {
  success: boolean;
  score: number;
  "error-codes"?: string[];
}

export async function POST(request: Request) {
  //Env vars
  const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
  const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

  //Checking errors
  if (!RECAPTCHA_SECRET_KEY || !GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("Contact API Error: Missing environment variables.");
    return NextResponse.json(
      { message: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      console.warn(
        "Contact form validation failed:",
        validation.error.flatten()
      );
      return NextResponse.json(
        { message: "Invalid form data.", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { token, ...formData } = validation.data;

    //Verifying reCAPTCHA token
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`;

    const recaptchaResponse = await fetch(verifyUrl, { method: "POST" });
    const recaptchaData = (await recaptchaResponse.json()) as RecaptchaResponse;

    //Check verification score
    if (recaptchaData.success && recaptchaData.score >= 0.5) {

      //SUCCESS
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD,
        },
      });

      //Email to team
      await transporter.sendMail({
        from: `"Reception House" <${GMAIL_USER}>`,
        to: RECEIVER_EMAIL,
        replyTo: formData.email,
        subject: `New Contact Form: ${formData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message}</p>
        `,
      });

      //Email to user
      await transporter.sendMail({
        from: `"Reception House" <${GMAIL_USER}>`,
        to: formData.email,
        subject: "Thank you for contacting Reception House",
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${formData.firstName},</p>
          <p>We've received your message and will get back to you within 1-2 business days.</p>
          <h3>Your Message:</h3>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <p>${formData.message}</p>
          <p>Best regards,<br/>Reception House Team</p>
        `,
      });

      return NextResponse.json(
        { message: "Message sent successfully!" },
        { status: 200 }
      );
    } else {
      //FAILED
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
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { message: "An error occurred." },
      { status: 500 }
    );
  }
}
