import Fastify from 'fastify';
import { WppClientAdapter } from '@/infrastructure/wpp/WppClientAdapter';
import WppService from '@/core/services/WppService';
import registerWppRoutes from '@/infrastructure/http/routes/wpp.routes';

const app = Fastify({ logger: true });

const wppService = new WppService(new WppClientAdapter());
registerWppRoutes(app, wppService);

app.listen({ port: 3001 }, err => {
  if (err) throw err;
  console.log('Servidor escutando em http://localhost:3001');
});
