import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom, Observable } from 'rxjs';
import { EmbaladorPcp } from 'src/app/core/models/embaladorpcp.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmbaladoresPcpService {

    pcpUrl: string;

    constructor(private  http: HttpClient) { 
    this.pcpUrl = `${environment.apiUrl}/pcp`
    }

    listarEmbaladores(): Promise<any> {
        return firstValueFrom(this.http.get(`${this.pcpUrl}/embaladores`)).then(
          (response: any) => {
            return response;
          }
        )
    }

  atualizarEmbalador(embaladorpcp: EmbaladorPcp): Promise<EmbaladorPcp> {
    return firstValueFrom(this.http.put(`${this.pcpUrl}/embaladores/${embaladorpcp.id}`, embaladorpcp))
    .then((response) => response as EmbaladorPcp);
   }

  rotacionar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.pcpUrl}/embaladores/rotacionar`)).then(
      (response: any) => {
        return response;
      }
    );
    }
}

