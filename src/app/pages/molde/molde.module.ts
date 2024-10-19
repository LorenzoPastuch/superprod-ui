import { NgModule } from "@angular/core";
import { PrimeNgModule } from "src/app/primeng.module";
import { MoldeCadastroComponent } from "./molde-cadastro/molde-cadastro.component";
import { MoldeRouting } from "./molde.routing";
import { MoldeListaComponent } from "./molde-lista/molde-lista/molde-lista.component";
import { SharedModule } from "src/app/shared/shared.module";






@NgModule({
    declarations: [
        MoldeCadastroComponent,
        MoldeListaComponent
    ],
    imports: [
        PrimeNgModule,
        MoldeRouting,
        SharedModule
    ]
})


export class MoldeModule {}