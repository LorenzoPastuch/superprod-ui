import { Component, OnInit, ViewChild } from '@angular/core';
import { Maquina } from 'src/app/core/models/maquina.model';
import { MaquinaService } from '../maquina.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { MoldeService } from '../../molde/molde.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MoldeMaquina } from 'src/app/core/models/moldeMaquina.model';
import { Molde } from 'src/app/core/models/Molde.model';
import { AuthService } from '../../../seguranca/auth.service';

@Component({
  selector: 'app-maquina-cadastro',
  templateUrl: './maquina-cadastro.component.html',
  styleUrls: ['./maquina-cadastro.component.css']
})
export class MaquinaCadastroComponent implements OnInit {
  @ViewChild('frmItens') frmItens: NgForm;


  salvando: boolean;
  maquina = new Maquina();
  idMaquina: number;
  exibirForm = false;
  moldemaquina: MoldeMaquina;
  moldemaquinas: MoldeMaquina[] = [];
  itensIndex: number;
  molde: Molde;
  messageDrop = 'Nenhum resultado encontrado...';
  disabledExcluir: boolean;

  selectedMoldes: any;

  moldes = [];
  colsItens = [];
  moldesFiltrados = [];


  constructor(
    private maquinaService: MaquinaService,
    private moldeService: MoldeService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    public auth: AuthService,

  ) { }

  ngOnInit() {
    this.carregarMolde();
    this.title.setTitle('Cadastro de Máquina');
    this.idMaquina = this.route.snapshot.params['id'];
    this.colsItens = [
      { field: 'nome', header: 'Molde', width: '1400px' },
    ];



    if (this.idMaquina) {
      this.spinner.show();
      this.carregarMaquina(this.idMaquina);
    } else {
      this.maquina.status = true;
    }

  }

  carregarMoldeMaquina() {
    return this.moldeService.listarMoldes()
      .then((molde) => {
        this.moldes = molde.map((mp) => ({
          label: mp.nome,
          value: mp.id,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarNomeMolde(id: number) {
    this.maquinaService
      .buscarNomeMolde(id)
      .then((molde) => {
        this.molde = molde;
        this.maquina.moldes[this.itensIndex].nome =
          molde.nome;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }


  prepararNovo() {
    console.log('mostrar')
    this.exibirForm = true;
    this.moldemaquina = new MoldeMaquina();
    this.itensIndex = this.maquina.moldes.length;
  }


  get editando() {
    return Boolean(this.maquina.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarMaquina(form)
    } else {
      this.adiconarMaquina(form);
    }
  }

  carregarMaquina(id: number) {
    this.maquinaService.buscarPorId(id)
      .then((obj) => {
        this.maquina = obj;
        this.atualizarTituliEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      })
  }

  atualizarMaquina(form: NgForm) {
    this.salvando = true;
    this.maquinaService.atualizar(this.maquina)
      .then((obj) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Máquina',
          detail: `${this.maquina.nome}, Atualizado com sucesso!`
        });
        this.atualizarTituliEdicao();
        this.salvando = false;

      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      })
  }

  adiconarMaquina(form: NgForm) {
    this.salvando = true;
    this.maquinaService.adicionar(this.maquina)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Máquina',
          detail: `${obj.nome}, Adicionado com sucesso!`
        });
        this.salvando = false;
        this.router.navigate(['/maquinas']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      })
  }

  atualizarTituliEdicao() {
    this.title.setTitle(`Edição de Molde: ${this.maquina.nome}`)
  }


  carregarMolde() {
    return this.moldeService.listarMoldes()
      .then((moldes) => {
        console.log('Moldes carregados:', moldes);
        this.moldes = moldes.map((c) => ({ label: c.nome, value: c.id }));
        this.moldesFiltrados = [...this.moldes];
        console.log(this.moldesFiltrados)
      })
      .catch(error => this.errorHandler.handle(error));
  }


  filtrarMoldes(event) {
    const query = event.query.toLowerCase();
    this.moldesFiltrados = this.moldes.filter(molde =>
      typeof molde.label === 'string' && molde.label.toLowerCase().includes(query)
    );
  }

  yesDelete(index: number) {
    this.confirmation.confirm({
      // message: `<b>${ this.auth.jwtPayload?.user_name}</b>, Tem certeza que deseja sair? `,
      message: `Tem certeza que deseja remover? `,
      accept: () => {
        this.remover(index);
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'warn',
              summary: 'Ação cancelada',
              detail: 'Você cancelou',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'error',
              summary: 'Ação rejeitada',
              detail: 'Você rejeitou',
            });
            break;
        }
      },
    });
  }

  remover(index: number) {
    this.maquina.moldes.splice(index, 1);
  }

  confirmar(frm: NgForm) {
    this.maquina.moldes[this.itensIndex] = this.clonar(this.moldemaquina);
    this.carregarNomeMolde(this.moldemaquina.id);
    this.exibirForm = false;
    frm.reset();
  }

  clonar(moldesMaquina: MoldeMaquina): MoldeMaquina {
    return new MoldeMaquina(
      moldesMaquina.id,
      moldesMaquina.nome,
    );
  }




}
