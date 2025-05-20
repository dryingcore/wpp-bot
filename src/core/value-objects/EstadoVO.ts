export class EstadoVO {
  private static readonly SIGLAS_VALIDAS = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  private readonly uf: string;

  constructor(uf: string) {
    const sigla = uf.toUpperCase();

    if (!EstadoVO.SIGLAS_VALIDAS.includes(sigla)) {
      throw new Error(`Sigla de estado inválida: ${uf}`);
    }

    this.uf = sigla;
  }

  get value(): string {
    return this.uf;
  }

  equals(outro: EstadoVO): boolean {
    return this.uf === outro.uf;
  }

  toString(): string {
    return this.uf;
  }
}
