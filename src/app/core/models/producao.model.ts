import { Atributo } from "./atributo.model";
import { Funcionario } from "./funcionario.model";
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
    funcionario = new Funcionario();
    atributo = new Atributo();
    loginusuario: string;
    datagravacao: Date;
}