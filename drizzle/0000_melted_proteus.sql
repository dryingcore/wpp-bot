CREATE SCHEMA "cardapio_schema";
--> statement-breakpoint
CREATE TABLE "cardapio_schema"."cardapio" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cardapio_schema"."cardapio_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"descricao" text,
	"preco" numeric(10, 2) NOT NULL,
	"disponivel" boolean DEFAULT true NOT NULL,
	"cardapio_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clientes" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255),
	"rua" varchar(255),
	"bairro" varchar(255),
	"estado" varchar(255),
	"cidade" varchar(255),
	"telefone" varchar(20),
	"criado_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cardapio_schema"."cardapio_item" ADD CONSTRAINT "cardapio_item_cardapio_id_cardapio_id_fk" FOREIGN KEY ("cardapio_id") REFERENCES "cardapio_schema"."cardapio"("id") ON DELETE cascade ON UPDATE no action;