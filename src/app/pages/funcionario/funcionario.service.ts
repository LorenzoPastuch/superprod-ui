import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Funcionario } from 'src/app/core/models/funcionario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  funcionarioURL: string;

  constructor(private http: HttpClient) {
    this.funcionarioURL = `${environment.apiUrl}/funcionarios`
  }

  listar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.funcionarioURL}`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }

  excluir(id: number): Promise<void> {
    return firstValueFrom(this.http.delete(`${this.funcionarioURL}/${id}`))
      .then()
      .then(() => null);
  }


  adicionar(funcionario: Funcionario): Promise<Funcionario> {
    return firstValueFrom(this.http.post<Funcionario>(this.funcionarioURL, funcionario));
  }


  atualizar(funcionario: Funcionario): Promise<Funcionario> {
    return firstValueFrom(this.http.put(`${this.funcionarioURL}/${funcionario.id}`, funcionario))
      .then((response) => response as Funcionario);
  }


  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.funcionarioURL}/${id}`))
      .then((response) => response as Funcionario);
  }


  mudarStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return firstValueFrom(this.http.put(`${this.funcionarioURL}/${id}/status`, status, { headers }))
      .then(() => null);
  }


  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.funcionarioURL}${valor}`))
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