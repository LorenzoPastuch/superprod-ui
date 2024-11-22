import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { TrocaMoldePcp } from 'src/app/core/models/trocamolde.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrocaMoldeService {

    pcpUrl: string;

    constructor(private  http: HttpClient) { 
    this.pcpUrl = `${environment.apiUrl}/pcp`
    }

    listarTrocaMolde(): Promise<any> {
        return firstValueFrom(this.http.get(`${this.pcpUrl}/trocamolde`)).then(
          (response: any) => {
            return response;
          }
        )
    }

    adicionar(trocamoldepcp: TrocaMoldePcp): Promise<TrocaMoldePcp> {
        return firstValueFrom(this.http.post<TrocaMoldePcp>(`${this.pcpUrl}/trocamolde`, trocamoldepcp))
    }

    atualizar(trocamoldepcp: TrocaMoldePcp): Promise<TrocaMoldePcp> {
        return firstValueFrom(this.http.put(`${this.pcpUrl}/trocamolde/${trocamoldepcp.id}`, trocamoldepcp))
        .then((response) => response as TrocaMoldePcp);
    }

    excluir(id: number): Promise<void> {
        return firstValueFrom(this.http.delete(`${this.pcpUrl}/trocamolde/${id}`))
        .then()
        .then(() => null);
    }
}

