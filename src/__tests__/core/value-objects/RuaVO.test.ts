import { describe, it, expect } from 'bun:test';
import { RuaVO } from '@/core/value-objects/RuaVO';

describe('RuaVO', () => {
  it('deve criar uma RuaVO válida com nome formatado corretamente', () => {
    const rua = new RuaVO('Rua Doutor João Ribeiro');
    expect(rua.value).toBe('RUA DOUTOR JOAO RIBEIRO');
  });

  it('deve remover acentos e padronizar para maiúsculas', () => {
    const rua = new RuaVO('avenida são joão');
    expect(rua.value).toBe('AVENIDA SAO JOAO');
  });

  it('deve lançar erro se o logradouro for vazio', () => {
    expect(() => new RuaVO('')).toThrow('Nome da rua é obrigatório e deve ter pelo menos 3 letras.');
  });

  it('deve lançar erro se o nome tiver menos de 3 letras', () => {
    expect(() => new RuaVO('R')).toThrow('Nome da rua é obrigatório e deve ter pelo menos 3 letras.');
  });

  it('deve considerar iguais duas ruas com o mesmo nome (independente de acento e caixa)', () => {
    const a = new RuaVO('Rua São Jorge');
    const b = new RuaVO('rua sao jorge');
    expect(a.equals(b)).toBe(true);
  });

  it('deve considerar diferentes ruas com nomes distintos', () => {
    const a = new RuaVO('Rua das Flores');
    const b = new RuaVO('Rua das Palmeiras');
    expect(a.equals(b)).toBe(false);
  });

  it('toString deve retornar o nome da rua formatado', () => {
    const rua = new RuaVO('Rua Santa Cecília');
    expect(rua.toString()).toBe('RUA SANTA CECILIA');
  });
});
