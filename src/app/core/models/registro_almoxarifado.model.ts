import { Insumo } from "./insumo.model";

export class RegistroAlmoxarifado {
    id: number;
    insumo = new Insumo()
    quantidade: number;
    datagravacao = new Date;
    usuariogravacao: string;
    tipo_movimentacao: string;
    statuswms: boolean;
}