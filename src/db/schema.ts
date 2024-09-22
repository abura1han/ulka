import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Apps Table
export const appsTable = sqliteTable("apps", {
  id: text("id", { length: 191 }).primaryKey().default(crypto.randomUUID()),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: text("user_id").notNull(), // Clerk User ID
  packageName: text("package_name").notNull(), // Android package name
  appId: text("app_id"), // iOS App ID
  customScheme: text("custom_scheme").notNull(), // Custom URL scheme
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
});

// App Store URLs Table
export const appStoreUrlsTable = sqliteTable("app_store_urls", {
  id: text("id", { length: 191 }).primaryKey().default(crypto.randomUUID()),
  appId: text("app_id")
    .notNull()
    .references(() => appsTable.id, { onDelete: "cascade" }),
  platform: text("platform").notNull(), // 'android', 'ios', or 'third-party'
  storeUrl: text("store_url").notNull(), // App store or third-party store URL
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

// Redirect Settings Table
export const redirectSettingsTable = sqliteTable("redirect_settings", {
  id: text("id", { length: 191 }).primaryKey().default(crypto.randomUUID()),
  appId: text("app_id")
    .notNull()
    .references(() => appsTable.id, { onDelete: "cascade" }),
  fallbackUrl: text("fallback_url"), // URL to redirect to if app is not installed
  deepLinkData: text("deep_link_data"), // Data passed into the deep link
  trackingEnabled: integer("tracking_enabled", { mode: "boolean" }).default(
    true
  ), // Enable/Disable tracking
  timeout: integer("timeout").default(5), // Timeout in seconds before redirecting to fallback
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

// Tracking and Analytics Table
export const analyticsTable = sqliteTable("analytics", {
  id: text("id", { length: 191 }).primaryKey().default(crypto.randomUUID()),
  appId: text("app_id")
    .notNull()
    .references(() => appsTable.id, { onDelete: "cascade" }),
  eventType: text("event_type").notNull(), // 'click', 'install', 'open'
  source: text("source"), // Optional UTM parameters or source info
  timestamp: text("timestamp")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type InsertApp = typeof appsTable.$inferInsert;
export type SelectApp = typeof appsTable.$inferSelect;

export type InsertAppStoreUrl = typeof appStoreUrlsTable.$inferInsert;
export type SelectAppStoreUrl = typeof appStoreUrlsTable.$inferSelect;

export type InsertRedirectSetting = typeof redirectSettingsTable.$inferInsert;
export type SelectRedirectSetting = typeof redirectSettingsTable.$inferSelect;

export type InsertAnalytics = typeof analyticsTable.$inferInsert;
export type SelectAnalytics = typeof analyticsTable.$inferSelect;
