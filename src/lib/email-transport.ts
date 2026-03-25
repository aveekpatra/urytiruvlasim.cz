import nodemailer from "nodemailer";

export const RESTAURANT_EMAIL = "ublanickychrytiru@seznam.cz";

export function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.seznam.cz",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}
