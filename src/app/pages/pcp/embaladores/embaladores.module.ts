import { NgModule } from "@angular/core";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { PcpRouting } from "./embaladores.routing";
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { EmbaladoresPcpComponent } from "./embaladores.component";



@NgModule({
declarations: [
    EmbaladoresPcpComponent,
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