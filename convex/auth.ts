import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const login = mutation({
  args: { password: v.string() },
  handler: async (ctx, { password }) => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error("ADMIN_PASSWORD not configured");
    }
    if (password !== adminPassword) {
      throw new Error("Invalid password");
    }

    // Generate a random token
    const token =
      Math.random().toString(36).slice(2) +
      Math.random().toString(36).slice(2) +
      Date.now().toString(36);

    // Expires in 24 hours
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await ctx.db.insert("adminSessions", { token, expiresAt });

    return { token };
  },
});

export const verifySession = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    if (!token) return false;

    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (!session) return false;
    if (session.expiresAt < Date.now()) return false;

    return true;
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});
