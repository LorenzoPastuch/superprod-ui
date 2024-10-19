import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Molde } from 'src/app/core/models/Molde.model';
import { Maquina } from 'src/app/core/models/maquina.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {
  maquinaUrl: string;
  moldeUrl: string;
  moldemaquinaUrl: string;

constructor(private http: HttpClient) { 
  this.maquinaUrl = `${environment.apiUrl}/maquinas`;
  this.moldeUrl = `${environment.apiUrl}/moldes`;
    this.moldemaquinaUrl = `${environment.apiUrl}/moldemaquinas`;
}


listarMaquina(): Promise<any> {
  return firstValueFrom(this.http.get(`${this.maquinaUrl}`)).then(
    (response) => {
      const obj = response as any[];
      this.convertStringDate(obj);
      return obj;
    }
  )
 }

 excluir(id: number): Promise<void> {
  return firstValueFrom(this.http.delete(`${this.maquinaUrl}/${id}`))
  .then()
  .then(() => null);
 }

 adicionar(maquina: Maquina): Promise<Maquina> {
  

  return firstValueFrom(this.http.post<Maquina>(this.maquinaUrl, maquina));
 }

 atualizar(maquina: Maquina): Promise<Maquina> {
  return firstValueFrom(this.http.put(`${this.maquinaUrl}/${maquina.id}`, maquina))
  .then((response) => response as Maquina);
 }

 buscarPorId(id: number) {
  return firstValueFrom(this.http.get(`${this.maquinaUrl}/${id}`))
  .then((response) => response as Maquina);
}

mudarStatus(id: number, status: boolean): Promise<void> {
  const headers = new HttpHeaders().append(
    'Content-Type',
    'application/json'
  );
  return firstValueFrom(this.http.put(`${this.maquinaUrl}/${id}/status`, status, { headers }))
  .then(() => null);
}

AlternarLista(valor: string): Promise<any> {
  return firstValueFrom(this.http.get(`${this.maquinaUrl}${valor}`))
  .then((response) => response);
}

buscarNomeMolde(id: number) {
  return firstValueFrom(this.http.get(`${this.moldeUrl}/${id}`)).then(
    (response) => response as Molde
  );
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


listarMoldeMaquina(id: number): Promise<any> {
  return firstValueFrom(this.http.get(`${this.maquinaUrl}/molde/${id}`)).then(
    (response) => {
      const obj = response as any[];
      this.convertStringDate(obj);
      return obj;
    }
  );
}


}
