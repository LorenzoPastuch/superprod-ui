import { NgModule } from "@angular/core";
import { ProdutoListaComponent } from "./produto-lista/produto-lista.component";
import { ProdutoCadastroComponent } from "./produto-cadastro/produto-cadastro.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ProdutoRouting } from "./produto.routing";



@NgModule({
    declarations: [
        ProdutoListaComponent,
        ProdutoCadastroComponent
    ],
    imports: [
        PrimeNgModule,
        SharedModule,
        ProdutoRouting
    ]
})

export class ProdutoModule {}