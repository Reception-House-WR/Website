import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, companyName, message } = body

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
      subject: 'New Employment Partnership Inquiry',
      html: `
        <h2>New Employment Partnership Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company Name:</strong> ${companyName || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // Auto-confirmation email to user
    await transporter.sendMail({
      from: `"Reception House" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thank you for your interest in hiring through Reception House!',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${fullName.split(' ')[0]},</p>
        <p>
          We appreciate your interest in partnering with Reception House
          to hire talented newcomers ready to contribute to your team.
        </p>
        <p>Our team will review your inquiry and get back to you shortly to discuss hiring opportunities.</p>

        <h3>Submission Summary:</h3>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>

        <br/>
        <p>Warm regards,<br/>Reception House Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Employment Form Error:', error)
    return NextResponse.json(
      { error: 'Failed to send employment form email' },
      { status: 500 }
    )
  }
}