import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

    pcpUrl: string;

    constructor(private  http: HttpClient) { 
    this.pcpUrl = `${environment.apiUrl}/pcp`
    }

    listarInsumos(): Promise<any> {
        return firstValueFrom(this.http.get(`${this.pcpUrl}/insumos`)).then(
          (response: any) => {
            return response;
          }
        )
    }
}

