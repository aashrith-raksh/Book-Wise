CREATE TYPE "public"."borrowed" AS ENUM('BORROWED', 'RETURNED');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('STUDENT', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('PENDING', 'REJECTED', 'APPROVED');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fullName" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"university_card" text NOT NULL,
	"university_number" integer NOT NULL,
	"status" "status" DEFAULT 'PENDING',
	"role" "role" DEFAULT 'STUDENT',
	"last_activity_status" date DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
