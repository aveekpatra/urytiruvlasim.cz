import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const menuItemValidator = v.object({
  name: v.string(),
  description: v.string(),
  allergens: v.optional(v.string()),
  price: v.number(),
  isVegetarian: v.optional(v.boolean()),
});

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

// Admin: get version history for a date
export const getHistory = query({
  args: { token: v.string(), date: v.string() },
  handler: async (ctx, { token, date }) => {
    await verifyAdmin(ctx, token);

    const history = await ctx.db
      .query("dailyMenuHistory")
      .withIndex("by_menu_date", (q) => q.eq("menuDate", date))
      .order("desc")
      .take(20);

    return history;
  },
});

// Admin: create or update menu for a date (saves history snapshot)
export const upsert = mutation({
  args: {
    token: v.string(),
    date: v.string(),
    soup: v.string(),
    soupDescription: v.optional(v.string()),
    soupAllergens: v.optional(v.string()),
    soupPrice: v.number(),
    items: v.array(menuItemValidator),
    dessert: v.optional(v.string()),
    dessertDescription: v.optional(v.string()),
    dessertAllergens: v.optional(v.string()),
    dessertPrice: v.optional(v.number()),
    drinks: v.optional(v.array(menuItemValidator)),
    isPublished: v.boolean(),
  },
  handler: async (ctx, { token, ...data }) => {
    await verifyAdmin(ctx, token);

    const existing = await ctx.db
      .query("dailyMenu")
      .withIndex("by_date", (q) => q.eq("date", data.date))
      .first();

    if (existing) {
      // Save current version to history before overwriting
      await ctx.db.insert("dailyMenuHistory", {
        menuDate: existing.date,
        version: existing.version,
        savedAt: Date.now(),
        soup: existing.soup,
        soupDescription: existing.soupDescription,
        soupAllergens: existing.soupAllergens,
        soupPrice: existing.soupPrice,
        items: existing.items,
        dessert: existing.dessert,
        dessertDescription: existing.dessertDescription,
        dessertAllergens: existing.dessertAllergens,
        dessertPrice: existing.dessertPrice,
        drinks: existing.drinks,
        isPublished: existing.isPublished,
      });

      const newVersion = (existing.version || 0) + 1;
      await ctx.db.patch(existing._id, { ...data, version: newVersion });
      return existing._id;
    } else {
      return await ctx.db.insert("dailyMenu", { ...data, version: 1 });
    }
  },
});

// Admin: restore a historical version
export const restoreVersion = mutation({
  args: { token: v.string(), historyId: v.id("dailyMenuHistory") },
  handler: async (ctx, { token, historyId }) => {
    await verifyAdmin(ctx, token);

    const historyEntry = await ctx.db.get(historyId);
    if (!historyEntry) throw new Error("History entry not found");

    const existing = await ctx.db
      .query("dailyMenu")
      .withIndex("by_date", (q) => q.eq("date", historyEntry.menuDate))
      .first();

    const restoredData = {
      date: historyEntry.menuDate,
      soup: historyEntry.soup,
      soupDescription: historyEntry.soupDescription,
      soupAllergens: historyEntry.soupAllergens,
      soupPrice: historyEntry.soupPrice,
      items: historyEntry.items,
      dessert: historyEntry.dessert,
      dessertDescription: historyEntry.dessertDescription,
      dessertAllergens: historyEntry.dessertAllergens,
      dessertPrice: historyEntry.dessertPrice,
      drinks: historyEntry.drinks,
      isPublished: historyEntry.isPublished,
    };

    if (existing) {
      // Save current as history first
      await ctx.db.insert("dailyMenuHistory", {
        menuDate: existing.date,
        version: existing.version,
        savedAt: Date.now(),
        soup: existing.soup,
        soupDescription: existing.soupDescription,
        soupAllergens: existing.soupAllergens,
        soupPrice: existing.soupPrice,
        items: existing.items,
        dessert: existing.dessert,
        dessertDescription: existing.dessertDescription,
        dessertAllergens: existing.dessertAllergens,
        dessertPrice: existing.dessertPrice,
        drinks: existing.drinks,
        isPublished: existing.isPublished,
      });

      const newVersion = (existing.version || 0) + 1;
      await ctx.db.patch(existing._id, { ...restoredData, version: newVersion });
      return existing._id;
    } else {
      return await ctx.db.insert("dailyMenu", { ...restoredData, version: 1 });
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
