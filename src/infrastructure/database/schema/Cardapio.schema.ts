import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const cardapios = pgTable('cardapios', {
  id: uuid('id').primaryKey().defaultRandom(),
  empresaId: uuid('empresa_id').notNull(),
  nome: varchar('nome', { length: 255 }).notNull(),
});
