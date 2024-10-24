import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarAtributoComponent } from "./listar-atributo/listar-atributo.component";
import { CadastroAtributoComponent } from "./cadastro-atributo/cadastro-atributo.component";
import { AuthGuard } from "../../seguranca/auth.guard";


const routes: Routes = [
    {
        path: '',
        component: ListarAtributoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['view_atributo']}
    },
    {
        path: 'novo',
        component: CadastroAtributoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['add_atributo']}
    },
    {
        path: ':id',
        component: CadastroAtributoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['change_atributo']}
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})


export class AtributoRouting { }