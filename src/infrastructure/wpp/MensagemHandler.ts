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
          await client.sendText(from, '📦 Para fazer um pedido, envie o nome do item e a quantidade. Ex: *2 X-Burger*');
          break;

        case 'mostrar_cardapio':
          await client.sendListMessage(from, {
            buttonText: 'Ver opções 🍽️',
            description: 'Confira nosso cardápio e selecione um item para pedir!',
            sections: [
              {
                title: '🍴 Cardápio Decode',
                rows: [
                  {
                    rowId: 'pedido_xburger',
                    title: '🍔 X-Burger',
                    description: 'Pão, hambúrguer, queijo — R$10,00',
                  },
                  {
                    rowId: 'pedido_suco',
                    title: '🍹 Suco Natural 300ml',
                    description: 'Suco de fruta natural — R$7,00',
                  },
                  {
                    rowId: 'pedido_misto',
                    title: '🥪 Misto Quente',
                    description: 'Pão de forma com queijo e presunto — R$8,00',
                  },
                  {
                    rowId: 'pedido_batata',
                    title: '🍟 Batata Frita',
                    description: 'Porção individual crocante — R$6,00',
                  },
                ],
              },
            ],
            title: '📋 Cardápio Decode',
          });
          break;

        case 'consultar_promocao':
          await client.sendText(
            from,
            '🎉 Hoje temos *X-Burger + Suco Natural* por apenas *R$15,00*! Promoção válida até as 22h.',
          );
          break;

        case 'consultar_desconto':
          await client.sendText(from, '🔖 Clientes que fazem pedidos acima de R$30 ganham 10% de desconto!');
          break;

        case 'cumprimento':
          await client.sendText(from, '👋 Olá! Tudo certo por aí? Posso te ajudar com nosso cardápio ou pedidos.');
          break;

        default:
          await client.sendText(from, `🤖 Não entendi sua intenção. Pode reformular a pergunta?`);
      }
    } catch (err: any) {
      console.error('Erro ao tratar mensagem:', err);
      await client.sendText(from, '⚠️ Não consegui entender sua mensagem. Pode tentar reformular?');
    }
  }
}
