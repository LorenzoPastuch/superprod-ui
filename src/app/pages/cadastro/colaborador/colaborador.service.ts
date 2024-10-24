import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Colaborador } from 'src/app/core/models/colaborador.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  colaboradorURL: string;

  constructor(private http: HttpClient) {
    this.colaboradorURL = `${environment.apiUrl}/colaboradores`
  }

  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.colaboradorURL}/ativos`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.colaboradorURL}/${id}`))
      .then()
      .then(() => null);
  }


  adicionar(colaborador: Colaborador): Promise<Colaborador> {
    return firstValueFrom(this.http.post<Colaborador>(this.colaboradorURL, colaborador));
  }


  atualizar(colaborador: Colaborador): Promise<Colaborador> {
    return firstValueFrom(this.http.put(`${this.colaboradorURL}/${colaborador.id}`, colaborador))
      .then((response) => response as Colaborador);
  }


  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.colaboradorURL}/${id}`))
      .then((response) => response as Colaborador);
  }


  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(this.http.put(`${this.colaboradorURL}/${id}/status`, status, { headers }))
      .then(() => null);
  }


  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.colaboradorURL}${valor}`))
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