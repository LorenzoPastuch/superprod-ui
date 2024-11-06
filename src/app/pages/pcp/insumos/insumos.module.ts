import { NgModule } from "@angular/core";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { PcpRouting } from "./insumos.routing";
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PcpInsumosComponent } from "./insumos.component";



@NgModule({
declarations: [
    PcpInsumosComponent,
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