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
      this.convertStringDate(obj);
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
    this.convertStringDate([response]);
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


convertStringDate(obj: any[]) {
  obj.forEach((element) => {
    // Certifique-se de que o formato da string de data está correto
    const dateFormat = 'YYYY/MM/DD H:mm';
    
    // Verifique se a data não é nula ou indefinida antes de tentar convertê-la
    // if (element.datagravacao) {
    //   element.datagravacao = moment(element.datagravacao, dateFormat)
    //     .tz('America/Sao_Paulo')
    //     .toDate();
    // }
    if (element.data) {
      element.data = moment(element.data, dateFormat)
        .tz('America/Sao_Paulo')
        .toDate();
    }
  });
}


// listarComFiltro(filtro: FiltrosProducao): Promise<any> {
//   const param: { [k: string]: any } = this.validarParametros(filtro);
//   return firstValueFrom(this.http.get(`${this.producaoUrl}`, { params: param })).then(
//     (response: any) => {
//       this.converterStringsParaDatasFiltro(response.content);
//       return response;
//     }
//   );
// }


// validarParametros(filtro: FiltrosProducao) {
//   const obj: { [k: string]: any } = {};

//   obj.page = filtro.pagina;
//   obj.size = filtro.itensPorPagina;

//   if (filtro.dataproducaode) {
//     obj.dataproducaode = filtro.dataproducaode;
//   }
//   if (filtro.dataproducaoate) {
//     obj.datalancamentoate = filtro.dataproducaoate;
//   }
//   if (filtro.nomeMaquina) {
//     obj.nomeMaquina = filtro.nomeMaquina;
//   }
//   if (filtro.nomeProduto) {
//     obj.nomeProduto = filtro.nomeProduto;
//   }
//   if (filtro.nomeAtributo) {
//     obj.nomeAtributo = filtro.nomeAtributo;
//   }
//   if (filtro.status) {
//     obj.status = filtro.status;
//   }
  // if (filtro.id) {
  //   obj.id = filtro.id;
  // }
  // if (filtro.nomeOperador) {
  //   obj.nomeOperador = filtro.nomeOperador;
  // }
  
  // if (filtro.dataprevisaode) {
  //   obj.dataprevisaode = filtro.dataprevisaode;
  // }

  // if (filtro.dataprevisaoate) {
  //   obj.dataprevisaoate = filtro.dataprevisaoate;
  // }

  // if (filtro.loginusuario) {
  //   obj.loginusuario = filtro.loginusuario;
  // }
//   return obj;
// }

// private converterStringsParaDatasFiltro(obj: any[]) {
//   obj.forEach((element) => {
//     if (element.dataprivisao) {
//       element.dataprivisao = moment(element.dataprivisao, 'YYYY-MM-DD H:mm')
//         .tz('America/Sao_Paulo')
//         .toDate();
//     }
//     if (element.datagravacao) {
//       element.datagravacao = moment(element.datagravacao, 'YYYY-MM-DD H:mm')
//         .tz('America/Sao_Paulo')
//         .toDate();
//     }
//   });
// }


private converterStringsParaDatas(obj: any[]) {
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
