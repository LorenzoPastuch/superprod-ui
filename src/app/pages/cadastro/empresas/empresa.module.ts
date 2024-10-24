import { NgModule } from "@angular/core";
import { EmpresaCadastroComponent } from "./empresa-cadastro/empresa-cadastro.component";
import { EmpresaListaComponent } from "./empresa-lista/empresa-lista/empresa-lista.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { EmpresaRouting } from "./empresa.routing";
import { SharedModule } from "src/app/shared/shared.module";





@NgModule({
declarations: [
    EmpresaCadastroComponent,
    EmpresaListaComponent
],
imports: [
    PrimeNgModule,
    EmpresaRouting,
    SharedModule
]
})


export class EmpresaModule {}