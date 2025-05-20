import { describe, it, expect } from 'bun:test';
import { CidadeVO } from '@/core/value-objects/CidadeVO';

describe('CidadeVO', () => {
  it('deve criar CidadeVO válida e formatar corretamente', () => {
    const cidade = new CidadeVO('São Paulo');
    expect(cidade.value).toBe('SAO PAULO');
  });

  it('deve remover acentos e colocar em maiúsculas', () => {
    const cidade = new CidadeVO('Belo Horizonte');
    expect(cidade.value).toBe('BELO HORIZONTE');

    const cidade2 = new CidadeVO('João Pessoa');
    expect(cidade2.value).toBe('JOAO PESSOA');

    const cidade3 = new CidadeVO('Curitiba');
    expect(cidade3.value).toBe('CURITIBA');
  });

  it('deve lançar erro se o nome for vazio ou inválido', () => {
    expect(() => new CidadeVO('')).toThrow('Nome da cidade é obrigatório');
    expect(() => new CidadeVO(' ')).toThrow('Nome da cidade é obrigatório');
    expect(() => new CidadeVO('A')).toThrow('Nome da cidade é obrigatório');
  });

  it('deve considerar iguais cidades com nomes iguais (normalizados)', () => {
    const a = new CidadeVO('são paulo');
    const b = new CidadeVO('SÃO PAULO');

    expect(a.equals(b)).toBe(true);
  });

  it('deve considerar diferentes cidades com nomes distintos', () => {
    const a = new CidadeVO('São Paulo');
    const b = new CidadeVO('Rio de Janeiro');

    expect(a.equals(b)).toBe(false);
  });

  it('toString deve retornar o valor formatado', () => {
    const cidade = new CidadeVO('Campinas');
    expect(cidade.toString()).toBe('CAMPINAS');
  });
});
