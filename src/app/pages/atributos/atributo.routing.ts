import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarAtributoComponent } from "./listar-atributo/listar-atributo.component";
import { CadastroAtributoComponent } from "./cadastro-atributo/cadastro-atributo.component";


const routes: Routes = [
    {
        path: '',
        component: ListarAtributoComponent
    },
    {
        path: 'novo',
        component: CadastroAtributoComponent
    },
    {
        path: ':id',
        component: CadastroAtributoComponent
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})


export class AtributoRouting { }