import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ColaboradorCadastroComponent } from "./colaborador-cadastro/colaborador-cadastro.component";
import { ColaboradorListarComponent } from "./colaborador-listar/colaborador-listar.component";
import { AuthGuard } from "../../seguranca/auth.guard";

const routes: Routes = [

    {
        path: '',
        component: ColaboradorListarComponent,
        canActivate: [AuthGuard],
        data: { roles: ['view_colaborador']}
    },
    {
        path: 'novo',
        component: ColaboradorCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['add_colaborador']}
    },
    {
        path: ':id',
        component: ColaboradorCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['change_colaborador']}
    },


]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class ColaboradorRouting { }