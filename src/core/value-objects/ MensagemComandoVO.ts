export class MensagemComandoVO {
  constructor(public readonly texto: string) {}

  ComandoValido(): boolean {
    return ['oi', 'ajuda', 'menu'].includes(this.texto.toLowerCase());
  }
}
