import { Atributo } from "./atributo.model";

export class Producaopcp {
    id?: number;
    maquina?: number;
    atributo = new Atributo();
    quantidade?: number;
    ordem?: number;
    status?: string;
}