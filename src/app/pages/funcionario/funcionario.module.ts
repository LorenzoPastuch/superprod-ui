import { NgModule } from "@angular/core";
import { FuncionarioCadastroComponent } from "./funcionario-cadastro/funcionario-cadastro.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { FuncionarioRouting } from "./funcionario.routing";
import { FuncionarioListarComponent } from "./funcionario-listar/funcionario-listar.component";

@NgModule({
    declarations: [
        FuncionarioListarComponent,
        FuncionarioCadastroComponent
    ],
    imports: [
        PrimeNgModule,
        SharedModule,
        FuncionarioRouting
    ],
    exports: [

    ]
})

export class FuncionarioModule { }