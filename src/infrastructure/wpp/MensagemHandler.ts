import { MensagemComandoVO } from '@/core/value-objects/ MensagemComandoVO';
import { Whatsapp } from '@wppconnect-team/wppconnect';

export class WppMensagemHandler {
  async tratarMensagem(client: Whatsapp, from: string, msg: string) {
    const comando = new MensagemComandoVO(msg);

    // Mensagens básicas que não são comandos
    switch (msg) {
      case 'lanche1':
        await client.sendText(from, '🍔 Você escolheu X-Burger! Valor: R$10,00');
        return;

      case 'lanche2':
        await client.sendText(from, '🍔 Você escolheu X-Bacon! Valor: R$12,00');
        return;

      case 'bebida1':
        await client.sendText(from, '🥤 Você escolheu Coca-Cola 350ml! Valor: R$5,00');
        return;

      case 'bebida2':
        await client.sendText(from, '🥤 Você escolheu Suco Natural 300ml! Valor: R$7,00');
        return;

      case 'menu_atendente':
        await client.sendText(from, '👨‍💼 Um atendente será acionado em breve!');
        return;
    }

    // Verifica se é um comando válido
    if (!comando.ComandoValido()) {
      await client.sendText(from, '❌ Desculpe, não entendi o comando.');
      return;
    }

    // Comandos válidos tratados por VO
    switch (comando.texto.toLowerCase()) {
      case 'menu':
        await client.sendListMessage(from, {
          buttonText: '🍽️ Ver cardápio',
          description: 'Escolha uma opção abaixo:',
          title: '🍔 *Cardápio Decode*',
          sections: [
            {
              title: 'Lanches',
              rows: [
                {
                  rowId: 'lanche1',
                  title: 'X-Burger',
                  description: 'Pão, hambúrguer, queijo – R$10,00',
                },
                {
                  rowId: 'lanche2',
                  title: 'X-Bacon',
                  description: 'Pão, hambúrguer, queijo, bacon – R$12,00',
                },
              ],
            },
            {
              title: 'Bebidas',
              rows: [
                {
                  rowId: 'bebida1',
                  title: 'Coca-Cola',
                  description: '350ml – R$5,00',
                },
                {
                  rowId: 'bebida2',
                  title: 'Suco Natural',
                  description: '300ml – R$7,00',
                },
              ],
            },
            {
              title: 'Outros',
              rows: [
                {
                  rowId: 'menu_atendente',
                  title: 'Falar com atendente',
                  description: 'Converse com alguém da equipe',
                },
              ],
            },
          ],
        });
        break;

      case 'oi':
        await client.sendText(from, 'Olá! 👋 Digite *menu* para ver nosso cardápio.');
        break;

      case 'ajuda':
        await client.sendText(from, '📋 Comandos disponíveis:\n• oi\n• ajuda\n• menu');
        break;

      default:
        await client.sendText(from, '🤔 Comando não reconhecido. Digite *menu* para começar.');
        break;
    }
  }
}
