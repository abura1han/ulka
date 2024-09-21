CREATE TABLE `analytics` (
	`id` integer PRIMARY KEY NOT NULL,
	`app_id` integer NOT NULL,
	`event_type` text NOT NULL,
	`source` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `app_store_urls` (
	`id` integer PRIMARY KEY NOT NULL,
	`app_id` integer NOT NULL,
	`platform` text NOT NULL,
	`store_url` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `apps` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`user_id` integer NOT NULL,
	`package_name` text NOT NULL,
	`app_id` text,
	`custom_scheme` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `redirect_settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`app_id` integer NOT NULL,
	`fallback_url` text,
	`deep_link_data` text,
	`tracking_enabled` integer DEFAULT true,
	`timeout` integer DEFAULT 5,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);