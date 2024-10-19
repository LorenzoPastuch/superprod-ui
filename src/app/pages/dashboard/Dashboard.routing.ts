import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Dashboards } from "src/app/core/models/dashboards.model";
import { PrincipalComponent } from "./principal/principal.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [
    {
        path:'dashboard',
        component: PrincipalComponent,
        canActivate: [AuthGuard]
    }
]


@NgModule({
imports: [
    RouterModule.forChild(routes)
],
exports: [ RouterModule ]

})


export class DashboardRouting {}