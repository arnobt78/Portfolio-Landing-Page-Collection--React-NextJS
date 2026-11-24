import { pathToFileURL } from "node:url";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

// The transport can be supplied by tests without connecting to an SMTP service.
export function createContactApp({ sendMail, emailUser, emailTo, allowedOrigins = [] }) {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : "*" }));
  app.use(express.json({ limit: "16kb" }));

  app.post("/contact", async (req, res) => {
    const raw = req.body;
    const body = raw && typeof raw === "object" && !Array.isArray(raw)
      ? { ...raw, phone: raw.phone ?? "" }
      : null;
    const limits = { firstName: 100, lastName: 100, email: 254, phone: 40, message: 5000 };
    if (!body ||
      Object.entries(limits).some(([key, max]) => typeof body[key] !== "string" || body[key].length > max) ||
      !body.firstName.trim() || !body.lastName.trim() || !body.message.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return res.status(400).json({ error: "Please provide valid contact details." });
    }
    if (!emailUser || !emailTo || !sendMail) {
      return res.status(503).json({ error: "Contact service is not configured." });
    }

    try {
      await sendMail({
        from: emailUser,
        to: emailTo,
        replyTo: body.email,
        subject: "Contact Form Submission - Portfolio",
        text: `Name: ${body.firstName.trim()} ${body.lastName.trim()}\nEmail: ${body.email}\nPhone: ${body.phone.trim()}\nMessage: ${body.message.trim()}`,
      });
      return res.json({ code: 200, status: "Message Sent" });
    } catch {
      return res.status(502).json({ error: "Unable to send your message. Please try again later." });
    }
  });

  app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    return res.status(err.status === 413 ? 413 : 400).json({ error: "Invalid request body." });
  });
  return app;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await import("dotenv/config");
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailTo = process.env.EMAIL_TO || emailUser;
  const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || "").split(",").map((value) => value.trim()).filter(Boolean);
  const transport = emailUser && emailPass && nodemailer.createTransport({ service: "gmail", auth: { user: emailUser, pass: emailPass } });
  const app = createContactApp({ emailUser, emailTo, allowedOrigins, sendMail: transport && ((mail) => transport.sendMail(mail)) });
  app.listen(process.env.PORT || 5000, () => console.log("Contact server is listening."));
}
