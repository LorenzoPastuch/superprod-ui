import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PcpService } from '../planejamento.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AtributoService } from '../../../cadastro/atributos/atributo.service';
import { ProdutoService } from '../../../cadastro/produto/produto.service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../../seguranca/auth.service';
import { Soldapcp } from 'src/app/core/models/soldapcp.model';

@Component({
  selector: 'app-pcp-maquinas',
  templateUrl: './soldas.component.html',
  styleUrls: ['./soldas.component.css'],
})
export class PcpSoldasComponent implements OnInit {
  @ViewChild('tabela') table: Table;
  producoes:  any[];
  atributos = [];
  produtos = [];
  cols: any[];
  status: any[];
  messageDrop = 'Nenhum resultado encontrado...';
  idProd: number;
  clonedProducao: { [s: string]: Soldapcp } = {};
  novaProd = new Soldapcp();
  maquina: any;
  editing = false;
  produto: any;
  editingProduct = false;
  selectedProductId: number;
  trocaMolde: boolean = false;
  prioridade: boolean = false;
  intervaloAtualizacao: any;

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
    this.idProd = parseInt(this.route.snapshot.params['id'])
    this.carregarAtributo();
    this.carregarProduto();
    this.carregarMaquina()
    .then(() => {
      this.cols = [
        {field: 'cor_1', header: (this.produto.nome === 'ECO DUO LISO' ? 'Cor da externa' : 'Cor da cuba'), width: '200px'},
        {field: 'cor_2', header: (this.produto.nome === 'ECO DUO LISO' ? 'Cor da interna' : 'Cor da base'), width: '200px'},
        {field: 'quantidade', header: 'Quantidade', width: '100px'},
        {field: 'ordem', header: 'Ordem', width: '50px'},
        {field: 'horainicial', header: 'Hora inicial', width: '100px'},
        {field: 'horafinal', header: 'Hora final', width: '100px'},
        {field: 'qnt_teorica', header: 'Quantidade teórica produzida', width: '100px'},
        {field: 'qnt_produzida', header: 'Quantidade produzida', width: '90px'},
        {field: 'status', header: 'Status', width: '120px'},
      ]
      this.title.setTitle('Solda '+ this.maquina.maquina.numero);
    });
    this.carregarPcp(this.idProd);
    this.status = [
      { label: 'EM PRODUÇÃO', value: 'EM PRODUÇÃO' },
      { label: 'FINALIZADA', value: 'FINALIZADA' },
      { label: 'FILA P/ PRODUZIR', value: 'FILA P/ PRODUZIR' },
      { label: 'NÃO FINALIZADA', value: 'NÃO FINALIZADA' }
    ];
    this.intervaloAtualizacao = setInterval(() => {
      this.producoes.forEach(producao => {
        producao.qnt_teorica = this.calcularQuantidadeTeorica(producao);
      });
    }, 1000);
  }

  carregarPcp(id: number) {
    this.spinner.show();
    this.pcpService.listarPcpSolda(id)
      .then(obj => {
        this.producoes = obj;
        this.producoes = this.producoes.map(producao => {
          return {
            ...producao,
            nomecor_1: producao.cor_1.nome,
            nomecor_2: producao.cor_2.nome,
            horainicial: producao.horainicial ? new Date(producao.horainicial) : null,
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
        console.log(this.maquina)
        this.produto = maquina.produto;
        this.carregarTrocaMolde();
        this.carregarPrioridade();
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  adicionar() {
    this.novaProd = new Soldapcp();
    this.producoes.push(this.novaProd);
    this.editar(this.novaProd);
    this.editing = false;
  }

  editar(producao: Soldapcp) {
    this.editing=true;
    this.table.initRowEdit(producao);
    this.clonedProducao[producao.id as number] = { ...producao };
  }

  cancelar(producao: Soldapcp, index: number) {
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
      this.pcpService.atualizarSolda(producao).then(
        (response) => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção atualizada com sucesso!'});
          delete this.clonedProducao[producao.id as number];
          this.carregarPcp(this.idProd)
          this.atualizarStatusMaquina()
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao atualizar produção'});
          this.errorHandler.handle(error);
        }
      );
    } else {
      producao.maquina = this.idProd;
      this.pcpService.adicionarSolda(producao).then(
        (response) => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção adicionada com sucesso!'});
          this.carregarPcp(this.idProd)
          this.atualizarStatusMaquina()
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao adicionar produção'});
          this.errorHandler.handle(error);
        }
      );
    }
    this.novaProd = new Soldapcp();
  }

  excluir(id: number) {
    this.pcpService.excluirSolda(id).then(() => {
      this.producoes = this.producoes.filter(producao => producao.id !== id);
      this.atualizarStatusMaquina();
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
        case 'NÃO FINALIZADA':
            return 'success';
        case 'FINALIZADA':
          return 'success';
        case 'EM PRODUÇÃO':
            return 'warning';
        case 'FILA P/ PRODUZIR':
            return 'danger';
    }
  }

  atualizarStatus(producao: any) {
    this.atualizarStatusMaquina()
    this.pcpService.atualizarSolda(producao).then(() => {
      this.carregarPcp(this.idProd)
    })
  }

  atualizarHoraInicial(producao: any) {
    producao.horainicial = new Date(producao.horainicial)
    producao.horainicial = producao.horainicial.toISOString();
    this.pcpService.atualizarSolda(producao).then(() => {
      this.carregarPcp(this.idProd)
    })
  }

  salvarQntProduzida(producao: any) {
    this.pcpService.atualizar(producao).then(() => {
      this.carregarPcp(this.idProd)
    })
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'EM PRODUÇÃO':
        return 'status-produzindo';
      case 'FINALIZADA':
        return 'status-produzido';
      case 'FILA P/ PRODUZIR':
        return 'status-na-fila';
      case 'NÃO FINALIZADA':
        return 'status-nao-finalizada';
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
  }

  carregarTrocaMolde() {
    if (this.maquina.status === 'TROCA DE MOLDE') {
      this.trocaMolde = true;
    } else {
      this.trocaMolde = false;
    }
  }

  Prioridade() {
    if (this.maquina.prioridade === true) {
      this.prioridade = false;
      this.maquina.prioridade = false;
      this.atualizarStatusMaquina();
    } else {
      this.prioridade = true;
      this.maquina.prioridade = true;
      this.atualizarStatusMaquina()
    }
    this.pcpService.mudarProduto(this.maquina).then(() => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Prioridade definida com sucesso'});
    }).catch((erro) => {
      this.errorHandler.handle(erro);
    });
  }

  carregarPrioridade() {
    if (this.maquina.prioridade === true) {
      this.prioridade = true;
    } else {
      this.prioridade = false;
    }
  }

  atualizarStatusMaquina() {
    if(this.trocaMolde === true) {
      this.maquina.status = 'TROCA DE MOLDE';
    } else if(this.producoes.find(
      producao => producao.status === 'EM PRODUÇÃO'
    )) {
      this.maquina.status = 'EM PRODUÇÃO';
    } else if (this.producoes.find(
      producao => producao.status === 'FILA P/ PRODUZIR' || producao.status === 'NÃO FINALIZADA'
    )) {
      this.maquina.status = 'FILA DE PRODUÇÃO';
    } else {
      this.maquina.status = 'PARADA';
    }
    this.pcpService.mudarProduto(this.maquina).then(() => {
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Status atualizado com sucesso'});
    }).catch((erro) => {
      this.errorHandler.handle(erro);
    });
  }

  isFormValid(): boolean {
    return this.producoes.every(producao => 
      producao.cor_1 && 
      producao.cor_2 &&
      producao.quantidade && 
      producao.ordem && 
      producao.status
    );
  }

  calcularQuantidadeTeorica(producao: any): number {
    const agora = new Date();
    const horainicial = producao.horainicial ? new Date(producao.horainicial) : null;
    const horafinal = producao.horafinal ? new Date(producao.horafinal) : null;
    const qntTotal = producao.unidades;
    const ciclo = producao.ciclo; // em segundos
    const cavidades = producao.cavidades;
  
    if (!horainicial || !horafinal || !qntTotal || !ciclo || !cavidades) {
      return 0; // Retorna 0 se faltar algum dado essencial.
    }
  
    // Define os horários de operação da máquina
    const horaInicioOperacao = 7;
    const horaFimOperacao = 17;
    const segundosPorDia = (horaFimOperacao - horaInicioOperacao) * 3600; // 10 horas de trabalho em segundos
  
    // Função para calcular os segundos trabalhados dentro do horário de operação, excluindo finais de semana
    const calcularTempoTrabalhado = (inicio: Date, fim: Date): number => {
      let tempoTotalSegundos = 0;
      let dataAtual = new Date(inicio);
  
      while (dataAtual < fim) {
        const inicioDia = new Date(dataAtual);
        inicioDia.setHours(horaInicioOperacao, 0, 0, 0);
  
        const fimDia = new Date(dataAtual);
        fimDia.setHours(horaFimOperacao, 0, 0, 0);
  
        const diaSemana = dataAtual.getDay(); // 0 = domingo, 6 = sábado
        if (diaSemana !== 0 && diaSemana !== 6) { // Exclui sábados e domingos
          if (fim < inicioDia) break; // O fim está antes do início do dia de trabalho
          if (inicio > fimDia) {
            dataAtual.setDate(dataAtual.getDate() + 1); // Pula para o próximo dia
            continue;
          }
  
          const inicioPeriodo = inicio > inicioDia ? inicio : inicioDia;
          const fimPeriodo = fim < fimDia ? fim : fimDia;
  
          tempoTotalSegundos += (fimPeriodo.getTime() - inicioPeriodo.getTime()) / 1000;
        }
  
        dataAtual.setDate(dataAtual.getDate() + 1); // Avança para o próximo dia
      }
  
      return tempoTotalSegundos;
    };
  
    // Calcula o tempo total trabalhado
    const tempoTrabalhadoSegundos = calcularTempoTrabalhado(horainicial, agora);
  
    // Calcula a quantidade teórica
    let quantidadeTeorica = (tempoTrabalhadoSegundos * cavidades) / ciclo;
    quantidadeTeorica = Math.min(quantidadeTeorica, qntTotal); // Garante que não exceda a quantidade total
  
    return Math.round(quantidadeTeorica);
  }
}
