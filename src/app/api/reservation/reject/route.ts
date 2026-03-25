import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import { createTransport, RESTAURANT_EMAIL } from "@/lib/email-transport";
import { buildRejectionEmail, formatCzechDate } from "@/lib/email-templates";
import type { Id } from "../../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  try {
    const { token, reservationId } = await request.json();

    if (!token || !reservationId) {
      return NextResponse.json({ error: "Missing token or reservationId" }, { status: 400 });
    }

    // Update status in Convex (verifyAdmin runs inside the mutation)
    const reservation = await convex.mutation(api.reservations.updateStatus, {
      token,
      reservationId: reservationId as Id<"reservations">,
      newStatus: "rejected",
    });

    // Send rejection email to customer
    const transporter = createTransport();
    await transporter.sendMail({
      from: `"U Blanických rytířů" <${RESTAURANT_EMAIL}>`,
      to: reservation.email,
      subject: `Rezervace — U Blanických rytířů`,
      html: buildRejectionEmail({
        name: reservation.name,
        email: reservation.email,
        phone: reservation.phone,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reject reservation error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se zamítnout rezervaci." },
      { status: 500 }
    );
  }
}
