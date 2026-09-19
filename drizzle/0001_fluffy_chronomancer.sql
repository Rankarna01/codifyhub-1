ALTER TABLE "projects" ADD COLUMN "second_image_url" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "show_on_home" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "home_order" integer DEFAULT 0 NOT NULL;