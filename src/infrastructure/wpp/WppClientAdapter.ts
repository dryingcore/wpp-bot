import { create, Whatsapp } from '@wppconnect-team/wppconnect';
import { WppMensagemHandler } from './MensagemHandler';
import type { IWppClient } from '@/core/interfaces/IWppClient';

/**
 * Armazena os clientes WhatsApp por sessionId.
 */
const clients = new Map<string, Whatsapp>();

/**
 * Armazena os QR Codes de cada sessão.
 */
const qrCodes = new Map<string, string>();

/**
 * Conjunto de sessionIds com sessão já autenticada e pronta.
 */
const sessionsReady = new Set<string>();

/**
 * Adaptador para integração com o WPPConnect.
 * Implementa a interface `IWppClient`.
 */
export class WppClientAdapter implements IWppClient {
  /**
   * Inicia uma nova sessão do WhatsApp.
   *
   * @param sessionId - Identificador único da sessão.
   * @returns Promise que resolve quando a sessão estiver iniciada.
   * @throws Caso haja falha na inicialização ou duplicidade de sessão.
   */
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

      puppeteerOptions: {
        userDataDir: `./tokens/${sessionId}`, // 🛡️ isola cada sessão
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
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

  /**
   * Retorna o QR Code da sessão (se disponível).
   *
   * @param sessionId - Identificador da sessão.
   * @returns O QR code como string, ou `null` se ainda não capturado.
   */
  getQrCode(sessionId: string): string | null {
    return qrCodes.get(sessionId) ?? null;
  }

  /**
   * Verifica se a sessão está autenticada e pronta.
   *
   * @param sessionId - Identificador da sessão.
   * @returns `true` se a sessão está pronta, `false` caso contrário.
   */
  isSessionReady(sessionId: string): boolean {
    return sessionsReady.has(sessionId);
  }

  /**
   * Retorna o cliente `Whatsapp` da sessão.
   *
   * @param sessionId - Identificador da sessão.
   * @throws Caso a sessão não tenha sido iniciada.
   * @returns O objeto cliente `Whatsapp`.
   */
  getClient(sessionId: string): Whatsapp {
    const client = clients.get(sessionId);
    if (!client) {
      throw new Error(`⚠️ Sessão "${sessionId}" ainda não iniciada.`);
    }
    return client;
  }
}
