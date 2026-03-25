import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const menuItemValidator = v.object({
  name: v.string(),
  description: v.string(),
  allergens: v.optional(v.string()), // e.g. "1,3,7"
  price: v.number(),
  isVegetarian: v.optional(v.boolean()),
});

export default defineSchema({
  dailyMenu: defineTable({
    date: v.string(), // ISO date string e.g. "2026-03-03"
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
    version: v.number(), // auto-incremented on each save
  }).index("by_date", ["date"]),

  dailyMenuHistory: defineTable({
    menuDate: v.string(), // which date's menu this is a snapshot of
    version: v.number(),
    savedAt: v.number(), // unix timestamp ms
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
  }).index("by_menu_date", ["menuDate"]),

  adminSessions: defineTable({
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),

  reservations: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    date: v.string(),
    time: v.string(),
    guests: v.number(),
    occasion: v.optional(v.string()),
    notes: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("rejected")
    ),
    createdAt: v.number(),
    respondedAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_date", ["date"]),
});
