import { NgModule } from "@angular/core";
import { ColaboradorCadastroComponent } from "./colaborador-cadastro/colaborador-cadastro.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ColaboradorRouting } from "./colaborador.routing";
import { ColaboradorListarComponent } from "./colaborador-listar/colaborador-listar.component";

@NgModule({
    declarations: [
        ColaboradorListarComponent,
        ColaboradorCadastroComponent
    ],
    imports: [
        PrimeNgModule,
        SharedModule,
        ColaboradorRouting
    ],
    exports: [

    ]
})

export class ColaboradorModule { }