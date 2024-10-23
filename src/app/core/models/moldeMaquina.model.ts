export class MoldeMaquina {
    id?: number;
    nome?: string;
    
    constructor(molde?: number,
        nome?: string) {
            this.id = molde;
            this.nome = nome;
        }
}