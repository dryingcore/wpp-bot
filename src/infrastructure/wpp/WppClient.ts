import { create, Whatsapp } from '@wppconnect-team/wppconnect';
import { WppMensagemHandler } from './MensagemHandler';

let client: Whatsapp;

export async function initWppClient() {
  client = await create({
    session: 'ComandaBot',
    catchQR: base64Qr => {
      console.log('QR Code gerado:');
    },
    statusFind: status => {
      console.log('Status da sessão:', status);
    },
  });

  const handler = new WppMensagemHandler();

  client.onMessage(async message => {
    const text = message.body?.trim() ?? '';

    if (!text) return;

    try {
      await handler.tratarMensagem(client, message.from, text);
    } catch (err) {
      console.error('Erro ao processar mensagem:', err);
      await client.sendText(message.from, '⚠️ Ocorreu um erro ao processar sua mensagem.');
    }
  });

  return client;
}

export function getWppClient(): Whatsapp {
  if (!client) throw new Error('Cliente WPP ainda não iniciado');
  return client;
}
