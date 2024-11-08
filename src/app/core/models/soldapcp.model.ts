import { Atributo } from "./atributo.model";

export class Soldapcp {
    id?: number;
    maquina?: number;
    produto: string;
    cor_1 = new Atributo();
    cor_2 = new Atributo();
    caixas?: number;
    quantidade?: number;
    ordem?: number;
    horainicial?: Date;
    horafinal?: Date;
    qnt_produzida?: number;
    status?: string;
}