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

  // listarProducao(sinal: string, page: number = 1, pageSize: number = 25): Promise<any> {
  //   return firstValueFrom(
  //     this.http.get(`${this.producaoUrl}${sinal}`, {
  //       params: {
  //         page: page.toString(),
  //         page_size: pageSize.toString(),
  //       },
  //     })
  //   ).then((response: any) => {
  //     return {
  //       items: response.results, // Dados da página atual
  //       totalItems: response.count, // Total de itens
  //       totalPages: Math.ceil(response.count / pageSize), // Total de páginas
  //       next: response.next, // URL da próxima página
  //       previous: response.previous, // URL da página anterior
  //     };
  //   });
  // }

  listarProducao(
    sinal: string,
    filtros: any, 
    page: number = 1, 
    pageSize: number = 25
  ): Promise<any> {
    // Construir os parâmetros de consulta a partir do objeto de filtros
    return firstValueFrom(
      this.http.get(`${this.producaoUrl}${ sinal }?page=${ page }&size=${ pageSize }${ filtros }`)
    ).then((response: any) => {
      return {
        items: response.results, // Dados da página atual
        totalItems: response.count, // Total de itens
        totalPages: Math.ceil(response.count / pageSize), // Total de páginas
        next: response.next, // URL da próxima página
        previous: response.previous, // URL da página anterior
      };
    });
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
