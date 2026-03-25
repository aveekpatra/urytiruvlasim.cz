export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  notes?: string;
}

export function formatCzechDate(isoDate: string): string {
  const date = new Date(isoDate + "T00:00:00");
  return date.toLocaleDateString("cs-CZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function buildRestaurantEmail(data: ReservationData): string {
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

export function buildConfirmationEmail(data: ReservationData): string {
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
          Vaše rezervace v restauraci U Blanických rytířů byla <strong>potvrzena</strong>. Těšíme se na Vás!
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

export function buildRejectionEmail(data: ReservationData): string {
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
          bohužel Vám musíme sdělit, že Vaši rezervaci na <strong>${formatCzechDate(data.date)}</strong> v <strong>${data.time}</strong>
          pro <strong>${data.guests} ${data.guests === 1 ? "osobu" : data.guests < 5 ? "osoby" : "osob"}</strong>
          nemůžeme v tuto chvíli potvrdit.
        </p>
        <p style="font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
          Prosíme, kontaktujte nás telefonicky na
          <a href="tel:+420732878238" style="color: #B8860B;">+420 732 878 238</a>,
          abychom společně našli vhodný termín.
        </p>
        <p style="font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
          Děkujeme za pochopení a omlouváme se za způsobené nepohodlí.
        </p>
      </div>
      <div style="padding: 16px 24px; background: #F5F3EE; text-align: center; font-size: 12px; color: #888;">
        U Blanických rytířů · Zámek 1, 258 01 Vlašim
      </div>
    </div>
  `;
}
