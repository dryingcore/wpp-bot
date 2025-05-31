CREATE TABLE "cardapios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"empresa_id" uuid NOT NULL,
	"nome" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cardapio_itens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"empresa_id" uuid NOT NULL,
	"cardapio_id" uuid NOT NULL,
	"nome" varchar(255) NOT NULL,
	"descricao" varchar(512),
	"preco" numeric(10, 2) NOT NULL,
	"disponivel" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "empresas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(255) NOT NULL,
	"cnpj" varchar(18) NOT NULL,
	CONSTRAINT "empresas_cnpj_unique" UNIQUE("cnpj")
);
--> statement-breakpoint
DROP TABLE "cardapio_schema"."cardapio" CASCADE;--> statement-breakpoint
DROP TABLE "cardapio_schema"."cardapio_item" CASCADE;--> statement-breakpoint
ALTER TABLE "cardapio_itens" ADD CONSTRAINT "cardapio_itens_cardapio_id_cardapios_id_fk" FOREIGN KEY ("cardapio_id") REFERENCES "public"."cardapios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
DROP SCHEMA "cardapio_schema";
