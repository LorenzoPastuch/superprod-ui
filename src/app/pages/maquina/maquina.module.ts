import { NgModule } from "@angular/core";
import { PrimeNgModule } from "src/app/primeng.module";
import { MaquinaCadastroComponent } from "./maquina-cadastro/maquina-cadastro.component";
import { MaquinaListaComponent } from "./maquina-lista/maquina-lista.component";
import { MaquinaRouting } from "./maquina.routing";
import { SharedModule } from "src/app/shared/shared.module";





@NgModule({
    declarations:[
        MaquinaCadastroComponent,
        MaquinaListaComponent
    ],
    imports:[
        PrimeNgModule,
        MaquinaRouting,
        SharedModule
    ]
})


export class MaquinaModule {}