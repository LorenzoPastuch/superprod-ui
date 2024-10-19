import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Atributo } from 'src/app/core/models/atributo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtributoService {

  atributoURL: string;

  constructor(private http: HttpClient) {
    this.atributoURL = `${environment.apiUrl}/atributos`
  }


  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.atributoURL}`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.atributoURL}/${id}`))
      .then()
      .then(() => null);
  }

  adicionar(atributo: Atributo): Promise<Atributo> {
    return firstValueFrom(this.http.post<Atributo>(this.atributoURL, atributo));
  }

  atualizar(atributo: Atributo): Promise<Atributo> {
    return firstValueFrom(this.http.put(`${this.atributoURL}/${atributo.id}`, atributo))
      .then((response) => response as Atributo);
  }


  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.atributoURL}/${id}`))
      .then((response) => response as Atributo);
  }


  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(this.http.put(`${this.atributoURL}/${id}/status`, status, { headers }))
      .then(() => null);
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.atributoURL}${valor}`))
      .then((response) => response);
  }

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


}
