export class CidadeVO {
  private readonly _nome: string;

  constructor(nome: string) {
    const nomeLimpo = nome.trim();

    if (!nomeLimpo || nomeLimpo.length < 2) {
      throw new Error('Nome da cidade é obrigatório e deve ter pelo menos 2 letras.');
    }

    this._nome = CidadeVO.formatar(nomeLimpo);
  }

  private static formatar(nome: string): string {
    return nome
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
  }

  get value(): string {
    return this._nome;
  }

  equals(outro: CidadeVO): boolean {
    return this._nome === outro.value;
  }

  toString(): string {
    return this._nome;
  }
}
