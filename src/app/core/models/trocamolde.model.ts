import { Maquina } from "./maquina.model";
import { Molde } from "./Molde.model";

export class TrocaMoldePcp {
    id?: number;
    injetora = new Maquina();
    molde_maquina = new Molde();
    proximo_molde = new Molde();
    status_molde?:string;
    status_troca?: string;
    data_prevista?: Date;
    data_realizada?: Date;
    observacoes?: string;
}