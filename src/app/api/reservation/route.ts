import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RESTAURANT_EMAIL = "ublanickychrytiru@seznam.cz";

function createTransport() {
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

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  notes?: string;
}

function formatCzechDate(isoDate: string): string {
  const date = new Date(isoDate + "T00:00:00");
  return date.toLocaleDateString("cs-CZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function buildRestaurantEmail(data: ReservationData): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; color: #1C1C1C;">
      <div style="background: #1C1C1C; padding: 24px; text-align: center;">
        <h1 style="color: #B8860B; font-size: 18px; letter-spacing: 2px; margin: 0;">
          NOVÁ REZERVACE
        </h1>
      </div>
      <div style="padding: 32px 24px; background: #FDFBF7; border: 1px solid #E8E4DD;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #888; width: 140px;">Jméno</td>
            <td style="padding: 10px 0; font-weight: 600;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #888;">E-mail</td>
            <td style="padding: 10px 0;">
              <a href="mailto:${data.email}" style="color: #B8860B;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #888;">Telefon</td>
            <td style="padding: 10px 0;">
              <a href="tel:${data.phone}" style="color: #B8860B;">${data.phone}</a>
            </td>
          </tr>
          <tr style="border-top: 1px solid #E8E4DD;">
            <td style="padding: 10px 0; color: #888;">Datum</td>
            <td style="padding: 10px 0; font-weight: 600;">${formatCzechDate(data.date)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #888;">Čas</td>
            <td style="padding: 10px 0; font-weight: 600;">${data.time}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #888;">Počet osob</td>
            <td style="padding: 10px 0; font-weight: 600;">${data.guests}</td>
          </tr>
          ${
            data.occasion
              ? `<tr>
                  <td style="padding: 10px 0; color: #888;">Příležitost</td>
                  <td style="padding: 10px 0;">${data.occasion}</td>
                </tr>`
              : ""
          }
          ${
            data.notes
              ? `<tr style="border-top: 1px solid #E8E4DD;">
                  <td style="padding: 10px 0; color: #888; vertical-align: top;">Poznámka</td>
                  <td style="padding: 10px 0;">${data.notes}</td>
                </tr>`
              : ""
          }
        </table>
      </div>
      <div style="padding: 16px 24px; background: #F5F3EE; text-align: center; font-size: 12px; color: #888;">
        Odesláno z webu ublanickychrytiru.cz
      </div>
    </div>
  `;
}

function buildConfirmationEmail(data: ReservationData): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; color: #1C1C1C;">
      <div style="background: #1C1C1C; padding: 24px; text-align: center;">
        <h1 style="color: #B8860B; font-size: 18px; letter-spacing: 2px; margin: 0;">
          U BLANICKÝCH RYTÍŘŮ
        </h1>
      </div>
      <div style="padding: 32px 24px; background: #FDFBF7; border: 1px solid #E8E4DD;">
        <p style="font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
          Vážený/á <strong>${data.name}</strong>,
        </p>
        <p style="font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
          děkujeme za Vaši rezervaci v restauraci U Blanických rytířů. Přijali jsme Váš požadavek a brzy Vás budeme kontaktovat s potvrzením.
        </p>
        <div style="background: #F5F3EE; padding: 20px; margin: 20px 0; border-left: 3px solid #B8860B;">
          <p style="margin: 0 0 8px; font-size: 14px;"><strong>Datum:</strong> ${formatCzechDate(data.date)}</p>
          <p style="margin: 0 0 8px; font-size: 14px;"><strong>Čas:</strong> ${data.time}</p>
          <p style="margin: 0; font-size: 14px;"><strong>Počet osob:</strong> ${data.guests}</p>
        </div>
        <p style="font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
          V případě dotazů nás neváhejte kontaktovat na
          <a href="tel:+420732878238" style="color: #B8860B;">+420 732 878 238</a>.
        </p>
        <p style="font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
          Těšíme se na Vaši návštěvu!
        </p>
      </div>
      <div style="padding: 16px 24px; background: #F5F3EE; text-align: center; font-size: 12px; color: #888;">
        U Blanických rytířů · Zámek 1, 258 01 Vlašim
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, date, time, guests, occasion, notes } =
      body as ReservationData;

    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: "Vyplňte prosím všechna povinná pole." },
        { status: 400 }
      );
    }

    const transporter = createTransport();

    // Send notification to restaurant
    await transporter.sendMail({
      from: `"U Blanických rytířů" <${RESTAURANT_EMAIL}>`,
      to: RESTAURANT_EMAIL,
      subject: `Rezervace: ${name} — ${formatCzechDate(date)} v ${time}`,
      html: buildRestaurantEmail({ name, email, phone, date, time, guests, occasion, notes }),
    });

    // Send confirmation to customer
    await transporter.sendMail({
      from: `"U Blanických rytířů" <${RESTAURANT_EMAIL}>`,
      to: email,
      subject: `Potvrzení rezervace — U Blanických rytířů`,
      html: buildConfirmationEmail({ name, email, phone, date, time, guests, occasion, notes }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reservation email error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se odeslat rezervaci. Zkuste to prosím znovu." },
      { status: 500 }
    );
  }
}
