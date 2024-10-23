import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Produto } from 'src/app/core/models/produto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtoUrl: string;
constructor(private  http: HttpClient) { 
  this.produtoUrl = `${environment.apiUrl}/produtos`
}


listarProdutos(): Promise<any> {
  return firstValueFrom(this.http.get(`${this.produtoUrl}/ativos`)).then(
    (response) => {
      const obj = response as any[];
      this.convertStringDate(obj);
      return obj;
    }
  )
}

//  excluir(id: number): Promise<void> {
//   return firstValueFrom(this.http.delete(`${this.produtoUrl}/${id}`))
//   .then()
//   .then(() => null);
//  }

adicionar(produto: Produto): Promise<Produto> {
return firstValueFrom(this.http.post<Produto>(this.produtoUrl, produto));
}

atualizar(produto: Produto): Promise<Produto> {
return firstValueFrom(this.http.put(`${this.produtoUrl}/${produto.id}`, produto))
.then((response) => response as Produto);
}

buscarPorId(id: number) {
  return firstValueFrom(this.http.get(`${this.produtoUrl}/${id}`))
  .then((response) => response as Produto);
}

// mudarStatus(id: number, status: boolean): Promise<void> {
//   const headers = new HttpHeaders().append(
//     'Content-Type',
//     'application/json'
//   );
//   return firstValueFrom(this.http.put(`${this.produtoUrl}/${id}/status`, status, { headers }))
//   .then(() => null);
// }



AlternarLista(valor: string): Promise<any> {
  return firstValueFrom(this.http.get(`${this.produtoUrl}${valor}`))
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
