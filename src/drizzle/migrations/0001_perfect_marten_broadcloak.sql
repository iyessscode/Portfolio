ALTER TABLE "auth_schema"."users" ADD COLUMN "role" text;--> statement-breakpoint
ALTER TABLE "auth_schema"."users" ADD COLUMN "banned" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "auth_schema"."users" ADD COLUMN "ban_reason" text;--> statement-breakpoint
ALTER TABLE "auth_schema"."users" ADD COLUMN "ban_expires" timestamp;