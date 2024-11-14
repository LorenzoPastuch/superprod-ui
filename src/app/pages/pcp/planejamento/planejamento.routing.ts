import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PcpControleComponent } from "./controle/controle.component";
import { PcpInjetorasComponent } from "./injetoras/injetoras.component";
import { PcpSoldasComponent } from "./soldas/soldas.component";

import { AuthGuard } from "../../seguranca/auth.guard";
import { CanudosPcpComponent } from "./canudos/canudos.component";

const routes: Routes = [
    {
        path: '',
        component: PcpControleComponent,
        canActivate: [AuthGuard],
        data: {roles: ['view_producaopcp']}
    },
    {   
        path: ':id',
        component: PcpInjetorasComponent,
        canActivate: [AuthGuard],
        data: {roles: ['view_producaopcp']}
    },
    {   
        path: 'solda/:id',
        component: PcpSoldasComponent,
        canActivate: [AuthGuard],
        data: {roles: ['view_producaopcp']}
    },
    {   
        path: 'canudo/:id',
        component: CanudosPcpComponent,
        canActivate: [AuthGuard],
        data: {roles: ['view_producaopcp']}
    },

]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})


export class PcpRouting {}