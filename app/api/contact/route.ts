import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, subject, message, turnstileToken } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Turnstile verification
    if (!turnstileToken) {
      return NextResponse.json({ error: "CAPTCHA token missing" }, { status: 400 });
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      return NextResponse.json({ error: "Turnstile not configured" }, { status: 500 });
    }

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      }
    );

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json(
        { error: "CAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    // Server-side validation
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    if (String(name).trim().length < 2) return NextResponse.json({ error: "Name too short" }, { status: 400 });
    if (subject && String(subject).length > 200) return NextResponse.json({ error: "Subject too long" }, { status: 400 });
    const wordCount = String(message).trim() ? String(message).trim().split(/\s+/).filter(Boolean).length : 0;
    const SERVER_WORD_LIMIT = 250;
    if (wordCount > SERVER_WORD_LIMIT) return NextResponse.json({ error: `Message too long (max ${SERVER_WORD_LIMIT} words)` }, { status: 400 });

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !port || !user || !pass) {
      return NextResponse.json({ error: "SMTP not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const toEmail = process.env.TO_EMAIL || "saribraja1998@gmail.com";

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: toEmail,
      subject: subject || `Portfolio contact from ${name}`,
      text: message,
      html: `<p>${message.replace(/\n/g, "<br />")}</p><hr/><p>From: ${name} &lt;${email}&gt;</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/contact error", err);
    return NextResponse.json({ error: err?.message || "unknown" }, { status: 500 });
  }
}