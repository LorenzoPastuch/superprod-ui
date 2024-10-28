import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PcpService } from '../../pcp/pcp.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AtributoService } from '../../cadastro/atributos/atributo.service';
import { ProdutoService } from '../../cadastro/produto/produto.service';
import { Producaopcp } from 'src/app/core/models/producaopcp.model';
import { Maquinapcp } from 'src/app/core/models/maquinapcp.model';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-pcp-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.css'],
})
export class PcpMaquinasComponent implements OnInit {
  @ViewChild('tabela') table: Table;
  producoes:  any[];
  atributos = [];
  produtos = [];
  cols: any[];
  status: any[];
  messageDrop = 'Nenhum resultado encontrado...';
  idProd: number;
  clonedProducao: { [s: string]: Producaopcp } = {};
  novaProd = new Producaopcp();
  maquina: any;
  editing = false;
  produto: any;
  editingProduct = false;
  selectedProductId: number;
  trocaMolde: boolean = false;

  constructor(
    private title: Title,
    private pcpService: PcpService,
    private errorHandler: ErrorHandlerService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private atributoService: AtributoService,
    private produtoService: ProdutoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private confirmpopupService: ConfirmPopupModule,
    private checkboxService: CheckboxModule
  ) { }

  ngOnInit() {
    this.idProd = parseInt(this.route.snapshot.params['id']);
    this.carregarAtributo();
    this.carregarProduto();
    this.carregarMaquina();
    this.title.setTitle('Maquina '+this.idProd);
    this.carregarPcp(this.idProd);
    this.cols = [
      {field: 'nomeatributo', header: 'Atributo', width: '400px'},
      {field: 'quantidade', header: 'Quantidade', width: '100px'},
      {field: 'ordem', header: 'Ordem', width: '100px'},
      // {header: 'Pigmento', width: '100px'},
      // {header: 'Hora Inicial', width: '100px'},
      // {header: 'Hora Final', width: '100px'},
      // {header: 'Quantidade Teorica', width: '100px'},
      // {header: 'Quantidade Produzida', width: '100px'},
      {field: 'status', header: 'Status', width: '100px'},
    ]
    this.status = [
      { label: 'EM PRODUÇÃO', value: 'EM PRODUÇÃO' },
      { label: 'FINALIZADA', value: 'FINALIZADA' },
      { label: 'FILA P/ PRODUZIR', value: 'FILA P/ PRODUZIR' }
    ];
    
  }

  carregarPcp(id: number) {
    this.spinner.show();
    this.pcpService.listarPcp(id)
      .then(obj => {
        this.producoes = obj;
        this.producoes = this.producoes.map(producao => {
          return {
            ...producao,
            nomeatributo: producao.atributo.nome
          }
        })
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      }); 
  }

  carregarAtributo() {
    return this.atributoService
      .listar()
      .then((pac) => {
        this.atributos = pac.map((mp) => ({ label: mp.nome, value: mp.id }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  carregarProduto() {
    return this.produtoService
      .listarProdutos()
      .then((pac) => {
        this.produtos = pac.map((mp) => ({ label: mp.nome, value: mp.id }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  carregarMaquina() {
    return this.pcpService.buscarPorMaquina(this.idProd)
      .then((maquina) => {
        this.maquina = maquina;
        this.produto = maquina.produto;
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  adicionar() {
    this.novaProd = new Producaopcp();
    this.producoes.push(this.novaProd);
    this.editar(this.novaProd);
    this.editing = false;
  }

  editar(producao: Producaopcp) {
    this.editing=true;
    this.table.initRowEdit(producao);
    console.log(this.novaProd)
    this.clonedProducao[producao.id as number] = { ...producao };
  }

  cancelar(producao: Producaopcp, index: number) {
    if (this.editing) {
      this.producoes[index] = this.clonedProducao[producao.id as number];
      delete this.clonedProducao[producao.id as number];
    } else {
      this.producoes[index] = this.clonedProducao[producao.id as number];
      delete this.clonedProducao[producao.id as number];
      this.producoes.pop();
    }
  }

  salvar(producao: any) {
    if (this.editing) {
      producao.atributo = producao.atributo;
      this.pcpService.atualizar(producao).then(
        (response) => {
          // Sucesso: a API retornou um sucesso
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção atualizada com sucesso!'});
          delete this.clonedProducao[producao.id as number];
          this.atualizarNomeAtributo(producao);
        },
        (error) => {
          // Erro: ocorreu um problema com a atualização
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao atualizar produção'});
          this.errorHandler.handle(error);
        }
      );
    } else {
      producao.atributo = producao.atributo;
      producao.maquina = this.idProd;
      this.pcpService.adicionar(producao).then(
        (response) => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção adicionada com sucesso!'});
          this.atualizarNomeAtributo(producao);
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao adicionar produção'});
          this.errorHandler.handle(error);
        }
      );
    }
    this.novaProd = new Producaopcp();
  }

  atualizarNomeAtributo(producao: any) {
    const atributo = this.atributos.find(attr => attr.value === producao.atributo);
    if (atributo) {
      producao.nomeatributo = atributo.label;
    }
  }

  excluir(id: number) {
    this.pcpService.excluir(id).then(() => {
      this.producoes = this.producoes.filter(producao => producao.id !== id);
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

  getStatus(status: string) {
    switch (status) {
        case 'FINALIZADA':
            return 'success';
        case 'EM PRODUÇÃO':
            return 'warning';
        case 'FILA P/ PRODUZIR':
            return 'danger';
    }
  }

  atualizarStatus(producao: Producaopcp) {
    this.pcpService.atualizar(producao).then(
      (response) => {
        console.log('Status atualizado com sucesso!', response);
      },
      (error) => {
        console.error('Erro ao atualizar status', error);
      }
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'EM PRODUÇÃO':
        return 'status-produzindo';
      case 'FINALIZADA':
        return 'status-produzido';
      case 'FILA P/ PRODUZIR':
        return 'status-na-fila';
      default:
        return '';
    }
  }

  toggleProductEdit() {
    if (this.editingProduct) {
      this.saveProductChange();
    } else {
      this.editingProduct = true;
      this.selectedProductId = this.produto.id;
    }
  }

  saveProductChange() {
    console.log(this.selectedProductId)
    console.log(this.produto.id)
    if (this.selectedProductId !== this.produto.id) {
      this.maquina.produto.id = this.selectedProductId;
      this.pcpService.mudarProduto(this.maquina)
        .then(() => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produto alterado com sucesso'});
        })
        .catch((erro) => {
          this.errorHandler.handle(erro);
        })
        .finally(() => {
          this.editingProduct = false;
        });
    } else {
      this.editingProduct = false;
    }
  }

  TrocaMolde() {
    if (this.maquina.trocamolde) {
      this.trocaMolde = true;
    } else {
      this.trocaMolde = false;
    }
    this.pcpService.mudarTrocamolde(this.idProd, this.trocaMolde).then(() => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Troca de molde atualizada com sucesso'});
    }).catch((erro) => {
      this.errorHandler.handle(erro);
    });
  }
}
