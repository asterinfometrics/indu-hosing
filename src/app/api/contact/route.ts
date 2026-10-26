import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory rate limiting map: IP -> { count: number, resetTime: number }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up old rate limit entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 15 * 60 * 1000);

// Helper to escape HTML and prevent injection attacks
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const projectTypeLabels: Record<string, string> = {
  'luxury-villa': 'Standalone Luxury Villa',
  'residential-apartment': 'Residential Apartment',
  'independent-home': 'Independent Home',
  'joint-venture': 'Joint Venture / Plot Promotion',
  'consultation': 'General Consultation & Architectural Planning',
};

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'anonymous';

    const now = Date.now();
    const clientRecord = rateLimitMap.get(ip);

    if (clientRecord) {
      if (now < clientRecord.resetTime) {
        if (clientRecord.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            {
              success: false,
              message: 'Too many requests. Please wait a few minutes before trying again.',
            },
            { status: 429 }
          );
        }
        clientRecord.count += 1;
      } else {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    // 2. Parse Request Body
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Invalid request body.' },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      projectType,
      subject,
      message,
      botField, // Honeypot field
    } = body;

    // 3. Spam Protection (Honeypot)
    // If the hidden bot field is filled out, pretend it succeeded but do not send email
    if (botField && typeof botField === 'string' && botField.trim().length > 0) {
      console.warn(`[Spam Blocked] Honeypot triggered by IP: ${ip}`);
      return NextResponse.json(
        { success: true, message: 'Your enquiry has been received.' },
        { status: 200 }
      );
    }

    // 4. Input Validation
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';
    const rawProjectType = typeof projectType === 'string' ? projectType.trim() : '';
    const rawSubject = typeof subject === 'string' ? subject.trim() : '';
    const rawMessage = typeof message === 'string' ? message.trim() : '';

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid full name (2-100 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail) || trimmedEmail.length > 150) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Phone validation: enforce exactly 10-digit mobile number
    let phoneClean = trimmedPhone.replace(/\D/g, '');
    if (phoneClean.length === 12 && phoneClean.startsWith('91')) {
      phoneClean = phoneClean.slice(2);
    } else if (phoneClean.length === 11 && phoneClean.startsWith('0')) {
      phoneClean = phoneClean.slice(1);
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneClean || phoneClean.length !== 10 || !phoneRegex.test(phoneClean)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    if (rawMessage.length > 3000) {
      return NextResponse.json(
        { success: false, message: 'Message is too long (maximum 3000 characters).' },
        { status: 400 }
      );
    }

    // 5. Check SMTP Configuration
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, '');
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || smtpUser;

    if (!smtpUser || !smtpPass) {
      console.error(
        'Missing SMTP configuration in environment variables (SMTP_USER or SMTP_PASS).'
      );
      return NextResponse.json(
        {
          success: false,
          message:
            'Server email configuration is missing. Please configure SMTP_USER and SMTP_PASS in .env.local.',
        },
        { status: 500 }
      );
    }

    // 6. Setup Transporter
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const isSecure = smtpPort === 465;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: isSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const displayType =
      projectTypeLabels[rawProjectType] || rawProjectType || rawSubject || 'Website Enquiry';

    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safePhone = escapeHtml(trimmedPhone);
    const safeDisplayType = escapeHtml(displayType);
    const safeMessage = rawMessage ? escapeHtml(rawMessage).replace(/\n/g, '<br />') : '<em>None provided</em>';

    const submissionTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // 7. Compose HTML & Plain Text Emails
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Website Enquiry</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #F8F9FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1A1A17;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
    <!-- Header -->
    <tr>
      <td style="background-color: #0A63AD; padding: 28px 32px; text-align: left;">
        <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600; letter-spacing: -0.01em;">
          Indu Housing &mdash; New Website Enquiry
        </h1>
        <p style="margin: 6px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
          ${safeDisplayType}
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDF2F7; font-weight: 600; width: 140px; color: #4A5568; font-size: 14px;">
              Full Name:
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDF2F7; color: #1A1A17; font-size: 15px; font-weight: 500;">
              ${safeName}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDF2F7; font-weight: 600; color: #4A5568; font-size: 14px;">
              Email:
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDF2F7; font-size: 15px;">
              <a href="mailto:${safeEmail}" style="color: #0A63AD; text-decoration: none; font-weight: 500;">
                ${safeEmail}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDF2F7; font-weight: 600; color: #4A5568; font-size: 14px;">
              Mobile Number:
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDF2F7; font-size: 15px;">
              <a href="tel:${safePhone}" style="color: #0A63AD; text-decoration: none; font-weight: 500;">
                ${safePhone}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDF2F7; font-weight: 600; color: #4A5568; font-size: 14px;">
              Project Type:
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDF2F7; color: #1A1A17; font-size: 15px;">
              ${safeDisplayType}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0 6px 0; font-weight: 600; color: #4A5568; font-size: 14px;" colspan="2">
              Message / Consultation Request:
            </td>
          </tr>
          <tr>
            <td colspan="2" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 16px; font-size: 14px; line-height: 1.6; color: #2D3748;">
              ${safeMessage}
            </td>
          </tr>
        </table>

        <!-- Metadata Section -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px; border-top: 1px solid #EDF2F7; padding-top: 16px;">
          <tr>
            <td style="font-size: 12px; color: #718096; line-height: 1.5;">
              <strong>Submitted at:</strong> ${submissionTime} (IST)<br>
              <strong>Sender IP:</strong> ${ip}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 16px 32px; text-align: center; font-size: 12px; color: #A0AEC0;">
        This email was sent from the Indu Housing website contact form.
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const emailText = `
New Website Enquiry - Indu Housing
--------------------------------------
Full Name:    ${trimmedName}
Email:        ${trimmedEmail}
Mobile Phone: ${trimmedPhone}
Project Type: ${displayType}
Submitted at: ${submissionTime} (IST)

Message:
${rawMessage || 'None provided'}
--------------------------------------
    `.trim();

    const fromAddress =
      process.env.CONTACT_FROM_EMAIL || `"Indu Housing Enquiries" <${smtpUser}>`;

    // 8. Send Email
    await transporter.sendMail({
      from: fromAddress,
      to: recipientEmail,
      replyTo: trimmedEmail,
      subject: `New Enquiry from ${trimmedName} - ${displayType}`,
      text: emailText,
      html: emailHtml,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! We will reach out shortly to plan your visit.',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error sending contact enquiry via Nodemailer:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred while sending email.';
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send your enquiry. Please try again later or contact us directly.',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
