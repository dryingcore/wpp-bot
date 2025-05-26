export class IntencaoVO {
  readonly tipo: string;
  readonly parametros: Record<string, string>;

  constructor(tipo: string, parametros: Record<string, string> = {}) {
    if (!tipo || typeof tipo !== 'string') {
      throw new Error('Intenção inválida');
    }

    this.tipo = tipo;
    this.parametros = parametros;
  }

  static fromJson(json: any): IntencaoVO {
    if (!json?.tipo) throw new Error('JSON de intenção malformado');
    return new IntencaoVO(json.tipo, json.parametros || {});
  }
}
