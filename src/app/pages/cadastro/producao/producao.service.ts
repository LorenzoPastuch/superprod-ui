import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { FiltrosProducao } from 'src/app/core/models/filtro.model';
import { Producao } from 'src/app/core/models/producao.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProducaoService {

  producaoUrl: string;

  constructor(private  http: HttpClient) { 
    this.producaoUrl = `${environment.apiUrl}/cadastro/producoes`
  }

  listarProducao(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.producaoUrl}/ativos`)).then(
      (response: any) => {
        const obj = response as any[];
        return obj;
      }
    )
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.producaoUrl}/${id}`))
    .then()
    .then(() => null);
  }

  adicionar(producao: Producao): Promise<Producao> {
    return firstValueFrom(this.http.post<Producao>(this.producaoUrl, producao));
  }

  atualizar(producao: Producao): Promise<Producao> {
    return firstValueFrom(this.http.put(`${this.producaoUrl}/${producao.id}`, producao))
    .then((response) => response as Producao);
  }

  buscarPorId(id: number): Promise<Producao> {
    return firstValueFrom(this.http.get<Producao>(`${this.producaoUrl}/${id}`))
    .then((response: any) =>  { 
      return response
    });
  }

  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(this.http.put(`${this.producaoUrl}/${id}/status`, status, { headers }))
    .then(() => null);
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.producaoUrl}${valor}`))
    .then((response) => response);
  }
}
