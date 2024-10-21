import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuarioCadastroComponent } from "./usuario-cadastro/usuario-cadastro/usuario-cadastro.component";
import { UsuarioListaComponent } from "./usuario-lista/usuario-lista/usuario-lista.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: UsuarioListaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['view_user'] }
    },
    {
        path: 'novo',
        component: UsuarioCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['add_user'] }
    },
    {
        path: ':id',
        component: UsuarioCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['change_user'] }
    },
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})


export class UsuarioRouting { }