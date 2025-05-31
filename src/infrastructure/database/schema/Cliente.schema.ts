import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const clientes = pgTable('clientes', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 255 }),
  rua: varchar('rua', { length: 255 }),
  bairro: varchar('bairro', { length: 255 }),
  estado: varchar('estado', { length: 255 }),
  cidade: varchar('cidade', { length: 255 }),
  telefone: varchar('telefone', { length: 20 }),
  criadoEm: timestamp('criado_em').defaultNow().notNull(),
});
