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
import { AuthService } from '../../seguranca/auth.service';

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
    public auth: AuthService,
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
      {field: 'caixas', header: 'Caixas', width: '100px'},
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
        this.carregarTrocaMolde();
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
      this.pcpService.atualizar(producao).then(
        (response) => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção atualizada com sucesso!'});
          delete this.clonedProducao[producao.id as number];
          this.atualizarStatusMaquina()
          this.carregarPcp(this.idProd)
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao atualizar produção'});
          this.errorHandler.handle(error);
        }
      );
    } else {
      producao.maquina = this.idProd;
      this.pcpService.adicionar(producao).then(
        (response) => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção adicionada com sucesso!'});
          this.atualizarStatusMaquina()
          this.carregarPcp(this.idProd)
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao adicionar produção'});
          this.errorHandler.handle(error);
        }
      );
    }
    this.novaProd = new Producaopcp();
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
            this.atualizarStatusMaquina()
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
    if (!this.editing) {
      this.atualizarStatusMaquina()
      this.pcpService.mudarProduto(this.maquina)
      this.pcpService.atualizar(producao).then(
        (response) => {
          console.log('Status atualizado com sucesso!', response);
          this.carregarPcp(this.idProd)
        },
        (error) => {
          console.error('Erro ao atualizar status', error);
        }
      );
  
    }
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
    if (this.selectedProductId !== this.produto.id) {
      this.maquina.produto.id = this.selectedProductId;
      this.maquina.produto.nome = this.produtos.find(
        produto => produto.value === this.selectedProductId
      ).label
      this.pcpService.mudarProduto(this.maquina)
        .then(() => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produto alterado com sucesso'});
        })
        .catch((erro) => {
          this.errorHandler.handle(erro);
        })
        .finally(() => {
          this.editingProduct = false;
          this.carregarPcp(this.idProd)
        });
    } else {
      this.editingProduct = false;
    }
  }

  TrocaMolde() {
    if (this.maquina.status !== 'TROCA DE MOLDE') {
      this.trocaMolde = true;
      this.atualizarStatusMaquina();
    } else {
      this.trocaMolde = false;
      this.atualizarStatusMaquina()
    }
    this.pcpService.mudarProduto(this.maquina).then(() => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Troca de molde atualizada com sucesso'});
    }).catch((erro) => {
      this.errorHandler.handle(erro);
    });
  }

  carregarTrocaMolde() {
    if (this.maquina.status === 'TROCA DE MOLDE') {
      this.trocaMolde = true;
    } else {
      this.trocaMolde = false;
    }
  }

  atualizarStatusMaquina() {
    const status = this.producoes.find(
      producao => producao.status === 'EM PRODUÇÃO'
    );
    if(this.trocaMolde === true) {
      this.maquina.status = 'TROCA DE MOLDE';
    } else if(status) {
      this.maquina.status = 'EM PRODUÇÃO';
    } else {
      this.maquina.status = 'PARADA';
    }
  }

  isFormValid(): boolean {
    return this.producoes.every(producao => 
      producao.atributo && 
      producao.quantidade && 
      producao.ordem && 
      producao.status
    );
  }
}
