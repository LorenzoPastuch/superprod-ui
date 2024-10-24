import { Atributo } from "./atributo.model";
import { Colaborador } from "./colaborador.model";
import { Maquina } from "./maquina.model";
import { Produto } from "./produto.model";

export class Producao {
    id?: number;
    observacao?: string;
    quantidade?: number;
    perda?: number;
    motivoperda?: string;
    ciclo?: number;
    data?: Date;
    horainicial?: string;
    horafinal?: string;
    lote?: string;
    status?: boolean;
    maquina = new Maquina();
    numeromaquina?: number;
    produto = new Produto();
    nomeproduto?: string;
    embalador = new Colaborador();
    operador = new Colaborador();
    atributo = new Atributo();
    nomeatributo?: string;
    loginusuario: string;
    datagravacao: Date;
}