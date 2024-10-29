import { Atributo } from "./atributo.model";

export class Producaopcp {
    id?: number;
    maquina?: number;
    produto: string;
    atributo = new Atributo();
    caixas?: number;
    quantidade?: number;
    ordem?: number;
    status?: string;
}