import type { FastifyRequest, FastifyReply } from 'fastify';
import type WppService from '@/core/services/WppService';

export class WppController {
  constructor(private readonly service: WppService) {}

  async startSession(request: FastifyRequest, reply: FastifyReply) {
    const { empresaId } = request.params as { empresaId: string };
    try {
      await this.service.iniciarSessao(empresaId);
      return reply.send({ status: 'sessao_iniciada', empresaId });
    } catch (err) {
      return reply.code(500).send({ erro: 'Erro ao iniciar sessão WPP' });
    }
  }

  async getQRCode(request: FastifyRequest, reply: FastifyReply) {
    const { empresaId } = request.params as { empresaId: string };
    try {
      const qrCode = this.service.getQrCode(empresaId);
      if (!qrCode) return reply.code(404).send({ erro: 'QR Code não disponível' });
      return reply.send({ qrCode });
    } catch (err) {
      return reply.code(500).send({ erro: 'Erro ao buscar QR Code' });
    }
  }
}
