import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import localePt from '@angular/common/locales/pt';
import { IConfig, provideNgxMask } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNgModule } from './primeng.module';
import { CoreModule } from './core/core.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { SegurancaModule } from './pages/seguranca/seguranca.module';
import { registerLocaleData } from '@angular/common';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { CheckboxModule } from 'primeng/checkbox';




registerLocaleData(localePt, 'pt');

export const maskConfig: Partial<IConfig> = {
  dropSpecialCharacters: false
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    SegurancaModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeNgModule,
    CoreModule,
    NgxSpinnerModule,
    SharedModule,
    DashboardModule,
    CheckboxModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideNgxMask(maskConfig),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


