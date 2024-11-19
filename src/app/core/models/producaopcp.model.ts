import { Atributo } from "./atributo.model";

export class Producaopcp {
    id?: number;
    maquina?: number;
    produto: string;
    atributo = new Atributo();
    arte?: string;
    caixas?: number;
    unidades?: number;
    kilogramas?: number;
    ordem?: number;
    horainicial?: Date;
    horafinal?: Date;
    qnt_produzida?: number;
    falta?: number;
    saida?: Date;
    pedido?: number;
    status?: string;
}