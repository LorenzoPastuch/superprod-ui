import { NgModule } from "@angular/core";
import { PrimeNgModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { UsuarioCadastroComponent } from "./usuario-cadastro/usuario-cadastro/usuario-cadastro.component";
import { UsuarioListaComponent } from "./usuario-lista/usuario-lista/usuario-lista.component";
import { UsuarioRouting } from "./usuario.routing";
import { ValidateEqualModule } from "ng-validate-equal";





@NgModule({
    declarations: [
        UsuarioListaComponent,
        UsuarioCadastroComponent,
    ],
    imports: [
        PrimeNgModule,
        UsuarioRouting,
        ValidateEqualModule,
        SharedModule
    ]
})


export class UsuarioModule {}