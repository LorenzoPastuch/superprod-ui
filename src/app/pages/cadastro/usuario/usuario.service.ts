import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuariosUrl: string;
  tenantUrl: string;
  permissoesUrl: string;
  resetpass: string;

constructor(private http: HttpClient) { 
  this.usuariosUrl = `${environment.apiUrl}/usuarios`;
    this.resetpass = `${environment.apiUrl}/forgot`;
}

// listarTenant(): Promise<any> {
//   return firstValueFrom(this.http.get(`${this.tenantUrl}`)).then(
//     (response) => response
//   );
// }

// listarPermissoes(): Promise<any> {
//   console.log(firstValueFrom(this.http.get(`${this.usuariosUrl}/permissoes`)).then(
//     (response) => response
//   ))
//   return firstValueFrom(this.http.get(`${this.usuariosUrl}/permissoes`)).then(
//     (response) => response
//   );
// }

listarUsuarios(): Promise<any> {
  return firstValueFrom(this.http.get(`${this.usuariosUrl}`)).then( //arrumar a forma de listar ativos e inativos aqui e no backend
    (response) => {
      const obj = response as any[];
      this.convertStringDate(obj);
      return obj;
    }
  );
}

excluir(id: number): Promise<void> {
  return firstValueFrom(this.http.delete(`${this.usuariosUrl}/${id}`))
    .then()
    .then(() => null);
}

adicionar(user: Usuarios): Promise<Usuarios> {
  return firstValueFrom(this.http.post<Usuarios>(this.usuariosUrl, user));
}

atualizar(user: Usuarios): Promise<Usuarios> {
  return firstValueFrom(
    this.http.put(`${this.usuariosUrl}/${user.id}`, user)
  ).then((response) => response as Usuarios);
}


alterarSenha(id: number, novasenha: string): Promise<Usuarios> {
  return firstValueFrom(
    this.http.put(`${this.usuariosUrl}/${id}/alterar-senha`, { nova_senha: novasenha })
  ).then((response) => response as Usuarios);
}

buscarPorId(id: number) {
  return firstValueFrom(this.http.get(`${this.usuariosUrl}/${id}`)).then(
    (response) => response as Usuarios
  );
}

mudarStatus(id: number, status: boolean): Promise<void> {
  const headers = new HttpHeaders().append(
    'Content-Type',
    'application/json'
  );
  return firstValueFrom(
    this.http.put(`${this.usuariosUrl}/${id}/status`, status, { headers })
  ).then(() => null);
}

AlternarLista(valor: string): Promise<any> {
  console.log(firstValueFrom(this.http.get(`${this.usuariosUrl}${valor}`)).then(
    (response) => response
  ))
  return firstValueFrom(this.http.get(`${this.usuariosUrl}${valor}`)).then(
    (response) => response
  );
}

empresaAtivar(id: number, id_empresa): Promise<any> {
  return firstValueFrom(
    this.http.put(`${this.usuariosUrl}/${id}/atualizar-empresa-ativa`, id_empresa)
  ).then((response) => response);
}
/* converterStringDate(obj: any[]) {
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

resetSenha(id: number): Promise<Usuarios> {
  return firstValueFrom(
    this.http.put(`${this.usuariosUrl}/${id}/reset`, id)
  ).then((response) => response as Usuarios);
}

}
