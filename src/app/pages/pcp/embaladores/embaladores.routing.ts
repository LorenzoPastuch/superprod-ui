import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmbaladoresPcpComponent } from "./embaladores.component";

import { AuthGuard } from "../../seguranca/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: EmbaladoresPcpComponent,
        canActivate: [AuthGuard],
        data: {roles: ['view_embaladorespcp']}
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})


export class PcpRouting {}