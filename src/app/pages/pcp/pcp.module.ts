import { NgModule } from "@angular/core";
import { PcpControleComponent } from "./controle/controle.component";
import { PcpMaquinasComponent } from "./maquinas/maquinas.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { PcpRouting } from "./pcp.routing";
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ConfirmPopupModule } from 'primeng/confirmpopup';



@NgModule({
declarations: [
    PcpControleComponent,
    PcpMaquinasComponent
],
imports: [
    PrimeNgModule,
    SharedModule,
    PcpRouting,
    NgxMaskDirective,
    NgxMaskPipe,
    ConfirmPopupModule,
]
})

export class PcpModule {}