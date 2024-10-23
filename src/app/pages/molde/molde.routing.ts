import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { MoldeCadastroComponent } from "./molde-cadastro/molde-cadastro.component";
import { MoldeListaComponent } from "./molde-lista/molde-lista/molde-lista.component";
import { AuthGuard } from "../seguranca/auth.guard";


const routes: Routes = [

    {
        path: '',
        component: MoldeListaComponent,
        canActivate: [AuthGuard],
        data: {roles: ['view_molde']}
    },
    {
        path: 'novo',
        component: MoldeCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['add_molde']}
    },
    {
        path: ':id',
        component: MoldeCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['change_molde']}
    },

]



@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class MoldeRouting {}