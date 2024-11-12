import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producaopcp } from 'src/app/core/models/producaopcp.model';
import { Maquinapcp } from 'src/app/core/models/maquinapcp.model';
import { RegistroAlmoxarifado } from 'src/app/core/models/registro_almoxarifado.model';

@Injectable({
  providedIn: 'root'
})
export class AlmoxarifadoService {

  almoxarifadoUrl: string;

  constructor(private  http: HttpClient) { 
    this.almoxarifadoUrl = `${environment.apiUrl}/almoxarifado`
  }

  listarRegistros(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.almoxarifadoUrl}/registros/naoexportados`)).then(
      (response: any) => {
        const obj = response as any[];
        return obj;
      }
    )
  }

  adicionar(registro: RegistroAlmoxarifado): Promise<RegistroAlmoxarifado> {
    return firstValueFrom(this.http.post<RegistroAlmoxarifado>(`${this.almoxarifadoUrl}/registros`, registro))
  }

  atualizar(registro: RegistroAlmoxarifado): Promise<RegistroAlmoxarifado> {
    return firstValueFrom(this.http.put(`${this.almoxarifadoUrl}/registros/${registro.id}`, registro))
    .then((response) => response as RegistroAlmoxarifado);
  }

  AlternarLista(valor: string): Promise<any> {
    return firstValueFrom(this.http.get(`${this.almoxarifadoUrl}/registros${valor}`))
    .then((response) => response);
  }

}