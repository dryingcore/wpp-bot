import type { FastifyInstance } from 'fastify';
import { WppController } from '../controllers/wpp.controller';
import type WppService from '@/core/services/WppService';

export default function registerWppRoutes(fastify: FastifyInstance, service: WppService) {
  const controller = new WppController(service);

  fastify.post('/wpp/:empresaId/start', controller.startSession.bind(controller));
  fastify.get('/wpp/:empresaId/qr', controller.getQRCode.bind(controller));
}
