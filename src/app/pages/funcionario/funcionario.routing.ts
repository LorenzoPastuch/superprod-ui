import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuncionarioCadastroComponent } from "./funcionario-cadastro/funcionario-cadastro.component";
import { FuncionarioListarComponent } from "./funcionario-listar/funcionario-listar.component";

const routes: Routes = [

    {
        path: '',
        component: FuncionarioListarComponent
    },
    {
        path: 'novo',
        component: FuncionarioCadastroComponent
    },
    {
        path: ':id',
        component: FuncionarioCadastroComponent
    },


]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class FuncionarioRouting { }