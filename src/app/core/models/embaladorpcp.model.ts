import { Colaborador } from "./colaborador.model";
import { Maquina } from "./maquina.model";

export class EmbaladorPcp{
    id: number;
    maquina = new Maquina();
    produto: string;
    status: string;
    embalador = new Colaborador();
    nome_embalador: string;
    setor: string;



}