import { Molde } from './Molde.model';
import { MoldeMaquina } from './moldeMaquina.model';
export class Maquina {
    id?: number;
    idficha: number;
    nome?: string;
    peso?: string;
    numero?: number;
    datagravacao?: Date;
    usuariologin?: string;
    status?: boolean;
    moldes = new Array<Molde>();
}