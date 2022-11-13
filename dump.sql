CREATE TABLE "users" (
	"id" serial NOT NULL,
	"role_id" serial NOT NULL,
	"permission_id" integer NOT NULL,
	"institutional_email" TEXT NOT NULL UNIQUE,
	"personal_email" TEXT NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"phone" TEXT NOT NULL UNIQUE,
	"cep" TEXT NOT NULL,
	"address_number" TEXT NOT NULL,
	"address_additional_information" TEXT NOT NULL,
	"institutional_id" TEXT NOT NULL UNIQUE,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "roles" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "roles_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "permissions" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"can_borrow_assets" BOOLEAN NOT NULL,
	"can_shop" BOOLEAN NOT NULL,
	"is_laboratory_admin" BOOLEAN NOT NULL,
	"is_institutional_employee" BOOLEAN NOT NULL,
	"is_laboratory_staff" BOOLEAN NOT NULL,
	CONSTRAINT "permissions_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

ALTER TABLE
	"users"
ADD
	CONSTRAINT "users_fk0" FOREIGN KEY ("role_id") REFERENCES "roles"("id");

ALTER TABLE
	"users"
ADD
	CONSTRAINT "users_fk1" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id");