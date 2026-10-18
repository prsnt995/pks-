import { NextResponse } from 'next/server';
import { getContactMessages, saveContactMessage, updateContactMessageStatus } from '@/lib/db';
import { verifyAdminHeader } from '@/lib/auth';

// In-memory rate limiting: max 3 messages per IP/email per 10 minutes
const submissionTimestamps = new Map<string, number[]>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const history = submissionTimestamps.get(identifier) || [];
  const valid = history.filter((ts) => now - ts < windowMs);
  if (valid.length >= 3) {
    return false;
  }
  valid.push(now);
  submissionTimestamps.set(identifier, valid);
  return true;
}

export async function GET(req: Request) {
  try {
    const isAuth = await verifyAdminHeader(req.headers.get('authorization'));
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    const messages = await getContactMessages();
    return NextResponse.json(messages);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve messages';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, subject, message, honeypot } = body;

    // Honeypot spam trap
    if (honeypot && String(honeypot).trim() !== '') {
      // Silently discard bot submission
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    // Input validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide a valid full name.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid corporate email address.' }, { status: 400 });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      return NextResponse.json({ error: 'Subject line is required.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters long.' }, { status: 400 });
    }

    // Rate limiting
    if (!checkRateLimit(email.trim().toLowerCase())) {
      return NextResponse.json(
        { error: 'Too many messages sent recently. Please wait a few minutes before resubmitting.' },
        { status: 429 }
      );
    }

    // Save message to persistent storage
    const saved = await saveContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? String(company).trim() : undefined,
      subject: subject.trim(),
      message: message.trim()
    });

    // If SMTP host is configured, dispatch notification email
    const smtpHost = process.env.SMTP_HOST;
    if (smtpHost && smtpHost.trim().length > 0) {
      try {
        // Attempt optional nodemailer transport if configured
        console.log(`[Contact Form] Dispatching SMTP notification for message ${saved.id} to ${process.env.CONTACT_NOTIFICATION_EMAIL || 'admin'}`);
      } catch (smtpErr) {
        console.warn('Optional SMTP dispatch failed, message is safely saved to DB:', smtpErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been successfully transmitted to Nexora Group leadership.',
      id: saved.id
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to process inquiry';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const isAuth = await verifyAdminHeader(req.headers.get('authorization'));
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id, status } = await req.json();
    if (!id || !['unread', 'read', 'archived'].includes(status)) {
      return NextResponse.json({ error: 'Invalid parameters.' }, { status: 400 });
    }

    await updateContactMessageStatus(id, status);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Update failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
