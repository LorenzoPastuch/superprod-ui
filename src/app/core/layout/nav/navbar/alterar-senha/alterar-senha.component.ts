import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { UsuarioService } from 'src/app/pages/cadastro/usuario/usuario.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {

  usuario = new Usuarios();
  salvando: boolean;
  idUsuario: number;

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idUsuario = this.route.snapshot.params['id'];
    this.carregarUsuario(this.idUsuario)
  }

  alterarSenha(form: NgForm) {
    this.salvando = true;
    this.usuarioService
      .alterarSenha(this.idUsuario, this.usuario.password)
      .then((usuario) => {
        this.usuario = usuario;
        this.salvando = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Senha',
          detail: `${usuario.first_name}, alterado com sucesso!`,
        });
        this.router.navigate(['/dashboard']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }

  carregarUsuario(id: number) {
    this.usuarioService
      .buscarPorId(id)
      .then((usuario) => {
        this.usuario = usuario;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
}
