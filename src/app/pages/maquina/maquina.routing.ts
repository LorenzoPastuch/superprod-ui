import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaquinaCadastroComponent } from "./maquina-cadastro/maquina-cadastro.component";
import { MaquinaListaComponent } from "./maquina-lista/maquina-lista.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes =[
    {
        path: '',
        component: MaquinaListaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['R_MAQ'] }

    },
    {
        path: 'novo',
        component: MaquinaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['C_MAQ'] }

    },
    {
        path: ':id',
        component: MaquinaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['U_MAQ'] }

    },
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
      ],
      exports: [ RouterModule ]
})

export class MaquinaRouting{}