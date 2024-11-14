import { Produto } from "./produto.model";

export class Molde {
    id?: number;
    fabricante?: string;
    nome?: string;
    sku?: string;
    cavidades?: number;
    ciclo?: number;
    pesogalho?: number;
    produto? = new Produto();
    datagravacao?: Date;
    usuariogravacao?: string;
    status?: boolean ;

}