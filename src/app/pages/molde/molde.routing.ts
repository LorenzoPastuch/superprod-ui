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
        data: {roles: ['R_MOL']}
    },
    {
        path: 'novo',
        component: MoldeCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['C_MOL']}
    },
    {
        path: ':id',
        component: MoldeCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['U_MOL']}
    },

]



@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class MoldeRouting {}