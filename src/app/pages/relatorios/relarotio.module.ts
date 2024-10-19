import { NgModule } from "@angular/core";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { PrincipalComponent } from "./principal/principal.component";
import { RelatorioRounting } from "./relatorio.routing";




@NgModule({
declarations: [
    PrincipalComponent
],
imports: [
    PrimeNgModule,
    SharedModule,
    RelatorioRounting
]
})


export class RelatorioModule {}