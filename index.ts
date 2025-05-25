import { initWppClient } from '@/infrastructure/wpp/WppClient';
import Fastify from 'fastify';

async function start() {
  const fastify = Fastify({ logger: true });

  fastify.get('/health', async () => {
    return { status: 'ok' };
  });

  await initWppClient();

  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Fastify rodando em http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
