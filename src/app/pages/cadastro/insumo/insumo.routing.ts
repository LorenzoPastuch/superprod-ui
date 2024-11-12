import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InsumoListaComponent } from "./insumo-lista/insumo-lista.component";
import { InsumoCadastroComponent } from "./insumo-cadastro/insumo-cadastro.component";
import { AuthGuard } from "../../seguranca/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: InsumoListaComponent,
        canActivate: [AuthGuard],
        data: {roles: ['view_insumo']}
    },
    {
        path: 'novo',
        component: InsumoCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['add_insumo']}
    },
    {
        path: ':id',
        component: InsumoCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['change_insumo']}
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class InsumoRouting {}