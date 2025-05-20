export class RuaVO {
  private readonly _logradouro: string;

  constructor(logradouro: string) {
    const limpo = logradouro.trim();

    if (!limpo || limpo.length < 3) {
      throw new Error('Nome da rua é obrigatório e deve ter pelo menos 3 letras.');
    }

    this._logradouro = RuaVO.formatar(limpo);
  }

  private static formatar(nome: string): string {
    return nome
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
  }

  get value(): string {
    return this._logradouro;
  }

  public equals(outro: RuaVO): boolean {
    return this._logradouro === outro.value;
  }

  public toString(): string {
    return this._logradouro;
  }
}
