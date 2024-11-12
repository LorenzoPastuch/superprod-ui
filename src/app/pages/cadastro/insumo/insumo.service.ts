import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Insumo } from 'src/app/core/models/insumo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  insumosUrl: string;
  constructor(private  http: HttpClient) { 
    this.insumosUrl = `${environment.apiUrl}/cadastro/insumos`
  }


  listarInsumos(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.insumosUrl}/ativos`)).then(
      (response) => {
        const obj = response as any[];
        this.convertStringDate(obj);
        return obj;
      }
    )
  }

  adicionar(insumo: Insumo): Promise<Insumo> {
  return firstValueFrom(this.http.post<Insumo>(this.insumosUrl, insumo));
  }

  atualizar(insumo: Insumo): Promise<Insumo> {
  return firstValueFrom(this.http.put(`${this.insumosUrl}/${insumo.id}`, insumo))
  .then((response) => response as Insumo);
  }

  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.insumosUrl}/${id}`))
    .then((response) => response as Insumo);
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.insumosUrl}${valor}`))
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
