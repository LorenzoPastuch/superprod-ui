import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutoListaComponent } from "./produto-lista/produto-lista.component";
import { ProdutoCadastroComponent } from "./produto-cadastro/produto-cadastro.component";
import { AuthGuard } from "../../seguranca/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: ProdutoListaComponent,
        canActivate: [AuthGuard],
        data: {roles: ['view_produto']}
    },
    {
        path: 'novo',
        component: ProdutoCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['add_produto']}
    },
    {
        path: ':id',
        component: ProdutoCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['change_produto']}
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class ProdutoRouting {}