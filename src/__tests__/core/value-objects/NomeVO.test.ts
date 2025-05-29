import { describe, it, expect } from 'bun:test';
import NomeVO from '@/core/value-objects/NomeVO';

describe('NomeVO', () => {
  it('deve criar um NomeVO válido com nome e sobrenome capitalizados', () => {
    const nome = new NomeVO('carlos', 'oliveira');
    expect(nome.nome).toBe('Carlos');
    expect(nome.sobrenome).toBe('Oliveira');
    expect(nome.completo).toBe('Carlos Oliveira');
    expect(nome.toString()).toBe('Carlos Oliveira');
  });

  it('deve remover espaços extras e formatar corretamente', () => {
    const nome = new NomeVO('  maria ', '   silva  ');
    expect(nome.nome).toBe('Maria');
    expect(nome.sobrenome).toBe('Silva');
    expect(nome.completo).toBe('Maria Silva');
  });

  it('deve lançar erro se nome ou sobrenome forem vazios', () => {
    expect(() => new NomeVO('', 'Silva')).toThrow('Nome e sobrenome são obrigatórios.');
    expect(() => new NomeVO('Carlos', '')).toThrow('Nome e sobrenome são obrigatórios.');
    expect(() => new NomeVO(' ', ' ')).toThrow('Nome e sobrenome são obrigatórios.');
  });

  it('deve comparar corretamente dois objetos iguais com equals()', () => {
    const nome1 = new NomeVO('Ana', 'Souza');
    const nome2 = new NomeVO('ana', 'souza');
    expect(nome1.equals(nome2)).toBe(true);
  });

  it('deve retornar false para objetos diferentes em nome ou sobrenome', () => {
    const nome1 = new NomeVO('Ana', 'Souza');
    const nome2 = new NomeVO('Ana', 'Lima');
    const nome3 = new NomeVO('Joana', 'Souza');

    expect(nome1.equals(nome2)).toBe(false);
    expect(nome1.equals(nome3)).toBe(false);
  });

  it('deve tratar corretamente nomes compostos e acentuados', () => {
    const nome = new NomeVO('joão paulo', 'da silva');
    expect(nome.completo).toBe('João Paulo Da Silva');
  });
});
