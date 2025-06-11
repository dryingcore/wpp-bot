export default class ItemCardapio {
  private id: string;
  private nome: string;
  private preco: number;
  private descricao?: string;
  private disponivel: boolean;

  constructor(id: string, nome: string, preco: number, descricao?: string, disponivel: boolean = true) {
    if (preco < 0) throw new Error('Preço inválido');
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
    this.disponivel = disponivel;
  }

  getId() {
    return this.id;
  }

  getNome() {
    return this.nome;
  }

  getPreco() {
    return this.preco;
  }

  getDescricao() {
    return this.descricao;
  }

  estaDisponivel() {
    return this.disponivel;
  }

  alterarPreco(novoPreco: number) {
    if (novoPreco < 0) throw new Error('Preço não pode ser negativo');
    this.preco = novoPreco;
  }

  desativar() {
    this.disponivel = false;
  }

  ativar() {
    this.disponivel = true;
  }
}
