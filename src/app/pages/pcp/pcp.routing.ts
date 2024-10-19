import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PcpControleComponent } from "./controle/controle.component";
import { PcpMaquinasComponent } from "./maquinas/maquinas.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: PcpControleComponent,
        canActivate: [AuthGuard],
        data: {roles: ['R_PRODU']}
    },
    {   
        path: ':id',
        component: PcpMaquinasComponent,
        canActivate: [AuthGuard],
        data: {roles: ['U_PRODU']}
    },
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})


export class PcpRouting {}