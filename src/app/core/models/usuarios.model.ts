import { Empresas } from "./empresas.model";
import { Permissoes } from "./permissoes.model";

export class Usuarios {

    id: number;
    first_name: string;
    last_name: string;
    nome?: string;
    username: string;
    password: string;
    cpassword: string;
    status: boolean;
    empresaativa: number;
    empresapadrao: boolean;
    empresas = new Array<Empresas>();
    permissoes = new Array<Permissoes>();

}