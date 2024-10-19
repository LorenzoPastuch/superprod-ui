import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmpresaListaComponent } from "./empresa-lista/empresa-lista/empresa-lista.component";
import { EmpresaCadastroComponent } from "./empresa-cadastro/empresa-cadastro.component";
import { AuthGuard } from "../seguranca/auth.guard";


const routes: Routes = [
    {
        path: '',
        component: EmpresaListaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['view_empresa'] }
    },
    {
        path: 'novo',
        component: EmpresaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['add_empresa'] }
    },
    {
        path: ':id',
        component: EmpresaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['change_empresa'] }
    }
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
      ],
      exports: [ RouterModule ]

})

export class EmpresaRouting {}