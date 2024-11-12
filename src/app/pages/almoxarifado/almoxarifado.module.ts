import { NgModule } from "@angular/core";
import { AlmoxarifadoMovimentacaoComponent } from "./movimentacao/movimentacao.component";
import { AlmoxarifadoRegistroComponent } from "./registro/registro.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AlmoxarifadoRouting } from "./almoxarifado.routing";
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



@NgModule({
declarations: [
    AlmoxarifadoMovimentacaoComponent,
    AlmoxarifadoRegistroComponent
],
imports: [
    PrimeNgModule,
    SharedModule,
    AlmoxarifadoRouting,
    NgxMaskDirective,
    NgxMaskPipe
]
})

export class AlmoxarifadoModule {}