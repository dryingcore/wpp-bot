import type { OpenRouterChatResponse } from '@/@types/OpenRouterChatResponse';
import { IntencaoVO } from '@/core/value-objects/IntencaoVO';
import promptBase from '@/infrastructure/ia/prompt/prompt.json';

export class OpenRouterService {
  private static readonly API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  private static readonly API_KEY = process.env.OPENROUTER_API_KEY;

  static async classificarIntencao(frase: string): Promise<IntencaoVO> {
    if (!this.API_KEY) {
      throw new Error('OPENROUTER_API_KEY não definida.');
    }

    const prompt = [
      ...promptBase,
      {
        role: 'user',
        content: frase,
      },
    ];

    const resposta = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.API_KEY}`,
        'Content-Type': 'application/json',
        'X-Title': 'WPP-BOT',
        'HTTP-Referer': 'https://decodesoftware.tech',
      },
      body: JSON.stringify({
        model: 'nousresearch/deephermes-3-mistral-24b-preview:free',
        messages: prompt,
      }),
    });

    if (!resposta.ok) {
      throw new Error(`Erro na API: ${resposta.statusText}`);
    }

    const json = (await resposta.json()) as OpenRouterChatResponse;
    const content = json.choices?.[0]?.message?.content ?? '';

    try {
      const objeto = JSON.parse(content);
      return IntencaoVO.fromJson(objeto);
    } catch (err) {
      console.error('Erro ao interpretar JSON da IA:', content);
      throw new Error('Resposta da IA malformada');
    }
  }
}
