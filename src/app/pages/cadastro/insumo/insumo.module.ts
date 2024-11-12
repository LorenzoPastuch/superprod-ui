import { NgModule } from "@angular/core";
import { InsumoListaComponent } from "./insumo-lista/insumo-lista.component";
import { InsumoCadastroComponent } from "./insumo-cadastro/insumo-cadastro.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { InsumoRouting } from "./insumo.routing";



@NgModule({
    declarations: [
        InsumoListaComponent,
        InsumoCadastroComponent
    ],
    imports: [
        PrimeNgModule,
        SharedModule,
        InsumoRouting
    ]
})

export class InsumoModule {}