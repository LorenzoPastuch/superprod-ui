import { Atributo } from "./atributo.model";
import { Colaborador } from "./colaborador.model";
import { Maquina } from "./maquina.model";
import { Produto } from "./produto.model";

export class Producao {
    id?: number;
    obs?: string;
    dataprevisao?: Date;
    quantidade?: number;
    cor?: string;
    perda?: number;
    motivoperda?: string;
    tempomaquina?: number;
    dataproducao?: Date;
    horainicio?: string;
    horafinal?: string;
    lote?: string;
    status?: boolean;
    maquina = new Maquina();
    produto = new Produto();
    colaborador = new Colaborador();
    atributo = new Atributo();
    loginusuario: string;
    datagravacao: Date;
}