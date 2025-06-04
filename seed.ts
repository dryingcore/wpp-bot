import { db } from '@/infrastructure/database/client';
import { randomUUID } from 'crypto';

// imports corrigidos dos schemas
import { empresas } from '@/infrastructure/database/schema/Empresa.schema';
import { cardapios } from '@/infrastructure/database/schema/Cardapio.schema';
import { cardapioItens } from '@/infrastructure/database/schema/CardapioItems.schema';
import { clientes } from '@/infrastructure/database/schema/Cliente.schema';

async function seed() {
  const empresaId = randomUUID();
  const cardapioId = randomUUID();

  // ✅ Seed da empresa
  await db.insert(empresas).values({
    id: empresaId,
    nome: 'Lanchonete Central',
    cnpj: '11.222.333/0001-44',
  });

  // ✅ Seed do cardápio
  await db.insert(cardapios).values({
    id: cardapioId,
    nome: 'Cardápio Principal',
    empresaId,
  });

  // ✅ Seed dos itens do cardápio
  await db.insert(cardapioItens).values([
    {
      id: randomUUID(),
      empresaId,
      cardapioId,
      nome: 'X-Burger',
      descricao: 'Pão, carne e queijo',
      preco: '18.90',
      disponivel: true,
    },
    {
      id: randomUUID(),
      empresaId,
      cardapioId,
      nome: 'Suco Natural',
      descricao: 'Copo 300ml, laranja ou limão',
      preco: '7.00',
      disponivel: true,
    },
    {
      id: randomUUID(),
      empresaId,
      cardapioId,
      nome: 'Batata Frita Média',
      descricao: 'Porção para 1-2 pessoas',
      preco: '12.00',
      disponivel: true,
    },
  ]);

  console.log('✅ Seed concluída com sucesso.');
}

seed().catch(err => {
  console.error('❌ Erro ao rodar seed:', err);
  process.exit(1);
});
