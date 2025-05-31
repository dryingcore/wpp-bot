import { numeric, pgTable, uuid, varchar, boolean } from 'drizzle-orm/pg-core';
import { cardapios } from './Cardapio.schema';

export const cardapioItens = pgTable('cardapio_itens', {
  id: uuid('id').primaryKey().defaultRandom(),
  empresaId: uuid('empresa_id').notNull(),
  cardapioId: uuid('cardapio_id')
    .notNull()
    .references(() => cardapios.id, { onDelete: 'cascade' }),
  nome: varchar('nome', { length: 255 }).notNull(),
  descricao: varchar('descricao', { length: 512 }),
  preco: numeric('preco', { precision: 10, scale: 2 }).notNull(),
  disponivel: boolean('disponivel').notNull().default(true),
});
