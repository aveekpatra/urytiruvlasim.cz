import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper to verify admin session (same pattern as dailyMenu.ts)
async function verifyAdmin(ctx: { db: any }, token: string) {
  if (!token) throw new Error("Not authenticated");

  const session = await ctx.db
    .query("adminSessions")
    .withIndex("by_token", (q: any) => q.eq("token", token))
    .first();

  if (!session || session.expiresAt < Date.now()) {
    throw new Error("Session expired");
  }
}

// Public: create a new reservation (called from API route)
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    date: v.string(),
    time: v.string(),
    guests: v.number(),
    occasion: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, data) => {
    return await ctx.db.insert("reservations", {
      ...data,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

// Admin: list pending reservations
export const listPending = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    await verifyAdmin(ctx, token);

    return await ctx.db
      .query("reservations")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .order("asc")
      .take(50);
  },
});

// Admin: list all recent reservations
export const listAll = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    await verifyAdmin(ctx, token);

    return await ctx.db
      .query("reservations")
      .order("desc")
      .take(100);
  },
});

// Admin: update reservation status
export const updateStatus = mutation({
  args: {
    token: v.string(),
    reservationId: v.id("reservations"),
    newStatus: v.union(v.literal("confirmed"), v.literal("rejected")),
  },
  handler: async (ctx, { token, reservationId, newStatus }) => {
    await verifyAdmin(ctx, token);

    const reservation = await ctx.db.get(reservationId);
    if (!reservation) throw new Error("Reservation not found");

    await ctx.db.patch(reservationId, {
      status: newStatus,
      respondedAt: Date.now(),
    });

    return { ...reservation, status: newStatus, respondedAt: Date.now() };
  },
});

// Admin: get single reservation
export const getById = query({
  args: { token: v.string(), id: v.id("reservations") },
  handler: async (ctx, { token, id }) => {
    await verifyAdmin(ctx, token);
    return await ctx.db.get(id);
  },
});
