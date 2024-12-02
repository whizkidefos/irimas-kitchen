import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import { ContactFormValidation, type ContactFormData } from '$lib/types/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting
const rateLimits = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '10');
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '3600'); // 1 hour in seconds

function checkRateLimit(ip: string): boolean {
    const now = Math.floor(Date.now() / 1000);
    const userLimit = rateLimits.get(ip);

    if (!userLimit) {
        rateLimits.set(ip, { count: 1, timestamp: now });
        return true;
    }

    if (now - userLimit.timestamp > RATE_LIMIT_WINDOW) {
        rateLimits.set(ip, { count: 1, timestamp: now });
        return true;
    }

    if (userLimit.count >= RATE_LIMIT_MAX) {
        return false;
    }

    userLimit.count += 1;
    rateLimits.set(ip, userLimit);
    return true;
}

export async function POST({ request, getClientAddress }) {
    try {
        // Rate limiting check
        const clientIp = getClientAddress();
        if (!checkRateLimit(clientIp)) {
            return json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const data = await request.json() as ContactFormData;
        
        // Validate input
        const validation = ContactFormValidation.validate(data);
        if (!validation.isValid) {
            return json({ error: validation.errors.join(', ') }, { status: 400 });
        }

        const { name, email, subject, message } = data;

        await resend.emails.send({
            from: process.env.EMAIL_FROM || 'Irima\'s Kitchen <contact@irimaskitchen.com>',
            to: process.env.EMAIL_TO || 'irimaskitchen@gmail.com',
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New message from ${name}</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        return json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Failed to send email:', error);
        
        // More specific error messages
        if (error instanceof Error) {
            if (error.message.includes('rate limit')) {
                return json({ error: 'Email service rate limit exceeded' }, { status: 429 });
            }
            if (error.message.includes('validation')) {
                return json({ error: 'Email validation failed' }, { status: 400 });
            }
        }
        
        return json(
            { error: 'An unexpected error occurred while sending the message' },
            { status: 500 }
        );
    }
}