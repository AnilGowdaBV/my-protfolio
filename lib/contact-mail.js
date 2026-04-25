/**
 * Shared contact mail logic (Vercel api/contact.js + Vite dev middleware).
 * Env: GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL, CONTACT_OWNER_NAME (optional greeting)
 */
import nodemailer from "nodemailer";

function escapeHtml(s) {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/** @param {{ ownerDisplayName: string, name: string, email: string, message: string }} p */
function buildEmailHtml(p) {
    const owner = escapeHtml(p.ownerDisplayName);
    const safeName = escapeHtml(p.name);
    const safeEmail = escapeHtml(p.email);
    const safeMessage = escapeHtml(p.message).replace(/\r?\n/g, "<br/>");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>New message from your portfolio</title>
</head>
<body style="margin:0;padding:0;background:#030306;font-family:Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:radial-gradient(ellipse 120% 80% at 50% -20%,rgba(124,58,237,0.22),transparent 55%),#030306;padding:40px 16px 48px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;border-collapse:separate;border-spacing:0;border-radius:24px;overflow:hidden;border:1px solid rgba(167,139,250,0.28);box-shadow:0 0 0 1px rgba(0,0,0,0.4),0 32px 80px rgba(0,0,0,0.55),0 0 60px rgba(124,58,237,0.08);">
          <tr>
            <td style="height:5px;line-height:5px;background:linear-gradient(90deg,#4c1d95 0%,#7c3aed 35%,#a855f7 65%,#818cf8 100%);font-size:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:36px 32px 28px;background:linear-gradient(180deg,#12121a 0%,#0c0c12 100%);">
              <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#a78bfa;">Portfolio · contact</p>
              <p style="margin:0 0 8px;font-size:28px;font-weight:700;color:#fafafa;letter-spacing:-0.03em;line-height:1.2;">Hi ${owner},</p>
              <p style="margin:0 0 6px;font-size:16px;line-height:1.55;color:#d4d4d8;">You’ve got a new message from someone who visited your site.</p>
              <p style="margin:0;font-size:14px;line-height:1.55;color:#a1a1aa;">Reply straight from this email — your inbox is already set as reply-to to them.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;background:#0c0c12;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-radius:16px;background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.08);">
                <tr>
                  <td style="padding:22px 24px 8px;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#71717a;">From</p>
                    <p style="margin:0 0 20px;font-size:19px;font-weight:700;color:#f4f4f5;letter-spacing:-0.02em;">${safeName}</p>
                    <p style="margin:0 0 6px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#71717a;">Email</p>
                    <p style="margin:0 0 22px;font-size:16px;line-height:1.4;">
                      <a href="mailto:${safeEmail}" style="color:#c4b5fd;text-decoration:none;font-weight:600;border-bottom:1px solid rgba(196,181,253,0.35);">${safeEmail}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 24px 22px;">
                    <p style="margin:0 0 10px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#71717a;">Their message</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-radius:14px;background:rgba(0,0,0,0.35);border:1px solid rgba(124,58,237,0.25);">
                      <tr>
                        <td style="width:4px;background:linear-gradient(180deg,#7c3aed,#a855f7);border-radius:14px 0 0 14px;font-size:0;line-height:0;">&nbsp;</td>
                        <td style="padding:18px 20px;font-size:15px;line-height:1.7;color:#e4e4e7;">${safeMessage}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px 26px;background:#08080f;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0;font-size:12px;color:#52525b;line-height:1.5;">Sent securely from your portfolio contact form</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {Record<string, string | undefined>} env
 * @param {unknown} body
 * @returns {{ ok: true, name: string, email: string, message: string } | { ok: false, status: number, error: string }}
 */
export function parseAndValidateContact(body) {
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || name.length > 200) {
        return { ok: false, status: 400, error: "Invalid name" };
    }
    if (!email || email.length > 320 || !EMAIL_RE.test(email)) {
        return { ok: false, status: 400, error: "Invalid email" };
    }
    if (!message || message.length > 12000) {
        return { ok: false, status: 400, error: "Invalid message" };
    }
    return { ok: true, name, email, message };
}

/**
 * @param {Record<string, string | undefined>} env
 * @param {{ name: string, email: string, message: string }} payload
 */
export async function sendPortfolioContact(env, payload) {
    const user = env.GMAIL_USER;
    const pass = env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
    const to = env.CONTACT_TO_EMAIL || user;

    if (!user || !pass || !to) {
        return { ok: false, status: 503, error: "Mail not configured" };
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
    });

    const ownerDisplayName = String(env.CONTACT_OWNER_NAME ?? "Anil").trim() || "Anil";
    const subject = `Portfolio · ${payload.name} reached out`;

    try {
        await transporter.sendMail({
            from: `"Portfolio" <${user}>`,
            to,
            replyTo: payload.email,
            subject,
            text: [
                `Hi ${ownerDisplayName},`,
                "",
                "You have a new message from your portfolio contact form.",
                "",
                `From: ${payload.name}`,
                `Email: ${payload.email}`,
                "",
                "Message:",
                payload.message,
            ].join("\n"),
            html: buildEmailHtml({ ...payload, ownerDisplayName }),
        });
        return { ok: true };
    } catch (e) {
        console.error("sendPortfolioContact", e);
        return { ok: false, status: 500, error: "Send failed" };
    }
}
