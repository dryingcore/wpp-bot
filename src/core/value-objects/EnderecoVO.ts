import { CepVO } from './CepVO';
import { RuaVO } from './RuaVO';
import { BairroVO } from './BairroVO';
import { CidadeVO } from './CidadeVO';
import { EstadoVO } from './EstadoVO';

export class EnderecoVO {
  private readonly _cep: CepVO;
  private readonly _rua: RuaVO;
  private readonly _numero: string;
  private readonly _bairro: BairroVO;
  private readonly _cidade: CidadeVO;
  private readonly _estado: EstadoVO;
  private readonly _complemento?: string;

  constructor(params: {
    cep: CepVO;
    rua: RuaVO;
    numero: string;
    bairro: BairroVO;
    cidade: CidadeVO;
    estado: EstadoVO;
    complemento?: string;
  }) {
    const { cep, rua, numero, bairro, cidade, estado, complemento } = params;

    if (!numero || numero.trim().length === 0) {
      throw new Error('Número do endereço é obrigatório.');
    }

    this._cep = cep;
    this._rua = rua;
    this._numero = numero.trim();
    this._bairro = bairro;
    this._cidade = cidade;
    this._estado = estado;
    this._complemento = complemento?.trim();
  }

  get cep(): CepVO {
    return this._cep;
  }

  get rua(): RuaVO {
    return this._rua;
  }

  get numero(): string {
    return this._numero;
  }

  get bairro(): BairroVO {
    return this._bairro;
  }

  get cidade(): CidadeVO {
    return this._cidade;
  }

  get estado(): EstadoVO {
    return this._estado;
  }

  get complemento(): string | undefined {
    return this._complemento;
  }

  public toString(): string {
    const partes = [
      `${this._rua.toString()}, ${this._numero}`,
      this._complemento,
      this._bairro.toString(),
      `${this._cidade.toString()} - ${this._estado.value}`,
      this._cep.valor,
    ];
    return partes.filter(Boolean).join(', ');
  }

  public equals(outro: EnderecoVO): boolean {
    return (
      this._cep.equals(outro.cep) &&
      this._rua.equals(outro.rua) &&
      this._numero === outro.numero &&
      this._bairro.equals(outro.bairro) &&
      this._cidade.equals(outro.cidade) &&
      this._estado.equals(outro.estado) &&
      this._complemento === outro.complemento
    );
  }

  public toJSON(): object {
    return {
      cep: this._cep.valor,
      rua: this._rua.toString(),
      numero: this._numero,
      complemento: this._complemento,
      bairro: this._bairro.toString(),
      cidade: this._cidade.toString(),
      estado: this._estado.value,
    };
  }
}
