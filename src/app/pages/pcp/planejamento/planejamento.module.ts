import { NgModule } from "@angular/core";
import { PcpControleComponent } from "./controle/controle.component";
import { PcpInjetorasComponent } from "./injetoras/injetoras.component";
import { PcpSoldasComponent } from "./soldas/soldas.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { PcpRouting } from "./planejamento.routing";
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
declarations: [
    PcpControleComponent,
    PcpInjetorasComponent,
    PcpSoldasComponent
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