import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export class NotAuthenticatedError { }

@Injectable()
export class UniradHttpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clona a requisição para adicionar o cabeçalho de autorização
    let clonedRequest = req;

    // Verifica se o token existe
    const token = localStorage.getItem('token');
    if (token) {
      clonedRequest = clonedRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Se a requisição for para /forgot, adiciona o cabeçalho Content-Type
    if (req.url.includes('/forgot')) {
      clonedRequest = clonedRequest.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Se o token estiver inválido, tenta obter um novo
    if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {
      return from(this.auth.obterNovoAccessToken())
        .pipe(
          mergeMap(() => {
            if (this.auth.isAccessTokenInvalido()) {
              throw new NotAuthenticatedError();
            }
            // Atualiza o token após obter um novo
            const newToken = localStorage.getItem('token');
            clonedRequest = clonedRequest.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next.handle(clonedRequest);
          }),
          catchError(error => {
            if (this.auth.isAccessTokenInvalido()) {
              throw new NotAuthenticatedError();
            }
            return next.handle(clonedRequest);
          })
        );
    }

    return next.handle(clonedRequest);
  }
}