CREATE TABLE `analytics` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`app_id` text NOT NULL,
	`event_type` text NOT NULL,
	`source` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `apps` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`app_name` text NOT NULL,
	`logo_url` text NOT NULL,
	`package_name` text,
	`ios_app_id` text,
	`custom_scheme` text NOT NULL,
	`fallback_url` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
