import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoListaComponent } from "./produto-lista/produto-lista.component";
import { ProdutoCadastroComponent } from "./produto-cadastro/produto-cadastro.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: ProdutoListaComponent,
        canActivate: [AuthGuard],
        data: {roles: ['view_producao']}
    },
    {
        path: 'novo',
        component: ProdutoCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['add_producao']}
    },
    {
        path: ':id',
        component: ProdutoCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['change_producao']}
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class ProdutoRouting {}