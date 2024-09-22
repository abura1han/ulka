CREATE TABLE `analytics` (
	`id` text(191) PRIMARY KEY DEFAULT '0f62434b-6f59-4639-8545-d3ab6db24e4a' NOT NULL,
	`app_id` text NOT NULL,
	`event_type` text NOT NULL,
	`source` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `app_store_urls` (
	`id` text(191) PRIMARY KEY DEFAULT '54ce997a-347a-45bd-bfa9-5590ae06d0d5' NOT NULL,
	`app_id` text NOT NULL,
	`platform` text NOT NULL,
	`store_url` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `apps` (
	`id` text(191) PRIMARY KEY DEFAULT 'fcb20ad4-4e20-4431-9315-9e1a7857ea38' NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`user_id` text NOT NULL,
	`package_name` text NOT NULL,
	`app_id` text,
	`custom_scheme` text NOT NULL,
	`fallback_url` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `redirect_settings` (
	`id` text(191) PRIMARY KEY DEFAULT 'e974ea0a-43fc-4211-b168-8264ac32d30b' NOT NULL,
	`app_id` text NOT NULL,
	`fallback_url` text,
	`deep_link_data` text,
	`tracking_enabled` integer DEFAULT true,
	`timeout` integer DEFAULT 5,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE cascade
);
