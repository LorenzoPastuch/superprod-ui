import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlmoxarifadoRegistroComponent } from "./registro/registro.component";
import { AlmoxarifadoMovimentacaoComponent } from "./movimentacao/movimentacao.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [
    {
        path: 'registro',
        component: AlmoxarifadoRegistroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['view_registroalmoxarifado']}
    },
    {
        path: 'movimentacao',
        component: AlmoxarifadoMovimentacaoComponent,
        canActivate: [AuthGuard],
        data: {roles: ['add_registroalmoxarifado']}
    },
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})


export class AlmoxarifadoRouting {}