import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, propertyDetails, message } = body

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email to Reception House team
    await transporter.sendMail({
      from: `"Reception House" <${process.env.GMAIL_USER}>`,
      to: 'mariacamila.villamizarhernandez@gmail.com',
      replyTo: email,
      subject: 'New Housing Partnership Inquiry',
      html: `
        <h2>New Housing Partnership Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Property Details:</strong></p>
        <p>${propertyDetails || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // Auto-confirmation email to user
    await transporter.sendMail({
      from: `"Reception House" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'We received your submission!',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${fullName.split(' ')[0]},</p>
        <p>
          We appreciate your interest in partnering with Reception House
          to support new residents of Waterloo Region.
        </p>
        <p>Our team will review your inquiry and get back to you shortly.</p>

        <h3>Submission Summary:</h3>
        <p><strong>Property:</strong> ${propertyDetails}</p>
        <p>${message}</p>

        <br/>
        <p>Warm regards,<br/>Reception House Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Housing Form Error:', error)
    return NextResponse.json(
      { error: 'Failed to send housing form email' },
      { status: 500 }
    )
  }
}
