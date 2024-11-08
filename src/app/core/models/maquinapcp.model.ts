import { Produto } from "./produto.model";
import { Maquina } from "./maquina.model"

export class Maquinapcp {
    id?: number;
    maquina= new Maquina();
    produto = new Produto();
    status?: string;
    prioridade?: string;
    
}