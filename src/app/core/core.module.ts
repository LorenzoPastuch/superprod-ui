import { NgModule } from "@angular/core";
import { PrimeNgModule } from "../primeng.module";
import { LayoutComponent } from "./layout/layout.component";
import { NavbarComponent } from "./layout/nav/navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { MoldeService } from "../pages/cadastro/molde/molde.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { AuthService } from "../pages/seguranca/auth.service";
import { ValidateEqualModule } from 'ng-validate-equal';
import { EmpresaService } from "../pages/cadastro/empresas/empresa.service";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ErrorHandlerService } from "./error-handler.service";
import { RelatorioService } from "../pages/relatorios/relatorio.service";
import { NaoAutorizadaComponent } from "./layout/nao-autorizada/nao-autorizada.component";
import { PaginaNaoEncontradaComponent } from "./layout/pagina-nao-encontrada/pagina-nao-encontrada.component";
import { AlterarSenhaComponent } from "./layout/nav/navbar/alterar-senha/alterar-senha.component";
import { SharedModule } from "../shared/shared.module";




@NgModule({
    declarations: [
        LayoutComponent,
        NavbarComponent,
        NaoAutorizadaComponent,
        PaginaNaoEncontradaComponent,
        AlterarSenhaComponent
    ],
    imports: [
        PrimeNgModule,
        RouterModule,
        SharedModule,
        ValidateEqualModule,

    ],

    exports: [
        LayoutComponent,
        ConfirmDialogModule
    ],
    providers: [
        AuthService,
        MoldeService,
        MessageService,
        ConfirmationService,
        EmpresaService,
        ErrorHandlerService,
        RelatorioService
    ]
})

export class CoreModule { }