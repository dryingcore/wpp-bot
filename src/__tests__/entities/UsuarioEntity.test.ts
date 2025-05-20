import { describe, it, expect } from 'bun:test';
import { Usuario } from '@/core/entities/UsuarioEntity';
import NomeVO from '@/core/value-objects/NomeVO';
import { EnderecoVO } from '@/core/value-objects/EnderecoVO';
import { CepVO } from '@/core/value-objects/CepVO';
import { CidadeVO } from '@/core/value-objects/CidadeVO';
import { EstadoVO } from '@/core/value-objects/EstadoVO';
import { RuaVO } from '@/core/value-objects/RuaVO';
import { BairroVO } from '@/core/value-objects/BairroVO';

function criarEnderecoPersonalizado(rua: string, cep: string, cidade: string, estado: string): EnderecoVO {
  return new EnderecoVO({
    rua: new RuaVO(rua),
    cep: new CepVO(cep),
    numero: '123',
    bairro: new BairroVO('Centro'),
    cidade: new CidadeVO(cidade),
    estado: new EstadoVO(estado),
  });
}

describe('Usuario Entity', () => {
  it('deve criar um usuário válido com VOs', () => {
    const nome = new NomeVO('João', 'Silva');
    const endereco = criarEnderecoPersonalizado('Rua das Laranjeiras', '12345678', 'São Paulo', 'SP');
    const usuario = new Usuario('id-1', nome, endereco);

    expect(usuario.id).toBe('id-1');
    expect(usuario.nome.toString()).toBe('João Silva');
    expect(usuario.endereco.toString()).toContain('RUA DAS LARANJEIRAS, 123, CENTRO, SAO PAULO - SP, 12345-678');
  });

  it('deve atualizar o nome do usuário se for diferente', () => {
    const nomeInicial = new NomeVO('Ana', 'Souza');
    const novoNome = new NomeVO('Ana', 'Moura');
    const endereco = criarEnderecoPersonalizado('Rua A', '11111111', 'Rio de Janeiro', 'RJ');

    const usuario = new Usuario('id-2', nomeInicial, endereco);
    usuario.atualizarNome(novoNome);

    expect(usuario.nome.toString()).toBe('Ana Moura');
  });

  it('não deve atualizar o nome se for igual ao atual', () => {
    const nome = new NomeVO('Carlos', 'Oliveira');
    const endereco = criarEnderecoPersonalizado('Rua B', '22222222', 'Curitiba', 'PR');

    const usuario = new Usuario('id-3', nome, endereco);
    usuario.atualizarNome(new NomeVO('Carlos', 'Oliveira'));

    expect(usuario.nome.toString()).toBe('Carlos Oliveira'); // Sem erro, sem alteração visível
  });

  it('deve atualizar o endereço do usuário se for diferente', () => {
    const nome = new NomeVO('Lucas', 'Pinto');
    const enderecoAntigo = criarEnderecoPersonalizado('Rua C', '33333333', 'Belo Horizonte', 'MG');
    const novoEndereco = criarEnderecoPersonalizado('Rua Nova', '44444444', 'Vitória', 'ES');

    const usuario = new Usuario('id-4', nome, enderecoAntigo);
    usuario.atualizarEndereco(novoEndereco);

    expect(usuario.endereco.toString()).toContain('RUA NOVA, 123, CENTRO, VITORIA - ES, 44444-444');
  });

  it('não deve atualizar o endereço se for igual', () => {
    const nome = new NomeVO('Juliana', 'Ferreira');
    const endereco = criarEnderecoPersonalizado('Rua D', '55555555', 'Fortaleza', 'CE');

    const usuario = new Usuario('id-5', nome, endereco);
    usuario.atualizarEndereco(criarEnderecoPersonalizado('Rua D', '55555555', 'Fortaleza', 'CE'));

    expect(usuario.endereco.toString()).toContain('RUA D, 123, CENTRO, FORTALEZA - CE, 55555-555');
  });

  it('deve considerar dois usuários com mesmo ID como iguais', () => {
    const nome1 = new NomeVO('Pedro', 'Lima');
    const nome2 = new NomeVO('Pedro', 'Santos');
    const endereco = criarEnderecoPersonalizado('Rua E', '66666666', 'Recife', 'PE');

    const u1 = new Usuario('uuid-123', nome1, endereco);
    const u2 = new Usuario('uuid-123', nome2, endereco);

    expect(u1.equals(u2)).toBe(true);
  });

  it('deve considerar dois usuários com IDs diferentes como diferentes', () => {
    const nome = new NomeVO('Roberta', 'Costa');
    const endereco = criarEnderecoPersonalizado('Rua F', '77777777', 'Salvador', 'BA');

    const u1 = new Usuario('uuid-1', nome, endereco);
    const u2 = new Usuario('uuid-2', nome, endereco);

    expect(u1.equals(u2)).toBe(false);
  });
});
