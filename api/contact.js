/**
 * Vercel serverless: sends portfolio contact notifications to your inbox.
 */
import { parseAndValidateContact, sendPortfolioContact } from "../lib/contact-mail.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).setHeader("Allow", "POST").json({ ok: false, error: "Method not allowed" });
        return;
    }

    let body = req.body;
    if (Buffer.isBuffer(body)) {
        try {
            body = JSON.parse(body.toString("utf8") || "{}");
        } catch {
            res.status(400).json({ ok: false, error: "Invalid JSON" });
            return;
        }
    } else if (typeof body === "string") {
        try {
            body = JSON.parse(body || "{}");
        } catch {
            res.status(400).json({ ok: false, error: "Invalid JSON" });
            return;
        }
    } else if (!body || typeof body !== "object") {
        const chunks = [];
        try {
            for await (const chunk of req) {
                chunks.push(chunk);
            }
            const raw = Buffer.concat(chunks).toString("utf8");
            body = JSON.parse(raw || "{}");
        } catch {
            res.status(400).json({ ok: false, error: "Invalid JSON" });
            return;
        }
    }

    const v = parseAndValidateContact(body);
    if (!v.ok) {
        res.status(v.status).json({ ok: false, error: v.error });
        return;
    }

    const result = await sendPortfolioContact(process.env, v);
    if (!result.ok) {
        res.status(result.status).json({ ok: false, error: result.error });
        return;
    }
    res.status(200).json({ ok: true });
}
