type TipoDistribuicao =
  | 'Logradouro comum'
  | 'Código Especial'
  | 'CEP Promocional'
  | 'Unidade dos Correios'
  | 'Caixa Postal Comunitária';

type RegiaoPostal =
  | 'Grande São Paulo'
  | 'Interior de SP'
  | 'Rio de Janeiro e ES'
  | 'Minas Gerais'
  | 'BA e SE'
  | 'PE, AL, PB, RN'
  | 'CE, PI, MA, PA, AP, AM, RR, AC'
  | 'DF, GO, RO, TO, MT e MS'
  | 'PR e SC'
  | 'RS'
  | 'Desconhecida';

export class CepVO {
  private readonly _valor: string;

  constructor(valor: string) {
    const somenteNumeros = valor.replace(/\D/g, '');

    if (!/^\d{8}$/.test(somenteNumeros)) {
      throw new Error('CEP inválido: deve conter exatamente 8 dígitos numéricos.');
    }

    // Armazena com hífen
    const comHifen = `${somenteNumeros.substring(0, 5)}-${somenteNumeros.substring(5)}`;
    this._valor = comHifen;
  }

  get valor(): string {
    return this._valor;
  }

  private get apenasDigitos(): string {
    return this._valor.replace('-', '');
  }

  get regiao(): number {
    return Number(this.apenasDigitos.charAt(0));
  }

  get subRegiao(): number {
    return Number(this.apenasDigitos.charAt(1));
  }

  get setor(): number {
    return Number(this.apenasDigitos.charAt(2));
  }

  get subsetor(): number {
    return Number(this.apenasDigitos.charAt(3));
  }

  get divisorSubsetor(): number {
    return Number(this.apenasDigitos.charAt(4));
  }

  get sufixo(): number {
    return Number(this.apenasDigitos.substring(5));
  }

  get tipoDistribuicao(): TipoDistribuicao {
    const sufixo = this.sufixo;

    if (sufixo >= 900 && sufixo <= 959) return 'Código Especial';
    if (sufixo >= 960 && sufixo <= 969) return 'CEP Promocional';
    if (sufixo >= 970 && sufixo <= 989) return 'Unidade dos Correios';
    if (sufixo >= 990 && sufixo <= 998) return 'Caixa Postal Comunitária';
    return 'Logradouro comum';
  }

  get regiaoPostal(): RegiaoPostal {
    switch (this.regiao) {
      case 0:
        return 'Grande São Paulo';
      case 1:
        return 'Interior de SP';
      case 2:
        return 'Rio de Janeiro e ES';
      case 3:
        return 'Minas Gerais';
      case 4:
        return 'BA e SE';
      case 5:
        return 'PE, AL, PB, RN';
      case 6:
        return 'CE, PI, MA, PA, AP, AM, RR, AC';
      case 7:
        return 'DF, GO, RO, TO, MT e MS';
      case 8:
        return 'PR e SC';
      case 9:
        return 'RS';
      default:
        return 'Desconhecida';
    }
  }

  public mesmaRegiaoDe(outro: CepVO): boolean {
    return this.regiao === outro.regiao;
  }

  public pertenceAoEstado(uf: string): boolean {
    const estadosPorRegiao: Record<number, string[]> = {
      0: ['SP'],
      1: ['SP'],
      2: ['RJ', 'ES'],
      3: ['MG'],
      4: ['BA', 'SE'],
      5: ['PE', 'AL', 'PB', 'RN'],
      6: ['CE', 'PI', 'MA', 'PA', 'AP', 'AM', 'RR', 'AC'],
      7: ['DF', 'GO', 'RO', 'TO', 'MT', 'MS'],
      8: ['PR', 'SC'],
      9: ['RS'],
    };

    const estados = estadosPorRegiao[this.regiao] || [];
    return estados.includes(uf.toUpperCase());
  }

  public equals(outro: CepVO): boolean {
    return this._valor === outro.valor;
  }

  public toString(): string {
    return this._valor;
  }

  public toJSON(): object {
    return {
      valor: this._valor,
      regiao: this.regiao,
      regiaoPostal: this.regiaoPostal,
      subRegiao: this.subRegiao,
      setor: this.setor,
      subsetor: this.subsetor,
      divisorSubsetor: this.divisorSubsetor,
      sufixo: this.sufixo,
      tipoDistribuicao: this.tipoDistribuicao,
    };
  }
}
