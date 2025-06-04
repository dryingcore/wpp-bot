import { describe, it, expect } from 'bun:test';
import ItemCardapio from '@/core/entities/CardapioItemEntity';

describe('ItemCardapio Entity', () => {
  it('should allow creation without description', () => {
    const item = new ItemCardapio('1', 'Suco', 5.5);
    expect(item.getId()).toBe('1');
    expect(item.getNome()).toBe('Suco');
    expect(item.getPreco()).toBe(5.5);
    expect(item.getDescricao()).toBeUndefined();
  });

  it('should throw when price is negative', () => {
    expect(() => new ItemCardapio('2', 'Sanduíche', -1)).toThrow('Preço inválido');
  });

  it('should update price and check negative values', () => {
    const item = new ItemCardapio('3', 'Pastel', 4);
    expect(() => item.alterarPreco(-1)).toThrow('Preço não pode ser negativo');
    item.alterarPreco(6);
    expect(item.getPreco()).toBe(6);
  });

  it('should toggle availability', () => {
    const item = new ItemCardapio('4', 'Coxinha', 3);
    expect(item.estaDisponivel()).toBe(true);
    item.desativar();
    expect(item.estaDisponivel()).toBe(false);
    item.ativar();
    expect(item.estaDisponivel()).toBe(true);
  });
});
