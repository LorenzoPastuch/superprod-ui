import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaquinaCadastroComponent } from "./maquina-cadastro/maquina-cadastro.component";
import { MaquinaListaComponent } from "./maquina-lista/maquina-lista.component";
import { AuthGuard } from "../../seguranca/auth.guard";

const routes: Routes =[
    {
        path: '',
        component: MaquinaListaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['view_maquina'] }

    },
    {
        path: 'novo',
        component: MaquinaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['add_maquina'] }

    },
    {
        path: ':id',
        component: MaquinaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['change_maquina'] }

    },
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
      ],
      exports: [ RouterModule ]
})

export class MaquinaRouting{}