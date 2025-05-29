import { describe, it, expect } from 'bun:test';
import { EstadoVO } from '@/core/value-objects/EstadoVO';

describe('EstadoVO', () => {
  it('deve criar EstadoVO válido', () => {
    const estado = new EstadoVO('SP');
    expect(estado.value).toBe('SP');
  });

  it('deve lançar erro para siglas inválidas', () => {
    const invalidStates = ['XX', '123', '', 'ol'];

    for (const uf of invalidStates) {
      expect(() => new EstadoVO(uf)).toThrow(`Sigla de estado inválida: ${uf}`);
    }
  });

  it('deve considerar iguais dois objetos com mesma sigla', () => {
    const a = new EstadoVO('SC');
    const b = new EstadoVO('SC');

    expect(a.equals(b)).toBe(true);
  });

  it('deve considerar diferentes objetos com siglas distintas', () => {
    const a = new EstadoVO('SC');
    const b = new EstadoVO('RJ');

    expect(a.equals(b)).toBe(false);
  });

  it('deve retornar a sigla no toString', () => {
    const estado = new EstadoVO('MG');
    expect(estado.toString()).toBe('MG');
  });

  it('deve aceitar siglas válidas porém em letras minúsculas (case insensitive)', () => {
    const siglasEmMinusculo: string[] = ['sp', 'sc', 'ma', 'ba', 'mg', 'rj'];
    siglasEmMinusculo.forEach(sigla => {
      const estado = new EstadoVO(sigla);
      expect(estado.toString()).toBe(sigla.toUpperCase());
    });
  });
});
