import { describe, it, expect } from 'bun:test';
import { BairroVO } from '@/core/value-objects/BairroVO';

describe('BairroVO', () => {
  it('deve criar um BairroVO válido com nome formatado corretamente', () => {
    const bairro = new BairroVO('Jardim São João');
    expect(bairro.value).toBe('JARDIM SAO JOAO');
  });

  it('deve remover acentos e padronizar em caixa alta', () => {
    const bairro = new BairroVO('vila olímpia');
    expect(bairro.value).toBe('VILA OLIMPIA');
  });

  it('deve lançar erro se o nome for vazio', () => {
    expect(() => new BairroVO('')).toThrow('Nome do bairro é obrigatório e deve ter pelo menos 2 letras.');
  });

  it('deve lançar erro se o nome tiver menos de 2 letras', () => {
    expect(() => new BairroVO('A')).toThrow('Nome do bairro é obrigatório e deve ter pelo menos 2 letras.');
  });

  it('deve considerar iguais dois bairros com mesmo nome (independente de acento e caixa)', () => {
    const a = new BairroVO('Vila Olímpia');
    const b = new BairroVO('vila olimpia');
    expect(a.equals(b)).toBe(true);
  });

  it('deve considerar diferentes bairros com nomes distintos', () => {
    const a = new BairroVO('Moema');
    const b = new BairroVO('Itaim Bibi');
    expect(a.equals(b)).toBe(false);
  });

  it('toString deve retornar o nome do bairro formatado', () => {
    const bairro = new BairroVO('Santa Cecília');
    expect(bairro.toString()).toBe('SANTA CECILIA');
  });
});
