import { NgModule } from "@angular/core";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardRouting } from "./Dashboard.routing";
import { PrincipalComponent } from "./principal/principal.component";



@NgModule({
declarations: [
    PrincipalComponent
],
imports: [
    PrimeNgModule,
    SharedModule,
    DashboardRouting
]
})

export class DashboardModule {}