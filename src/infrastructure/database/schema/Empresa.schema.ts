import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const empresas = pgTable('empresas', {
  id: uuid('id').primaryKey().defaultRandom(),
  nome: varchar('nome', { length: 255 }).notNull(),
  cnpj: varchar('cnpj', { length: 18 }).unique().notNull(),
});
