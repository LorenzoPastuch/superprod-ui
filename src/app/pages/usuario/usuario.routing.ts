import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuarioCadastroComponent } from "./usuario-cadastro/usuario-cadastro/usuario-cadastro.component";
import { UsuarioListaComponent } from "./usuario-lista/usuario-lista/usuario-lista.component";
import { AuthGuard } from "../seguranca/auth.guard";
import { AlterarSenhaComponent } from "./alterar-senha/alterar-senha.component";

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
      path: ':id/senha', component: AlterarSenhaComponent,
      canActivate: [AuthGuard],
      data: {roles: ['change_user']}
    
    },
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})


export class UsuarioRouting { }