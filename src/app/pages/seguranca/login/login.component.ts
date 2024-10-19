import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  background: any = '/assets/imagem/fundo teste.png';
  logo: any = '/assets/imagem/Logo original.svg';
  deviceInfo = null;
  dialogiOS: boolean;
  position: string;
  messages: Message[] | undefined;

  constructor(
    private auth: AuthService,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Login')
  }

  login(usuario: string, senha: string) {
    this.spinner.show();
    this.auth.login(usuario, senha)
    .then(() => {
      this.router.navigate(['/']);
      this.spinner.hide();
    })
    .catch((erro) => {
      this.addMessages(erro);
      setTimeout(() => {
        this.clearMessages()
      }, 2060);

      this.spinner.hide();
      //this.errorHandler.handle(erro);
    });
  }

  addMessages(msg: string) {
    this.messages = [
      { severity: 'error', detail: `${msg}` }
    ];
  }

  clearMessages() {
    this.messages = [];
  }

  EnterSubmit(event: any, form: NgForm, usuario: string, senha: string) {
    if (event.keyCode === 13) {
      this.login(usuario, senha);
    }
  }s

}
