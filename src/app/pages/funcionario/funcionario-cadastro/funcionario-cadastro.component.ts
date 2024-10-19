import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Funcionario } from 'src/app/core/models/funcionario.model';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-funcionario-cadastro',
  templateUrl: './funcionario-cadastro.component.html',
  styleUrls: ['./funcionario-cadastro.component.css']
})
export class FuncionarioCadastroComponent implements OnInit {

  salvando: boolean = false;
  funcionario = new Funcionario()
  idFuncionario: number;


  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Funcionario');
    this.idFuncionario = this.route.snapshot.params['id'];
    if (this.idFuncionario) {
      this.spinner.show();
      this.carregarFuncionario(this.idFuncionario);
    } else {
      this.funcionario.status = true;
    }
  }

  get editando() {
    return Boolean(this.funcionario.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarFuncionario(form)
    } else {
      this.adiconarFuncionario(form);
    }
  }

  carregarFuncionario(id: number) {
    this.funcionarioService.buscarPorId(id)
      .then((obj) => {
        this.funcionario = obj;
        this.atualizarTituliEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  atualizarFuncionario(form: NgForm) {
    this.salvando = true;
    this.funcionarioService.atualizar(this.funcionario)
      .then((obj) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Molde',
          detail: `${obj.nome}, atualizado com sucesso!`
        });
        this.atualizarTituliEdicao();
        this.salvando = false;

      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      })
  }

  adiconarFuncionario(form: NgForm) {
    this.salvando = true;
    this.funcionarioService.adicionar(this.funcionario)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Molde',
          detail: `${obj.nome}, adicionado com sucesso!`
        });
        this.salvando = false;
        this.router.navigate(['/funcionarios']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      })
  }

  atualizarTituliEdicao() {
    this.title.setTitle(`Edição de Molde: ${this.funcionario.nome}`)
  }

}
