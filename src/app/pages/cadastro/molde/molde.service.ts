import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import * as moment from 'moment-timezone';
import { Molde } from 'src/app/core/models/Molde.model';
import { FiltrosMolde } from 'src/app/core/models/filtro.model';

@Injectable()
export class MoldeService {
  moldeUrl: string;

  constructor(private http: HttpClient) {
    this.moldeUrl = `${environment.apiUrl}/cadastro/moldes`
  }


  listarMoldes(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.moldeUrl}/ativos`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }

  // excluir(id: number): Promise<void> {
  //   return firstValueFrom(this.http.delete(`${this.moldeUrl}/${id}`))
  //     .then()
  //     .then(() => null);
  // }


  adicionar(molde: Molde): Promise<Molde> {
    return firstValueFrom(this.http.post<Molde>(this.moldeUrl, molde));
  }

  atualizar(molde: Molde): Promise<Molde> {
    return firstValueFrom(this.http.put(`${this.moldeUrl}/${molde.id}`, molde))
      .then((response) => response as Molde);
  }

  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.moldeUrl}/${id}`))
      .then((response) => response as Molde);
  }

  // mudarStatus(id: number, status: boolean): Promise<void> {
  //   const headers = new HttpHeaders().append(
  //     'Content-Type',
  //     'application/json'
  //   );
  //   return firstValueFrom(this.http.put(`${this.moldeUrl}/${id}/status`, status, { headers }))
  //     .then(() => null);
  // }


  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.moldeUrl}${valor}`))
      .then((response) => response);
  }


  /*  converterStringDate(obj: any[]) {
    obj.forEach((element) => {
      element.datagravacao = moment(element.datagravacao, 'YYYY/MM/DD H:mm')
        .tz('America/Sao_Paulo')
        .toDate();
    });
  } */


  convertStringDate(obj: any[]) {
    obj.forEach((element) => {
      // Certifique-se de que o formato da string de data está correto
      const dateFormat = 'YYYY/MM/DD H:mm';

      // Verifique se a data não é nula ou indefinida antes de tentar convertê-la
      if (element.datagravacao) {
        element.datagravacao = moment(element.datagravacao, dateFormat)
          .tz('America/Sao_Paulo')
          .toDate();
      }
    });
  }


  listarComFiltro(filtro: FiltrosMolde): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.moldeUrl}`, { params: param })).then(
      (response: any) => {
        this.convertStringDate(response.content);
        return response;
      }
    );
  }

  validarParametros(filtro: FiltrosMolde) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.size = filtro.itensPorPagina;

    if (filtro.id) {
      obj.id = filtro.id;
    }

    if (filtro.nome) {
      obj.nome = filtro.nome
    }

    if (filtro.sku) {
      obj.sku = filtro.sku
    }

    if (filtro.produto_id) {
      obj.produto_id = filtro.produto_id
    }

    if (filtro.loginusuario) {
      obj.loginusuario = filtro.loginusuario;
    }


    if (filtro.status) {
      obj.status = filtro.status;
    }

    return obj;
  }

}
