CREATE TABLE "role" (
	"id" bigint PRIMARY KEY,
	"code" text NOT NULL CONSTRAINT "unique_code" UNIQUE,
	"name" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_role_mapping" (
	"userId" bigint,
	"roleId" bigint,
	CONSTRAINT "user_role_mapping_pkey" PRIMARY KEY("userId","roleId")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" bigint PRIMARY KEY,
	"username" text NOT NULL,
	"phone" text NOT NULL CONSTRAINT "unique_phone" UNIQUE,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"avatar" text,
	"registeredAt" timestamp with time zone NOT NULL,
	"updated_by" text,
	"updated_by_id" bigint,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "user_role_mapping" ADD CONSTRAINT "user_role_mapping_userId_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "user_role_mapping" ADD CONSTRAINT "user_role_mapping_roleId_role_id_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id");