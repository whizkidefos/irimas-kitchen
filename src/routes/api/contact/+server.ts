import { json } from '@sveltejs/kit';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST({ request }) {
  try {
    const { name, email, subject, message } = await request.json();

    await resend.emails.send({
      from: 'Irima\'s Kitchen <contact@yourdomain.com>',
      to: 'your-email@example.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return json({ error: 'Failed to send message' }, { status: 500 });
  }
}