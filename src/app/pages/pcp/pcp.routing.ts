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
        data: {roles: ['view_producaopcp']}
    },
    {   
        path: ':id',
        component: PcpMaquinasComponent,
        canActivate: [AuthGuard],
        data: {roles: ['add_user']}
    },
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})


export class PcpRouting {}