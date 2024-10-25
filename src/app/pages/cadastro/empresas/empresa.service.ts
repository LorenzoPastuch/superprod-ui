import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Empresas } from 'src/app/core/models/empresas.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

empresaUrl: string;



constructor(private http: HttpClient) {

  this.empresaUrl = `${environment.apiUrl}/empresas`;
 }


 listar(): Promise<any> {
  return firstValueFrom(this.http.get(`${this.empresaUrl}/ativos`))
  .then((response) => {
    const obj = response as any[];
    this.convertStringDate(obj);
    return obj;
  });
 }
 

 listarEmpresas(): Promise<any> {
  return firstValueFrom(
    this.http.get(`${this.empresaUrl}`)
  )
    .then(response => {
      const obj = response as any[];
      this.convertStringDate(obj);
      return obj;
    });
}

listarEmpresaUsuarios(): Promise<any> {
  return firstValueFrom(this.http.get(`${this.empresaUrl}/usuarios`))
  .then((response) => response);
}


adicionar(obj: Empresas): Promise<Empresas> {
return firstValueFrom(this.http.post<Empresas>(this.empresaUrl, obj));
}


atualizar(obj: Empresas): Promise<Empresas> {
  return firstValueFrom(this.http.put(`${this.empresaUrl}/${obj.id}`, obj))
  .then((response) => response as Empresas)
}


buscarPorId(id: number) {
  return firstValueFrom(this.http.get(`${this.empresaUrl}/${id}`))
  .then((response) => response as Empresas)
}


AlternarLista(valor: string): Promise<any> {
  return firstValueFrom(this.http.get(`${this.empresaUrl}${valor}`))
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

}

