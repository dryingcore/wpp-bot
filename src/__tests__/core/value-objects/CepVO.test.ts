import { describe, it, expect } from 'bun:test';
import { CepVO } from '@/core/value-objects/CepVO';

describe('CepVO', () => {
  it('deve criar um CepVO válido', () => {
    const cep = new CepVO('01001-000');
    expect(cep.valor).toBe('01001-000');
  });

  it('deve lançar erro se o CEP não tiver 8 dígitos numéricos', () => {
    expect(() => new CepVO('1234')).toThrow('CEP inválido: deve conter exatamente 8 dígitos numéricos.');
    expect(() => new CepVO('abcdefgh')).toThrow();
    expect(() => new CepVO('123456789')).toThrow();
  });

  it('deve extrair corretamente região, subregião, setor e sufixo', () => {
    const cep = new CepVO('12345-678');
    expect(cep.regiao).toBe(1);
    expect(cep.subRegiao).toBe(2);
    expect(cep.setor).toBe(3);
    expect(cep.subsetor).toBe(4);
    expect(cep.divisorSubsetor).toBe(5);
    expect(cep.sufixo).toBe(678);
  });

  it('deve identificar tipo de distribuição corretamente', () => {
    const comum = new CepVO('12345600');
    const especial = new CepVO('12345900');
    const promocional = new CepVO('12345960');
    const unidade = new CepVO('12345970');
    const comunitaria = new CepVO('12345995');

    expect(comum.tipoDistribuicao).toBe('Logradouro comum');
    expect(especial.tipoDistribuicao).toBe('Código Especial');
    expect(promocional.tipoDistribuicao).toBe('CEP Promocional');
    expect(unidade.tipoDistribuicao).toBe('Unidade dos Correios');
    expect(comunitaria.tipoDistribuicao).toBe('Caixa Postal Comunitária');
  });

  it('deve identificar corretamente a região postal', () => {
    const cep = new CepVO('01234567');
    expect(cep.regiaoPostal).toBe('Grande São Paulo');

    const outro = new CepVO('91234567');
    expect(outro.regiaoPostal).toBe('RS');
  });

  it('deve identificar se pertence ao estado', () => {
    const cep = new CepVO('01234567');
    expect(cep.pertenceAoEstado('SP')).toBe(true);
    expect(cep.pertenceAoEstado('RJ')).toBe(false);
  });

  it('deve comparar igualdade entre dois CEPs corretamente', () => {
    const a = new CepVO('12345678');
    const b = new CepVO('12345-678');
    const c = new CepVO('87654321');

    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });

  it('deve serializar corretamente para JSON', () => {
    const cep = new CepVO('12345-678');
    const json = cep.toJSON();

    expect(json).toEqual({
      valor: '12345-678',
      regiao: 1,
      regiaoPostal: 'Interior de SP',
      subRegiao: 2,
      setor: 3,
      subsetor: 4,
      divisorSubsetor: 5,
      sufixo: 678,
      tipoDistribuicao: 'Logradouro comum',
    });
  });

  it('toString deve retornar o formato com hífen', () => {
    const cep = new CepVO('45678000');
    expect(cep.toString()).toBe('45678-000');
  });
});
