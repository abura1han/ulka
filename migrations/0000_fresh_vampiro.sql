CREATE TABLE `analytics` (
	`id` text(191) PRIMARY KEY DEFAULT 'f8f1615b-e75a-48a4-8028-32c2808b5e08' NOT NULL,
	`app_id` text NOT NULL,
	`event_type` text NOT NULL,
	`source` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `app_store_urls` (
	`id` text(191) PRIMARY KEY DEFAULT '61d30ae6-9c9b-4f49-8d19-a41863958883' NOT NULL,
	`app_id` text NOT NULL,
	`platform` text NOT NULL,
	`store_url` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `apps` (
	`id` text(191) PRIMARY KEY DEFAULT '965851d9-d291-42ee-aadb-09886bca6351' NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`user_id` text NOT NULL,
	`package_name` text NOT NULL,
	`app_id` text,
	`custom_scheme` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `redirect_settings` (
	`id` text(191) PRIMARY KEY DEFAULT 'ef4e2f04-6c40-488a-b151-1182389c8e8e' NOT NULL,
	`app_id` text NOT NULL,
	`fallback_url` text,
	`deep_link_data` text,
	`tracking_enabled` integer DEFAULT true,
	`timeout` integer DEFAULT 5,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE cascade
);
