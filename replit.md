# Prennedy Style Party Planning

## Overview
A fun, colorful website for "Prennedy Style Party Planning," a teen-run party planning business by Becca Marie Kennedy and Ella Porter (13-year-olds at Village Gate). The site showcases party packages, allows customization, collects booking requests via email, and reflects an authentic teen-friendly aesthetic.

## Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, shadcn/ui, Wouter (routing), Framer Motion
- **Backend**: Express.js + Nodemailer for email
- **Fonts**: Fredoka (headings) + Nunito (body)
- **Design**: Pastel pink & blue palette, rounded corners

## Key Features
- Hero section with pastel background + trust badges
- 4 pricing tiers (Bundle, Bundle Premium, All-Inclusive, All-Inclusive Premium)
- Interactive gallery with 9 categories (tap-to-reveal details)
- Shopping cart with inline editing (package, catering size, hours)
- Checkout form that sends booking emails via Gmail SMTP
- Testimonials and About sections

## Email Setup (Nodemailer + Gmail SMTP)
- **Does NOT use Replit integrations** (Resend/SendGrid dismissed by user)
- Sends from: `hi.logichm@gmail.com` via Gmail SMTP
- Delivers to: `ellangellpo@gmail.com`
- Environment variables:
  - `SMTP_HOST` = smtp.gmail.com
  - `SMTP_PORT` = 587
  - `SMTP_USER` = hi.logichm@gmail.com
  - `SMTP_PASS` = (secret - Gmail App Password)
  - `MAIL_TO` = ellangellpo@gmail.com
  - `MAIL_FROM` = Prennedy Style Party Planning <hi.logichm@gmail.com>
- API endpoint: `POST /api/booking`
- Includes honeypot spam protection + IP rate limiting (3 req/min)

## Contact Info
- Email: ellangellpo@gmail.com
- Phone: 442-369-0593

## Pricing (per hour)
- Bundle: $45–$90
- Bundle Premium: $80–$130
- All-Inclusive: $90–$150
- All-Inclusive Premium: $100–$200
- Max 4 hours per booking

## Image Optimization
- Original PNGs (~1.5-2MB each) compressed to optimized JPGs (~50-120KB)
- Stored in `attached_assets/optimized/`
- Gallery images use lazy loading
