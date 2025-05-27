import type WppService from '@/core/services/WppService';
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export class WppController {
  constructor(private readonly fastify: FastifyInstance, private readonly service: WppService) {
    this.setupRoutes();
  }

  private setupRoutes() {
    this.fastify.post('/wpp/:empresaId/start', this.startSession.bind(this));
    this.fastify.get('/wpp/:empresaId/qr', this.getQRCode.bind(this));
  }

  private async startSession(request: FastifyRequest, reply: FastifyReply) {
    const { empresaId } = request.params as { empresaId: string };

    try {
      await this.service.iniciarSessao(empresaId);
      return reply.send({ status: 'sessao_iniciada', empresaId });
    } catch (err) {
      this.fastify.log.error(err);
      return reply.code(500).send({ erro: 'Erro ao iniciar sessão WPP' });
    }
  }

  private async getQRCode(request: FastifyRequest, reply: FastifyReply) {
    const { empresaId } = request.params as { empresaId: string };

    try {
      const qrCode = this.service.getQrCode(empresaId);
      if (!qrCode) {
        return reply.code(404).send({ erro: 'QR Code não disponível' });
      }

      return reply.send({ qrCode });
    } catch (err) {
      this.fastify.log.error(err);
      return reply.code(500).send({ erro: 'Erro interno ao buscar QR Code' });
    }
  }
}
