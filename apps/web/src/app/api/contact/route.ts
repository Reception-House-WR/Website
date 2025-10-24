import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // your gmail
        pass: process.env.GMAIL_APP_PASSWORD, // app password
      },
    });

    // Email to team
    await transporter.sendMail({
      from: `"Reception House" <${process.env.GMAIL_USER}>`,
      to: 'mariacamila.villamizarhernandez@gmail.com',
      replyTo: email,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Email to user
    await transporter.sendMail({
      from: `"Reception House" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Reception House',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${firstName},</p>
        <p>We've received your message and will get back to you within 1-2 business days.</p>
        <h3>Your Message:</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message}</p>
        <p>Best regards,<br/>Reception House Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}