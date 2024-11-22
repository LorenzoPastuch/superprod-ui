import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TrocaMoldePcpComponent } from "../trocamolde/trocamolde.component";

import { AuthGuard } from "../../seguranca/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: TrocaMoldePcpComponent,
        canActivate: [AuthGuard],
        data: {roles: ['view_trocamoldepcp']}
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})


export class PcpRouting {}