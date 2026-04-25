
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import type { IncomingMessage, ServerResponse } from "http"
import { parseAndValidateContact, sendPortfolioContact } from "./lib/contact-mail.js"

function readRequestBody(req: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = []
        req.on("data", (chunk: Buffer) => chunks.push(chunk))
        req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
        req.on("error", reject)
    })
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [
        react(),
        {
            name: "dev-contact-api",
            configureServer(server) {
                server.middlewares.use(async (req, res, next) => {
                    const pathname = req.url?.split("?")[0] ?? ""
                    if (pathname !== "/api/contact") {
                        next()
                        return
                    }
                    const r = res as ServerResponse
                    if (req.method !== "POST") {
                        r.statusCode = 405
                        r.setHeader("Content-Type", "application/json")
                        r.end(JSON.stringify({ ok: false, error: "Method not allowed" }))
                        return
                    }
                    const env = loadEnv(mode, process.cwd(), "")
                    try {
                        const raw = await readRequestBody(req as IncomingMessage)
                        let parsedJson: unknown
                        try {
                            parsedJson = JSON.parse(raw || "{}")
                        } catch {
                            r.statusCode = 400
                            r.setHeader("Content-Type", "application/json")
                            r.end(JSON.stringify({ ok: false, error: "Invalid JSON" }))
                            return
                        }
                        const v = parseAndValidateContact(parsedJson)
                        if (!v.ok) {
                            r.statusCode = v.status
                            r.setHeader("Content-Type", "application/json")
                            r.end(JSON.stringify({ ok: false, error: v.error }))
                            return
                        }
                        const send = await sendPortfolioContact(env, v)
                        r.statusCode = send.ok ? 200 : send.status
                        r.setHeader("Content-Type", "application/json")
                        r.end(JSON.stringify(send.ok ? { ok: true } : { ok: false, error: send.error }))
                    } catch (e) {
                        console.error("dev /api/contact", e)
                        r.statusCode = 500
                        r.setHeader("Content-Type", "application/json")
                        r.end(JSON.stringify({ ok: false, error: "Server error" }))
                    }
                })
            },
        },
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
}))
