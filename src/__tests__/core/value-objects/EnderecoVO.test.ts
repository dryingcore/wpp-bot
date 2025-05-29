import { describe, it, expect } from 'bun:test';
import { EnderecoVO } from '@/core/value-objects/EnderecoVO';
import { CepVO } from '@/core/value-objects/CepVO';
import { RuaVO } from '@/core/value-objects/RuaVO';
import { BairroVO } from '@/core/value-objects/BairroVO';
import { CidadeVO } from '@/core/value-objects/CidadeVO';
import { EstadoVO } from '@/core/value-objects/EstadoVO';

describe('EnderecoVO', () => {
  const enderecoBase = () =>
    new EnderecoVO({
      cep: new CepVO('01001-000'),
      rua: new RuaVO('São Bento'),
      numero: '123',
      bairro: new BairroVO('Sé'),
      cidade: new CidadeVO('São Paulo'),
      estado: new EstadoVO('SP'),
      complemento: 'Ap 42',
    });

  it('deve criar um EnderecoVO válido', () => {
    const endereco = enderecoBase();

    expect(endereco.cep.valor).toBe('01001-000');
    expect(endereco.rua.value).toBe('SAO BENTO');
    expect(endereco.numero).toBe('123');
    expect(endereco.bairro.value).toBe('SE');
    expect(endereco.cidade.value).toBe('SAO PAULO');
    expect(endereco.estado.value).toBe('SP');
    expect(endereco.complemento).toBe('Ap 42');
  });

  it('deve lançar erro se o número estiver vazio', () => {
    expect(
      () =>
        new EnderecoVO({
          cep: new CepVO('12345678'),
          rua: new RuaVO('Paulista'),
          numero: '',
          bairro: new BairroVO('Bela Vista'),
          cidade: new CidadeVO('São Paulo'),
          estado: new EstadoVO('SP'),
        }),
    ).toThrow('Número do endereço é obrigatório.');
  });

  it('deve retornar uma representação textual correta com toString', () => {
    const endereco = enderecoBase();

    expect(endereco.toString()).toBe('SAO BENTO, 123, Ap 42, SE, SAO PAULO - SP, 01001-000');
  });

  it('deve retornar corretamente o JSON', () => {
    const endereco = enderecoBase();
    expect(endereco.toJSON()).toEqual({
      cep: '01001-000',
      rua: 'SAO BENTO',
      numero: '123',
      complemento: 'Ap 42',
      bairro: 'SE',
      cidade: 'SAO PAULO',
      estado: 'SP',
    });
  });

  it('deve considerar iguais dois endereços idênticos', () => {
    const a = enderecoBase();
    const b = enderecoBase();
    expect(a.equals(b)).toBe(true);
  });

  it('deve considerar diferentes endereços com número distinto', () => {
    const a = enderecoBase();
    const b = new EnderecoVO({
      cep: a.cep,
      rua: a.rua,
      numero: '999',
      bairro: a.bairro,
      cidade: a.cidade,
      estado: a.estado,
      complemento: a.complemento,
    });
    expect(a.equals(b)).toBe(false);
  });

  it('deve considerar diferentes endereços com cep diferente', () => {
    const a = enderecoBase();
    const b = new EnderecoVO({
      cep: new CepVO('12345678'),
      rua: a.rua,
      numero: a.numero,
      bairro: a.bairro,
      cidade: a.cidade,
      estado: a.estado,
      complemento: a.complemento,
    });
    expect(a.equals(b)).toBe(false);
  });

  it('deve lidar corretamente com endereço sem complemento', () => {
    const endereco = new EnderecoVO({
      cep: new CepVO('04045-000'),
      rua: new RuaVO('Ibirapuera'),
      numero: '777',
      bairro: new BairroVO('Moema'),
      cidade: new CidadeVO('São Paulo'),
      estado: new EstadoVO('SP'),
    });

    expect(endereco.complemento).toBeUndefined();
    expect(endereco.toString()).toBe('IBIRAPUERA, 777, MOEMA, SAO PAULO - SP, 04045-000');
    expect(endereco.toJSON()).toEqual({
      cep: '04045-000',
      rua: 'IBIRAPUERA',
      numero: '777',
      bairro: 'MOEMA',
      cidade: 'SAO PAULO',
      estado: 'SP',
      complemento: undefined,
    });
  });
});
