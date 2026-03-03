import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper to verify admin session
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

// Public: get today's menu
export const getToday = query({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split("T")[0];
    const menu = await ctx.db
      .query("dailyMenu")
      .withIndex("by_date", (q) => q.eq("date", today))
      .first();

    if (!menu || !menu.isPublished) return null;
    return menu;
  },
});

// Public: get menu by date
export const getByDate = query({
  args: { date: v.string() },
  handler: async (ctx, { date }) => {
    const menu = await ctx.db
      .query("dailyMenu")
      .withIndex("by_date", (q) => q.eq("date", date))
      .first();

    return menu;
  },
});

// Admin: list recent menus
export const listRecent = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    await verifyAdmin(ctx, token);

    const menus = await ctx.db
      .query("dailyMenu")
      .order("desc")
      .take(14);

    return menus;
  },
});

// Admin: create or update menu for a date
export const upsert = mutation({
  args: {
    token: v.string(),
    date: v.string(),
    soup: v.string(),
    soupPrice: v.number(),
    items: v.array(
      v.object({
        name: v.string(),
        description: v.string(),
        price: v.number(),
      })
    ),
    dessert: v.optional(v.string()),
    dessertPrice: v.optional(v.number()),
    isPublished: v.boolean(),
  },
  handler: async (ctx, { token, ...data }) => {
    await verifyAdmin(ctx, token);

    const existing = await ctx.db
      .query("dailyMenu")
      .withIndex("by_date", (q) => q.eq("date", data.date))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    } else {
      return await ctx.db.insert("dailyMenu", data);
    }
  },
});

// Admin: delete menu for a date
export const remove = mutation({
  args: { token: v.string(), id: v.id("dailyMenu") },
  handler: async (ctx, { token, id }) => {
    await verifyAdmin(ctx, token);
    await ctx.db.delete(id);
  },
});
