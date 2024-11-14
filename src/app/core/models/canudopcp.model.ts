import { Atributo } from "./atributo.model";

export class Canudopcp {
    id?: number;
    maquina?: number;
    produto: string;
    tamanho: string;
    atributo = new Atributo();
    caixas?: number;
    quantidade?: number;
    ordem?: number;
    horainicial?: Date;
    horafinal?: Date;
    qnt_produzida?: number;
    status?: string;
}