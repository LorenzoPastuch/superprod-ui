import { NgModule } from "@angular/core";
import { ProducaoListaComponent } from "./producao-lista/producao-lista.component";
import { ProducaoCadastroComponent } from "./producao-cadastro/producao-cadastro.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ProducaoRouting } from "./producao.routing";
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



@NgModule({
declarations: [
    ProducaoListaComponent,
    ProducaoCadastroComponent
],
imports: [
    PrimeNgModule,
    SharedModule,
    ProducaoRouting,
    NgxMaskDirective,
    NgxMaskPipe
]
})

export class ProducaoModule {}