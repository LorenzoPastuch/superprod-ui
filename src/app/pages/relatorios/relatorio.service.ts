import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

relatioUrl: string;



constructor(private http: HttpClient) {
  this.relatioUrl = `${environment.apiUrl}/producoes`;
 }

 relatorioMensal(mes: string, ano: string) {
  let params = new HttpParams();
  params = params.set('mes', mes);
  params = params.set('ano', ano);
  return firstValueFrom(
    this.http.get(`${this.relatioUrl}/relatorios/mensal`, {
      params,
      responseType: 'blob',
    })
  ).then((response) => response);
}


relatorioMensalMaquina(mes: string, ano: string, maquina: string) {
  let params = new HttpParams();
  params = params.set('mes', mes);
  params = params.set('ano', ano);
  params = params.set('maquina', maquina);
  return firstValueFrom(
    this.http.get(`${this.relatioUrl}/relatorios/mensalmaquina`, {
      params,
      responseType: 'blob',
    })
  ).then((response) => response);
}

relatorioMensalUsuario(mes: string, ano: string, usuario: string) {
  let params = new HttpParams();
  params = params.set('mes', mes);
  params = params.set('ano', ano);
  params = params.set('usuario', usuario);
  return firstValueFrom(
    this.http.get(`${this.relatioUrl}/relatorios/mensalUsuario`, {
      params,
      responseType: 'blob',
    })
  ).then((response) => response);
}


relatorioUsuarios() {
  return firstValueFrom(
    this.http.get(`${this.relatioUrl}/relatorios/usuario`, {
      responseType: 'blob',
    })
  ).then((response) => response);
}

relatorioMaquinas() {

  return firstValueFrom(
    this.http.get(`${this.relatioUrl}/relatorios/maquina`, {
      responseType: 'blob',
    })
  ).then((response) => response
  
  );

}


relatorioMolde() {

  return firstValueFrom(
    this.http.get(`${this.relatioUrl}/relatorios/molde`, {
      responseType: 'blob',
    })
  ).then((response) => response
  
  );

}

relatorioProduto() {

  return firstValueFrom(
    this.http.get(`${this.relatioUrl}/relatorios/produto`, {
      responseType: 'blob',
    })
  ).then((response) => response
  
  );

}

relatorioProucaoFiltro(inicio: Date, fim: Date) {
  let params = new HttpParams();
  params = params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
  params = params.set('fim', moment(fim).format('YYYY-MM-DD'));
  return firstValueFrom(
    this.http.get(`${this.relatioUrl}/relatorios/producaoFiltro`, {
      params,
      responseType: 'blob',
    })
  ).then((response) => response);
}


}
