import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PcpInsumosComponent } from "../insumos/insumos.component";

import { AuthGuard } from "../../seguranca/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: PcpInsumosComponent,
        canActivate: [AuthGuard],
        data: {roles: ['view_insumospcp']}
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})


export class PcpRouting {}