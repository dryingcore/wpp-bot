export default class NomeVO {
  private readonly _nome: string;
  private readonly _sobrenome: string;

  constructor(nome: string, sobrenome: string) {
    const nomeLimpo = nome.trim();
    const sobrenomeLimpo = sobrenome.trim();

    if (!nomeLimpo || !sobrenomeLimpo) {
      throw new Error('Nome e sobrenome são obrigatórios.');
    }

    this._nome = NomeVO.formatar(nomeLimpo);
    this._sobrenome = NomeVO.formatar(sobrenomeLimpo);
  }

  static formatar(valor: string): string {
    return valor
      .toLocaleLowerCase('pt-BR')
      .replace(/(^|\s)(\p{L})/gu, (_, sep, letra) => sep + letra.toLocaleUpperCase('pt-BR'));
  }

  get nome(): string {
    return this._nome;
  }

  get sobrenome(): string {
    return this._sobrenome;
  }

  get completo(): string {
    return `${this._nome} ${this._sobrenome}`;
  }

  toString(): string {
    return this.completo;
  }

  equals(outro: NomeVO): boolean {
    return this._nome === outro.nome && this._sobrenome === outro.sobrenome;
  }
}
