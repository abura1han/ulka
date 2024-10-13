import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

// Apps Table
export const appsTable = sqliteTable("apps", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  // User data
  userId: text("user_id").notNull(),

  // Company data
  name: text("app_name").notNull(),
  logo: text("logo_url").notNull(),

  // Linking data
  packageName: text("package_name"),
  iosAppId: text("ios_app_id"),
  customScheme: text("custom_scheme").notNull(),
  fallbackUrl: text("fallback_url").notNull(),

  // Time stamp
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: text("updated_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

// Tracking and Analytics Table
export const analyticsTable = sqliteTable("analytics", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

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

export type InsertAnalytics = typeof analyticsTable.$inferInsert;
export type SelectAnalytics = typeof analyticsTable.$inferSelect;
