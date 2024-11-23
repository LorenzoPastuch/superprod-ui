import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AtributoService } from '../../cadastro/atributos/atributo.service';
import { ProdutoService } from '../../cadastro/produto/produto.service';
import { Producaopcp } from 'src/app/core/models/producaopcp.model';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../seguranca/auth.service';
import { TrocaMoldeService } from './trocamolde.service';
import { MoldeService } from '../../cadastro/molde/molde.service';
import { MaquinaService } from '../../cadastro/maquina/maquina.service';
import { TrocaMoldePcp } from 'src/app/core/models/trocamolde.model';

@Component({
  selector: 'app-pcp-maquinas',
  templateUrl: './trocamolde.component.html',
  styleUrls: ['./trocamolde.component.css'],
})
export class TrocaMoldePcpComponent implements OnInit {
  @ViewChild('tabela') table: Table;
  trocamoldes:  any[];
  moldes = [];
  cols: any[];
  statusm: any[];
  statust: any[];
  messageDrop = 'Nenhum resultado encontrado...';
  idProd: number;
  clonedProducao: { [s: string]: TrocaMoldePcp } = {};
  novaProd = new TrocaMoldePcp();
  maquinas = [];
  editing = false;
  produto: any;
  editingProduct = false;
  selectedProductId: number;
  trocaMolde: boolean = false;
  prioridade: boolean = false;
  intervaloAtualizacao: any;
  unidadeAtual: string = 'Unidades';
  unidadeatual: string = 'unidades';

  constructor(
    private title: Title,
    private trocamoldeservice: TrocaMoldeService,
    private errorHandler: ErrorHandlerService,
    private spinner: NgxSpinnerService,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private maquinaService: MaquinaService,
    private moldeService: MoldeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private confirmpopupService: ConfirmPopupModule,
    private checkboxService: CheckboxModule
  ) { }

  ngOnInit() {
    this.carregarMolde();
    this.carregarMaquinas();
    this.carregarTrocaMolde();
    this.title.setTitle('Troca de Molde');
    this.cols = [
        {field: 'injetora', header: 'Máquina', width: '100px'},
        {field: 'molde_maquina', header: 'Molde em máquina', width: '50px'},
        {field: 'status_molde', header: 'Status molde', width: '100px'},
        {field: 'proximo_molde', header: 'Próximo molde', width: '100px'},
        {field: 'status_troca', header: 'Status troca', width: '100px'},
        {field: 'data_prevista', header: 'Data prevista', width: '90px'},
        {field: 'data_realizada', header: 'Data realizada', width: '120px'},
        {field: 'observacoes', header: 'Observações', width: '120px'},
    ]
    this.statusm = [
      { label: 'PRODUZIDO', value: 'PRODUZIDO' },
      { label: 'EM PRODUÇÃO', value: 'EM PRODUÇÃO' },
      { label: 'FILA DE PRODUÇÃO', value: 'FILA DE PRODUÇÃO' },
    ];
    this.statust = [
        { label: 'NÃO INICIADA', value: 'NÃO INICIADA' },
        { label: 'EM EXECUÇÃO', value: 'EM EXECUÇÃO' },
        { label: 'CONCLUÍDA', value: 'CONCLUÍDA' }
      ];
  
  }

  carregarTrocaMolde() {
    this.spinner.show();
    this.trocamoldeservice.listarTrocaMolde()
      .then(obj => {
        this.trocamoldes = obj;
        this.trocamoldes = this.trocamoldes.map(producao => {
          return {
            ...producao,
            data_prevista: producao.data_prevista ? new Date(producao.data_prevista) : null,
            data_realizada: producao.data_realizada ? new Date(producao.data_realizada) : null,

          }
        })
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      }); 
  }

  carregarMolde() {
    return this.moldeService
      .listarMoldes()
      .then((pac) => {
        this.moldes = pac.map((mp) => ({ label: mp.nome, value: mp.id }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  carregarMaquinas() {
    return this.maquinaService
      .listarMaquina()
      .then((pac) => {
        this.maquinas = pac.map((mp) => ({ label: mp.nome + ' ' + mp.numero, value: mp.id }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  adicionar() {
    this.novaProd = new TrocaMoldePcp();
    this.trocamoldes.push(this.novaProd);
    this.editar(this.novaProd);
    this.editing = false;
  }

  editar(producao: TrocaMoldePcp) {
    this.editing=true;
    this.table.initRowEdit(producao);
    this.clonedProducao[producao.id as number] = { ...producao };
  }

  cancelar(producao: TrocaMoldePcp, index: number) {
    if (this.editing) {
      this.trocamoldes[index] = this.clonedProducao[producao.id as number];
      delete this.clonedProducao[producao.id as number];
    } else {
      this.trocamoldes[index] = this.clonedProducao[producao.id as number];
      delete this.clonedProducao[producao.id as number];
      this.trocamoldes.pop();
    }
  }

  salvar(producao: any) {
    if (this.editing) {
      this.trocamoldeservice.atualizar(producao).then(
        (response) => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção atualizada com sucesso!'});
          delete this.clonedProducao[producao.id as number];
          this.carregarTrocaMolde()
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao atualizar produção'});
          this.errorHandler.handle(error);
        }
      );
    } else {
      this.trocamoldeservice.adicionar(producao).then(
        (response) => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção adicionada com sucesso!'});
          this.carregarTrocaMolde()
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao adicionar produção'});
          this.errorHandler.handle(error);
        }
      );
    }
    this.novaProd = new TrocaMoldePcp();
  }

  excluir(id: number) {
    this.trocamoldeservice.excluir(id).then(() => {
      this.trocamoldes = this.trocamoldes.filter(producao => producao.id !== id);
    }).catch((erro) => {
      this.errorHandler.handle(erro);
    });
  }

  confirmExcluir(event: Event, id: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Tem certeza que deseja excluir?',
        icon: 'pi pi-exclamation-triangle',
        key: 'confirmPopup',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Produçâo excluida!', life: 3000 });
            this.excluir(id);
        },
    });
}

  atualizar(producao: any) {
    this.trocamoldeservice.atualizar(producao).then(() => {
      this.carregarTrocaMolde()
    })
  }


  getStatusClass(status: string): string {
    switch (status) {
        case 'EM PRODUÇÃO':
            return 'status-produzindo';
        case 'PRODUZIDO':
            return 'status-produzido';
        case 'FILA DE PRODUÇÃO':
            return 'status-na-fila';
        case 'EM EXECUÇÃO':
            return 'status-na-fila';
        case 'CONCLUÍDA':
            return 'status-produzido';
        case 'NÃO INICIADA':
            return 'status-nao-finalizada';
        default:
            return '';
    }
  }

  isFormValid(): boolean {
    return this.trocamoldes.every(trocamolde => 
      trocamolde.injetora && 
      trocamolde.molde_maquina && 
      trocamolde.proximo_molde && 
      trocamolde.data_prevista
    );
  }

}


