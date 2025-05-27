import { WppClientAdapter } from '@/infrastructure/wpp/WppClientAdapter';
import WppService from '@/core/services/WppService';

import Fastify from 'fastify';
import { WppController } from '@/infrastructure/http/controllers/wpp.controller';

const app = Fastify({
  logger: true,
});

const wppService = new WppService(new WppClientAdapter());
new WppController(app, wppService);

app.listen({ port: 3001 }, err => {
  if (err) throw err;
  console.log('Servidor escutando em http://localhost:3001');
});
