CREATE TABLE "payment_methods" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"flag" varchar NOT NULL,
	"last_four_digits" varchar(4) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"icon" text NOT NULL,
	"price" numeric NOT NULL,
	"start_date" date NOT NULL,
	"period" varchar NOT NULL,
	"plan" text NOT NULL,
	"author_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_author_id_payment_methods_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."payment_methods"("id") ON DELETE no action ON UPDATE no action;