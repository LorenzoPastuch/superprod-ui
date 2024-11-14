import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producaopcp } from 'src/app/core/models/producaopcp.model';
import { Maquinapcp } from 'src/app/core/models/maquinapcp.model';
import { Soldapcp } from 'src/app/core/models/soldapcp.model';
import { Canudopcp } from 'src/app/core/models/canudopcp.model';

@Injectable({
  providedIn: 'root'
})
export class PcpService {

  pcpUrl: string;

  constructor(private  http: HttpClient) { 
    this.pcpUrl = `${environment.apiUrl}/pcp`
  }

  listarPcp(id: number): Promise<any> {
    return firstValueFrom(this.http.get(`${this.pcpUrl}/producao/${id}`)).then(
      (response: any) => {
        const obj = response;
        return obj;
      }
    )
  }

 adicionar(producaopcp: Producaopcp): Promise<Producaopcp> {
  return firstValueFrom(this.http.post<Producaopcp>(`${this.pcpUrl}/producao`, producaopcp))
 }

 atualizar(producaopcp: Producaopcp): Promise<Producaopcp> {
  return firstValueFrom(this.http.put(`${this.pcpUrl}/producao/${producaopcp.id}`, producaopcp))
  .then((response) => response as Producaopcp);
 }

 excluir(id: number): Promise<void> {
  return firstValueFrom(this.http.delete(`${this.pcpUrl}/producao/${id}`))
  .then()
  .then(() => null);
 }

 mudarProduto(maquinapcp: Maquinapcp): Promise<Maquinapcp> {
  return firstValueFrom(this.http.put(`${this.pcpUrl}/controle/${maquinapcp.maquina.id}`, maquinapcp))
  .then((response) => response as Maquinapcp);
 }

 listarMaquinas(): Promise<any> {
  return firstValueFrom(this.http.get(`${this.pcpUrl}/controle`)).then(
    (response: any) => {
      const obj = response;
      return obj;
    }
  )
 }

 buscarPorMaquina(maquina: number): Promise<any> {
  return firstValueFrom(this.http.get(`${this.pcpUrl}/controle/${maquina}`)).then(
    (response: any) => {
      return response;
    }
  )
 }

  listarPcpSolda(id: number): Promise<any> {
    return firstValueFrom(this.http.get(`${this.pcpUrl}/solda/${id}`)).then(
      (response: any) => {
        const obj = response;
        return obj;
      }
    )
  }

  adicionarSolda(soldapcp: Soldapcp): Promise<Soldapcp> {
    return firstValueFrom(this.http.post<Soldapcp>(`${this.pcpUrl}/solda`, soldapcp))
  }

  atualizarSolda(soldapcp: Soldapcp): Promise<Soldapcp> {
  return firstValueFrom(this.http.put(`${this.pcpUrl}/solda/${soldapcp.id}`, soldapcp))
  .then((response) => response as Soldapcp);
  }

  excluirSolda(id: number): Promise<void> {
  return firstValueFrom(this.http.delete(`${this.pcpUrl}/solda/${id}`))
  .then()
  .then(() => null);
  }

  listarPcpCanudo(id: number): Promise<any> {
    return firstValueFrom(this.http.get(`${this.pcpUrl}/canudo/${id}`)).then(
      (response: any) => {
        const obj = response;
        return obj;
      }
    )
  }

  adicionarCanudo(canudopcp: Canudopcp): Promise<Canudopcp> {
  return firstValueFrom(this.http.post<Canudopcp>(`${this.pcpUrl}/canudo`, canudopcp))
  }

  atualizarCanudo(canudopcp: Canudopcp): Promise<Canudopcp> {
  return firstValueFrom(this.http.put(`${this.pcpUrl}/canudo/${canudopcp.id}`, canudopcp))
  .then((response) => response as Canudopcp);
  }

  excluirCanudo(id: number): Promise<void> {
  return firstValueFrom(this.http.delete(`${this.pcpUrl}/canudo/${id}`))
  .then()
  .then(() => null);
  }
}

