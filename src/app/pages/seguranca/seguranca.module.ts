import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { PrimeNgModule } from "src/app/primeng.module";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { AuthGuard } from "./auth.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { UniradHttpInterceptor } from "./superprod-http";
import { SegurancaRoutingModule } from "./seguranca.routing";
import { SharedModule } from "src/app/shared/shared.module";

export function tokenGetter(): string {
    return localStorage.getItem('token');
  }



@NgModule({
declarations: [LoginComponent],
imports: [
    PrimeNgModule,
    SharedModule,
    SegurancaRoutingModule,
    JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter,
            allowedDomains: environment.whiteListedDomains,
            disallowedRoutes: environment.blackListedDomains
        }
    })
],
providers:[
    AuthGuard,
    JwtHelperService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: UniradHttpInterceptor,
        multi: true
    }
],
exports: []
})


export class SegurancaModule {}