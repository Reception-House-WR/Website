import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Zod schema
const employmentFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  organization: z.string().optional(),
  message: z.string().optional(),
  token: z.string().min(1, "reCAPTCHA token is required"),
});

interface RecaptchaResponse {
  success: boolean;
  score: number;
  "error-codes"?: string[];
}

export async function POST(request: Request) {
  // --- Environment Variables ---
  const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
  const STRAPI_URL = process.env.STRAPI_API_URL;
  const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

  // --- Configuration Check ---
  if (
    !RECAPTCHA_SECRET_KEY ||
    !GMAIL_USER ||
    !GMAIL_APP_PASSWORD ||
    !STRAPI_URL ||
    !STRAPI_TOKEN
  ) {
    console.error("API Error: Missing environment variables.");
    return NextResponse.json(
      { message: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const validation = employmentFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid form data.", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { token, ...formData } = validation.data;

    // --- Verify reCAPTCHA First ---
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`;
    const recaptchaResponse = await fetch(verifyUrl, { method: "POST" });
    const recaptchaData = (await recaptchaResponse.json()) as RecaptchaResponse;

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.warn("reCAPTCHA failed:", recaptchaData["error-codes"]);
      return NextResponse.json(
        { message: "reCAPTCHA verification failed." },
        { status: 403 }
      );
    }

    // --- Save to Strapi ---
    try {
      const strapiPayload = {
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          message: formData.message,
          type: "employer",
          currentStatus: "new",
        },
      };

      const strapiRes = await fetch(`${STRAPI_URL}/api/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify(strapiPayload),
      });

      if (!strapiRes.ok) {
        const errorText = await strapiRes.text();
        console.error("Strapi Save Error:", errorText);
      } else {
        console.log("Employment inquiry saved to Strapi.");
      }
    } catch (strapiError) {
      console.error("Strapi Connection Error:", strapiError);
    }

    // --- Send Emails (Nodemailer) ---
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    });

    // Email to Admin/Staff
    await transporter.sendMail({
      from: `"Reception House Web" <${GMAIL_USER}>`,
      to: "mariacamila.villamizarhernandez@gmail.com",
      replyTo: formData.email,
      subject: "New Employment Partnership Inquiry",
      html: `
        <h2>New Employment Lead</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
        <p><strong>Organization:</strong> ${formData.organization || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
          ${formData.message || "No message provided."}
        </blockquote>
      `,
    });

    // Auto-reply to User
    await transporter.sendMail({
      from: `"Reception House" <${GMAIL_USER}>`,
      to: formData.email,
      subject: "Thank you for your interest in hiring through Reception House!",
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${formData.name.split(" ")[0]},</p>
        <p>We appreciate your interest in partnering with Reception House. Our employment services team will review your inquiry and get back to you shortly.</p>
        <p>Warm regards,<br/>Reception House Team</p>
      `,
    });

    return NextResponse.json(
      { message: "Form submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "An error occurred." },
      { status: 500 }
    );
  }
}
