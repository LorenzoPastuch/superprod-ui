import { NgModule } from "@angular/core";
import { CadastroAtributoComponent } from "./cadastro-atributo/cadastro-atributo.component";
import { ListarAtributoComponent } from "./listar-atributo/listar-atributo.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AtributoRouting } from "./atributo.routing";


@NgModule({
    declarations: [
        CadastroAtributoComponent,
        ListarAtributoComponent
    ],
    imports: [
        PrimeNgModule,
        SharedModule,
        AtributoRouting

    ]
})

export class AtributoModule { }