import { EnderecoVO } from '@/core/value-objects/EnderecoVO';
import type NomeVO from '@/core/value-objects/NomeVO';

export class Usuario {
  private readonly _id: string;
  private _nome: NomeVO;
  private _endereco: EnderecoVO;

  constructor(id: string, nome: NomeVO, endereco: EnderecoVO) {
    this._id = id;
    this._nome = nome;
    this._endereco = endereco;
  }

  atualizarEndereco(novoEndereco: EnderecoVO): void {
    if (this._endereco.equals(novoEndereco)) return;
    this._endereco = novoEndereco;
  }

  atualizarNome(novoNome: NomeVO): void {
    if (this._nome.equals(novoNome)) return;
    this._nome = novoNome;
  }

  equals(outro: Usuario): boolean {
    return this._id === outro.id;
  }

  get id(): string {
    return this._id;
  }

  get nome(): NomeVO {
    return this._nome;
  }

  get endereco(): EnderecoVO {
    return this._endereco;
  }
}
