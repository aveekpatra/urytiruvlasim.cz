import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { createTransport, RESTAURANT_EMAIL } from "@/lib/email-transport";
import {
  buildRestaurantEmail,
  formatCzechDate,
  type ReservationData,
} from "@/lib/email-templates";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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

    // Store reservation in Convex with "pending" status
    await convex.mutation(api.reservations.create, {
      name,
      email,
      phone,
      date,
      time,
      guests,
      occasion: occasion || undefined,
      notes: notes || undefined,
    });

    // Send notification to restaurant only (no auto-confirm to customer)
    const transporter = createTransport();
    await transporter.sendMail({
      from: `"U Blanických rytířů" <${RESTAURANT_EMAIL}>`,
      to: RESTAURANT_EMAIL,
      subject: `Rezervace: ${name} — ${formatCzechDate(date)} v ${time}`,
      html: buildRestaurantEmail({
        name,
        email,
        phone,
        date,
        time,
        guests,
        occasion,
        notes,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reservation error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se odeslat rezervaci. Zkuste to prosím znovu." },
      { status: 500 }
    );
  }
}
