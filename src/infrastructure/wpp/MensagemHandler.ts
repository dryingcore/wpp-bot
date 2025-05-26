import { OpenRouterService } from '../ia/OpenRouterService';
import { Whatsapp } from '@wppconnect-team/wppconnect';

export class WppMensagemHandler {
  async tratarMensagem(client: Whatsapp, from: string, texto: string): Promise<void> {
    try {
      const intencao = await OpenRouterService.classificarIntencao(texto);

      switch (intencao.tipo) {
        case 'consultar_funcionamento':
          await client.sendText(from, '✅ Estamos funcionando hoje das 18h às 23h.');
          break;

        case 'fazer_pedido':
          await client.sendText(from, '📦 Para fazer um pedido, envie o nome do item e quantidade.');
          break;

        case 'consultar_cardapio':
          await client.sendText(
            from,
            `📋 *Cardápio Decode*\n\n` +
              `🍔 *X-Burger* - Pão, hambúrguer, queijo — *R$10,00*\n` +
              `🍹 *Suco Natural* 300ml — *R$7,00*\n` +
              `🥪 *Misto Quente* — *R$8,00*\n` +
              `🍟 *Batata Frita* — *R$6,00*\n\n` +
              `Envie o nome do item para fazer seu pedido.`,
          );
          break;

        default:
          await client.sendText(from, `🤖 Não entendi sua intenção: "${intencao.tipo}".`);
      }
    } catch (err: any) {
      console.error('Erro ao tratar mensagem:', err);
      await client.sendText(from, '⚠️ Não consegui entender sua mensagem. Pode reformular?');
    }
  }
}
