import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import nodemailer from "nodemailer";

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  rateLimitMap.set(ip, recent);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/booking", async (req: Request, res: Response) => {
    try {
      const ip = req.ip || req.socket.remoteAddress || "unknown";
      if (isRateLimited(ip)) {
        return res.status(429).json({ error: "Too many requests. Please wait a minute and try again." });
      }

      const { customer, cart, totalEstimate, honeypot } = req.body;

      if (honeypot) {
        return res.status(200).json({ success: true });
      }

      if (!customer?.parentName || !customer?.email || !customer?.phone || !customer?.date || !customer?.address) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customer.email)) {
        return res.status(400).json({ error: "Invalid email address." });
      }

      const cartLines = (cart || [])
        .map((item: any) => {
          let line = `• ${item.packageName} — ${item.cateringSize} (${item.guestCount} guests), ${item.hours} hr(s) @ $${item.hourlyRate}/hr`;
          if (item.isEntertainmentAddOn) line += " + Entertainment ($25)";
          const cost = item.hourlyRate * item.hours + (item.isEntertainmentAddOn ? 25 : 0);
          line += ` = $${cost}`;
          return line;
        })
        .join("\n");

      const textBody = [
        `New Booking Request from ${customer.parentName}`,
        ``,
        `--- Contact Info ---`,
        `Name: ${customer.parentName}`,
        `Email: ${customer.email}`,
        `Phone: ${customer.phone}`,
        ``,
        `--- Party Details ---`,
        `Date: ${customer.date}`,
        `Start Time: ${customer.startTime || "Not specified"}`,
        `Location: ${customer.address}`,
        `Theme: ${customer.theme || "Not specified"}`,
        `Dietary Notes: ${customer.dietaryNotes || "None"}`,
        `Special Requests: ${customer.notes || "None"}`,
        ``,
        `--- Packages ---`,
        cartLines || "(no packages selected)",
        ``,
        `Estimated Total: ${totalEstimate}`,
      ].join("\n");

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4679a;">New Booking Request</h2>
          <h3>Contact Info</h3>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 4px 8px; font-weight: bold;">Name:</td><td style="padding: 4px 8px;">${customer.parentName}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">Email:</td><td style="padding: 4px 8px;"><a href="mailto:${customer.email}">${customer.email}</a></td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">Phone:</td><td style="padding: 4px 8px;">${customer.phone}</td></tr>
          </table>
          <h3>Party Details</h3>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 4px 8px; font-weight: bold;">Date:</td><td style="padding: 4px 8px;">${customer.date}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">Start Time:</td><td style="padding: 4px 8px;">${customer.startTime || "Not specified"}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">Location:</td><td style="padding: 4px 8px;">${customer.address}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">Theme:</td><td style="padding: 4px 8px;">${customer.theme || "Not specified"}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">Dietary Notes:</td><td style="padding: 4px 8px;">${customer.dietaryNotes || "None"}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">Special Requests:</td><td style="padding: 4px 8px;">${customer.notes || "None"}</td></tr>
          </table>
          <h3>Packages</h3>
          <ul>${(cart || []).map((item: any) => {
            const cost = item.hourlyRate * item.hours + (item.isEntertainmentAddOn ? 25 : 0);
            return `<li><strong>${item.packageName}</strong> — ${item.cateringSize} (${item.guestCount} guests), ${item.hours} hr(s) = <strong>$${cost}</strong>${item.isEntertainmentAddOn ? " <em>(+Entertainment $25)</em>" : ""}</li>`;
          }).join("")}</ul>
          <p style="font-size: 18px; font-weight: bold; color: #d4679a;">Estimated Total: ${totalEstimate}</p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.MAIL_FROM || "Prennedy Style Party Planning <hi.logichm@gmail.com>",
        to: process.env.MAIL_TO || "ellangellpo@gmail.com",
        replyTo: customer.email,
        subject: `New Booking Request from ${customer.parentName}`,
        text: textBody,
        html: htmlBody,
      });

      console.log(`Booking email sent for ${customer.parentName} (${customer.email})`);
      return res.status(200).json({ success: true });

    } catch (err: any) {
      console.error("Failed to send booking email:", err.message);
      return res.status(500).json({ error: "Failed to send your request. Please try again or contact us directly." });
    }
  });

  return httpServer;
}
