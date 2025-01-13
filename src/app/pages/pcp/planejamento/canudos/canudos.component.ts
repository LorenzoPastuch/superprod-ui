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
import { Producaopcp } from 'src/app/core/models/producaopcp.model';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../../seguranca/auth.service';
import { Canudopcp } from 'src/app/core/models/canudopcp.model';

@Component({
  selector: 'app-pcp-maquinas',
  templateUrl: './canudos.component.html',
  styleUrls: ['./canudos.component.css'],
})
export class CanudosPcpComponent implements OnInit {
  @ViewChild('tabela') table: Table;
  @ViewChild('tabelaE') tableE: Table;
  producoes:  any[];
  producoesE: any[];
  atributos = [];
  produtos = [];

  cols: any[];
  status: any[];
  messageDrop = 'Nenhum resultado encontrado...';
  idProd: number;
  clonedProducao: { [s: string]: Producaopcp } = {};
  novaProd = new Producaopcp();
  produto: any;

  clonedProducaoE: { [s: string]: Canudopcp } = {};
  novaProdE = new Canudopcp();

  maquina: any;
  editing = false;

  prioridade: boolean = false;
  intervaloAtualizacao: any;
  unidadeAtual: string = 'Unidades';
  unidadeatual: string = 'unidades';

  unidadeAtualE: string = 'Unidades';
  unidadeatualE: string = 'unidades';


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
    this.carregarProdutos();
    this.carregarMaquina()
    .then(() => {
      this.title.setTitle('Extrusora');
      this.cols = [
        {field: 'nomeatributo', header: 'Atributo', width: '200px'},
        {field: 'tamanho', header: 'Tamanho', width: '50px'},
        {field: this.unidadeatual, header: this.unidadeAtual, width: '100px'},
        {field: 'ordem', header: 'Ordem', width: '50px'},
        {field: 'horainicial', header: 'Hora inicial', width: '100px'},
        {field: 'horafinal', header: 'Hora final', width: '100px'},
        {field: 'qnt_teorica', header: 'Quantidade teórica produzida', width: '100px'},
        {field: 'qnt_produzida', header: 'Quantidade produzida', width: '90px'},
        {field: 'status', header: 'Status', width: '120px'},
      ]
    })
    this.carregarPcp(this.idProd);
    this.carregarPcpE(this.idProd);
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
    this.pcpService.listarPcp(id)
      .then(obj => {
        this.producoes = obj;
        this.producoes = this.producoes.map(producao => {
          return {
            ...producao,
            nomeatributo: producao.atributo.nome,
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

  carregarPcpE(id: number) {
    this.spinner.show();
    this.pcpService.listarPcpCanudo(id)
      .then(obj => {
        this.producoesE = obj;
        this.producoesE = this.producoesE.map(producao => {
          return {
            ...producao,
            nomeatributo: producao.atributo.nome,
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

  carregarProdutos() {
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
        // this.carregarTrocaMolde();
        this.carregarPrioridade();
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
      this.verificarQuantidade(producao);
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
      this.verificarQuantidade(producao);
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

  adicionarE() {
      this.novaProdE = new Canudopcp();
      this.producoesE.push(this.novaProdE);
      this.editarE(this.novaProdE);
      this.editing = false;
  }
  
  editarE(producao: Canudopcp) {
      this.editing=true;
      this.tableE.initRowEdit(producao);
      this.clonedProducaoE[producao.id as number] = { ...producao };
  }
  
  cancelarE(producao: Canudopcp, index: number) {
      if (this.editing) {
          this.producoesE[index] = this.clonedProducaoE[producao.id as number];
          delete this.clonedProducaoE[producao.id as number];
      } else {
          this.producoesE[index] = this.clonedProducaoE[producao.id as number];
          delete this.clonedProducaoE[producao.id as number];
          this.producoesE.pop();
      }
  }
  
  salvarE(producao: any) {
    if (this.editing) {
      this.verificarQuantidadeE(producao);
      this.pcpService.atualizarCanudo(producao).then(
        (response) => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção atualizada com sucesso!'});
          delete this.clonedProducaoE[producao.id as number];
          this.atualizarStatusMaquinaE()
          this.carregarPcpE(this.idProd)
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao atualizar produção'});
          this.errorHandler.handle(error);
        }
      );
    } else {
      this.verificarQuantidadeE(producao);
      producao.maquina = this.idProd;
      this.pcpService.adicionarCanudo(producao).then(
        (response) => {
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção adicionada com sucesso!'});
          this.atualizarStatusMaquinaE()
          this.carregarPcpE(this.idProd)
        },
        (error) => {
          this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao adicionar produção'});
          this.errorHandler.handle(error);
        }
      );
    }
    this.novaProdE = new Canudopcp();
  }
  
  excluirE(id: number) {
    this.pcpService.excluirCanudo(id).then(() => {
      this.producoesE = this.producoesE.filter(producao => producao.id !== id);
      this.atualizarStatusMaquinaE();
    }).catch((erro) => {
      this.errorHandler.handle(erro);
    });
  }
  
  confirmExcluirE(event: Event, id: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Tem certeza que deseja excluir?',
        icon: 'pi pi-exclamation-triangle',
        key: 'confirmPopup',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Produçâo excluida!', life: 3000 });
            this.excluirE(id);
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
    this.pcpService.mudarProduto(this.maquina)
    this.pcpService.atualizar(producao).then(() => {
      this.carregarPcp(this.idProd)
    })
  }

  atualizarStatusE(producao: any) {
    this.atualizarStatusMaquinaE()
    this.pcpService.mudarProduto(this.maquina)
    this.pcpService.atualizarCanudo(producao).then(() => {
      this.carregarPcpE(this.idProd)
    })
  }


  atualizarHoraInicial(producao: any) {
    producao.horainicial = new Date(producao.horainicial)
    this.pcpService.atualizar(producao).then(() => {
      this.carregarPcp(this.idProd)
    })
  }

  salvarQntProduzida(producao: any) {
    this.pcpService.atualizar(producao).then(() => {
      this.carregarPcp(this.idProd)
    })
  }

  atualizarHoraInicialE(producao: any) {
    producao.horainicial = new Date(producao.horainicial)
    this.pcpService.atualizarCanudo(producao).then(() => {
      this.carregarPcpE(this.idProd)
    })
  }

  salvarQntProduzidaE(producao: any) {
    this.pcpService.atualizarCanudo(producao).then(() => {
      this.carregarPcpE(this.idProd)
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
  }

  carregarPrioridade() {
    if (this.maquina.prioridade === true) {
      this.prioridade = true;
    } else {
      this.prioridade = false;
    }
  }

  atualizarStatusMaquina() {
    if(this.producoes.find(
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

  atualizarStatusMaquinaE() {
    if(this.producoesE.find(
      producao => producao.status === 'EM PRODUÇÃO'
    )) {
      this.maquina.status = 'EM PRODUÇÃO';
    } else if (this.producoesE.find(
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
      producao.atributo && 
      (producao.unidades || producao.kilogramas) && 
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

  alternarUnidade() {
    this.unidadeAtual = this.unidadeAtual === 'Unidades' ? 'Kilogramas' : 'Unidades';
    this.unidadeatual = this.unidadeatual === 'unidades' ? 'kilogramas' : 'unidades';
  }

  alternarUnidadeE() {
    this.unidadeAtualE = this.unidadeAtualE === 'Unidades' ? 'Kilogramas' : 'Unidades';
    this.unidadeatualE = this.unidadeatualE === 'unidades' ? 'kilogramas' : 'unidades';
  }


  verificarQuantidade(producao: any) {
    if (this.unidadeAtual === 'Unidades') {
      producao.kilogramas = 0;
    } else {
      producao.unidades = 0;
    }
  }

  verificarQuantidadeE(producao: any) {
    if (this.unidadeAtualE === 'Unidades') {
      producao.kilogramas = 0;
    } else {
      producao.unidades = 0;
    }
  }

}


