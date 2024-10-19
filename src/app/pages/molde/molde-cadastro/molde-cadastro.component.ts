import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Molde } from 'src/app/core/models/Molde.model';
import { MoldeService } from '../molde.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-molde-cadastro',
  templateUrl: './molde-cadastro.component.html',
  styleUrls: ['./molde-cadastro.component.css']
})
export class MoldeCadastroComponent implements OnInit {


  salvando: boolean = false;
  molde = new Molde()
  idMolde: number;

  constructor(
    private moldeService: MoldeService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,

  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Molde');
    this.idMolde = this.route.snapshot.params['id'];
    if (this.idMolde) {
      this.spinner.show();
      this.carregarMolde(this.idMolde);
    } else {
      this.molde.status = true;
    }
  }

  get editando() {
    return Boolean(this.molde.id);
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarMolde(form)
    } else {
      this.adiconarMolde(form);
    }
  }

  carregarMolde(id: number) {
    this.moldeService.buscarPorId(id)
      .then((obj) => {
        this.molde = obj;
        this.atualizarTituliEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        // this.erroHandler.handle(erro);
      })
  }


  atualizarMolde(form: NgForm) {
    this.salvando = true;
    this.moldeService.atualizar(this.molde)
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
        // this.erroHandler.handle(erro);
      })
  }

  adiconarMolde(form: NgForm) {
    this.salvando = true;
    this.moldeService.adicionar(this.molde)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Molde',
          detail: `${obj.nome}, adicionado com sucesso!`
        });
        this.salvando = false;
        this.router.navigate(['/moldes']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      })
  }


  atualizarTituliEdicao() {
    this.title.setTitle(`Edição de Molde: ${this.molde.nome}`)
  }

}
