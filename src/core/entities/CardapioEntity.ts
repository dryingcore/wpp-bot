import ItemCardapio from '@/core/entities/CardapioItemEntity';

export class CardapioEntity {
  private id: string;
  private titulo: string;
  private itens: ItemCardapio[];

  constructor(id: string, titulo: string, itens: ItemCardapio[] = []) {
    this.id = id;
    this.titulo = titulo;
    this.itens = itens;
  }

  getId() {
    return this.id;
  }

  getTitulo() {
    return this.titulo;
  }

  getItens() {
    return [...this.itens];
  }

  adicionarItem(item: ItemCardapio) {
    this.itens.push(item);
  }

  removerItemPorId(id: string) {
    this.itens = this.itens.filter(item => item.getId() !== id);
  }
}
