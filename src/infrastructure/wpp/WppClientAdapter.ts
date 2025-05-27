import { create, Whatsapp } from '@wppconnect-team/wppconnect';
import { WppMensagemHandler } from './MensagemHandler';
import type { IWppClient } from '@/core/interfaces/IWppClient';

const clients = new Map<string, Whatsapp>();
const qrCodes = new Map<string, string>();
const sessionsReady = new Set<string>();

export class WppClientAdapter implements IWppClient {
  async startSession(sessionId: string): Promise<void> {
    if (clients.has(sessionId)) return;

    const client = await create({
      session: sessionId,
      catchQR: (qr: string) => {
        qrCodes.set(sessionId, qr);
        console.log(`✅ QR Code capturado para sessão "${sessionId}"`);
      },
      statusFind: (status: string) => {
        if (status === 'inChat') {
          sessionsReady.add(sessionId);
          console.log(`🔐 Sessão "${sessionId}" autenticada.`);
        } else {
          console.log(`📡 Status da sessão "${sessionId}": ${status}`);
        }
      },
    });

    const handler = new WppMensagemHandler();

    client.onMessage(async msg => {
      const text = msg.body?.trim();
      if (!text) return;

      try {
        await handler.tratarMensagem(client, msg.from, text);
      } catch (err) {
        console.error(`❌ Erro na sessão "${sessionId}":`, err);
        await client.sendText(msg.from, '⚠️ Erro ao processar sua mensagem.');
      }
    });

    clients.set(sessionId, client);
  }

  getQrCode(sessionId: string): string | null {
    return qrCodes.get(sessionId) ?? null;
  }

  isSessionReady(sessionId: string): boolean {
    return sessionsReady.has(sessionId);
  }

  getClient(sessionId: string): Whatsapp {
    const client = clients.get(sessionId);
    if (!client) throw new Error(`⚠️ Sessão "${sessionId}" ainda não iniciada.`);
    return client;
  }
}
