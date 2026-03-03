import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  dailyMenu: defineTable({
    date: v.string(), // ISO date string e.g. "2026-03-03"
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
  }).index("by_date", ["date"]),

  adminSessions: defineTable({
    token: v.string(),
    expiresAt: v.number(), // unix timestamp ms
  }).index("by_token", ["token"]),
});
