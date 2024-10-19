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
        data: {roles: ['R_PROD']}
    },
    {
        path: 'novo',
        component: ProdutoCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['C_PROD']}
    },
    {
        path: ':id',
        component: ProdutoCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['U_PROD']}
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class ProdutoRouting {}