import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Atributo } from 'src/app/core/models/atributo.model';
import { AtributoService } from '../atributo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro-atributo',
  templateUrl: './cadastro-atributo.component.html',
  styleUrls: ['./cadastro-atributo.component.css']
})
export class CadastroAtributoComponent implements OnInit {

  salvando: boolean = false;
  atributo = new Atributo()
  idAtributo: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private atributoService: AtributoService
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Atributo');
    this.idAtributo = this.route.snapshot.params['id'];
    if (this.idAtributo) {
      this.spinner.show();
      this.carregarAtributos(this.idAtributo);
    } else {
      this.atributo.status = true;
    }
  }

  get editando() {
    return Boolean(this.atributo.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarAtributos(form)
    } else {
      this.adiconarAtributos(form);
    }
  }

  carregarAtributos(id: number) {
    this.atributoService.buscarPorId(id)
      .then((obj) => {
        this.atributo = obj;
        this.atualizarTituliEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  atualizarAtributos(form: NgForm) {
    this.salvando = true;
    this.atributoService.atualizar(this.atributo)
      .then((obj) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Atributo',
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

  adiconarAtributos(form: NgForm) {
    this.salvando = true;
    this.atributoService.adicionar(this.atributo)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Atributo',
          detail: `${obj.nome}, adicionado com sucesso!`
        });
        this.salvando = false;
        this.router.navigate(['/atributos']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      })
  }

  atualizarTituliEdicao() {
    this.title.setTitle(`Edição de Atributo: ${this.atributo.nome}`)
  }

}
