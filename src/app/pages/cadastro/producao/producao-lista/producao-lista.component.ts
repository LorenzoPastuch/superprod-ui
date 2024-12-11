import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FilterService, LazyLoadEvent, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Regex } from 'src/app/core/validators/regex';
import { AuthService } from '../../../seguranca/auth.service';
import { ValidationService } from 'src/app/core/service/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProducaoService } from '../producao.service';
import { Producao } from 'src/app/core/models/producao.model';
import { FiltroProducaoService } from 'src/app/core/service/filtros/filtroproducao.service';

@Component({
  selector: 'app-producao-lista',
  templateUrl: './producao-lista.component.html',
  styleUrls: ['./producao-lista.component.css']
})
export class ProducaoListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef;

  rowsPerPageTable: number[] = [25, 50, 100, 200, 500];
  producoes: any[];
  cols: any[];
  selectedColumns: any[];
  colsItens = [];
  sinal: string = '/ativos';
  messageDrop = 'Nenhum resultado encontrado...';
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  selectedProducao: any;
  totalRegistros: any;
  totalPages: any;
  pagina: number = 1;
  itensPorPagina: number = 25;
  timeout: any;
  dataprevisaode: string;
  dataprevisaoate: string;
  dataproducaode: string;
  dataproducaoate: string;
  blockBtnFilter = false;
  detalhes = new Producao();
  displayDetalhes: boolean;
  detalhesProd: any[];
  filtros: any = {};
  parametros: any;


  constructor(
    private producaoService: ProducaoService,
    private filtroproducaoService: FiltroProducaoService,
    private title: Title,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService,
  ) { }


  onClear() {
    this.table.clear();
  }

  ngOnInit() {
    // this.filtroDefault();
    this.conf.ripple = true;
    this.title.setTitle('Produção');
    this.items = [
      {
        label: 'Ativo / Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        },
      }
    ];
    this.carregarProducao();

    this.cols = [
      { field: 'data', header: 'Data Produção', width: '180px', data: true,  format: `dd/MM/yyyy`, type: 'date', order: 1 },
      { field: 'nomemaquina', header: 'Máquina', width: '150px', type:'text', order: 4 },
      { field: 'nomeproduto', header: 'Produto', width: '330px', type: 'text', order: 5 },
      { field: 'nomeatributo', header: 'Atributo', width: '250px', type: 'text', order: 6 },
      { field: 'quantidade', header: 'Quantidade', width: '150px', type: 'numeric', order: 7 },
      { field: 'lote', header: 'Lote', width: '110px', type: 'text', order: 12 },
      { field: 'usuariogravacao', header: 'Usuário', width: '130px', type: 'text', order: 16},
      { field: 'datagravacao', header: 'Data Sistema', width: '170px', data: true, format: `dd/MM/yyyy HH:mm`, type: 'date', order: 17 },
      { field: 'statusformatado', header: 'Status', width: '120px', type: 'text', order: 18}
    ];

    this.detalhesProd = [
      { field: 'data', header: 'Data Produção', width: '180px', data: true, format: `dd/MM/yyyy`, type: 'date', order: 1 },
      { field: 'horainicial', header: 'Início', width: '130px', order: 2 },
      { field: 'horafinal', header: 'Término', type:'text', width: '130px', order: 3 },
      { field: 'nomemaquina', header: 'Máquina', type:'text', width: '130px', order: 4 },
      { field: 'nomeproduto', header: 'Produto', type:'text', width: '330px', order: 5 },
      { field: 'nomeatributo', header: 'Atributo', width: '250px', order: 6 },
      { field: 'atributo_2', header: 'Atributo 2', width: '250px', order: 7 },
      { field: 'quantidade', header: 'Quantidade', width: '150px', order: 8 },
      { field: 'perda', header: 'Perda(Kg)', width: '140px', order: 9 },
      { field: 'motivoperda', header: 'Motivo de perda', width: '250px', order: 10 },
      { field: 'trocacor', header: 'Troca de cor (Kg)', width: '200px', order: 11 },
      { field: 'ciclo', header: 'Ciclo', width: '110px', order: 12 },
      { field: 'lote', header: 'Lote', type:'text', width: '100px', order: 13 },
      { field: 'nomeoperador', header: 'Operador', type:'text', width: '250px', order: 14 },
      { field: 'nomeembalador', header: 'Embalador', type:'text', width: '270px', order: 15 },
      { field: 'observacao', header: 'Observação', width: '160px', order: 16 },
      { field: 'usuariogravacao', header: 'Usuário', type:'text', width: '130px', order: 17 },
      { field: 'datagravacao', header: 'Data Sistema', width: '170px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date', order: 18 },
      { field: 'statusformatado', header: 'Status', width: '120px', type: 'text', order: 19}
    ];
    
    this.selectedColumns = this.cols;
  }

  changePage(event: LazyLoadEvent) {
    this.pagina = event.first / event.rows +1;
    this.itensPorPagina = event.rows;
    this.carregarProducao();
  }

  refresh() {
    this.carregarProducao();
  }

  // globalFilter(table: Table, event: any) {
  //   table.filterGlobal(event.target.value, 'contains');
  // }

  carregarProducao() {
    this.spinner.show();
    if(this.filtros) {
      this.parametros = this.filtroproducaoService.Parametros(this.filtros);
    }
    this.producaoService.listarProducao(this.sinal, this.parametros, this.pagina, this.itensPorPagina)
      .then(obj => {
        this.producoes = obj.items;
        this.producoes = this.producoes.map(producao => {
          return {
            ...producao,
            nomemaquina: producao.maquina?.nome + " " + producao.maquina.numero,
            nomeproduto: producao.produto?.nome,
            nomeatributo: producao.atributo.nome,
            nomeoperador: producao.operador.nome,
            nomeembalador: producao.embalador.nome,
            data: new Date(producao.data),
            datagravacao: new Date(producao.datagravacao)
          };
        });
        this.producoes = this.validationService.formataAtivoeInativo(this.producoes);
        this.totalRegistros = obj.totalItems;
        this.totalPages = Math.ceil(this.totalRegistros / this.itensPorPagina); 

        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  onLazyLoad(event: LazyLoadEvent) {
    // Atualiza a página e itens por página
    this.pagina = (event.first ?? 0) / (event.rows ?? this.itensPorPagina) + 1;
    this.itensPorPagina = event.rows ?? this.itensPorPagina;

    // Atualiza os filtros
    this.filtros = event.filters || {};
    console.log(this.filtros)
    this.carregarProducao();
  }

  AlternarLista() {
    this.spinner.show();
    if (this.sinal === '/ativos') {
      this.sinal = '/inativos';
    } else {
      this.sinal = '/ativos';
    }
    this.carregarProducao()
  }

  showDetalhes(id: number) {
    this.producaoService.buscarPorId(id)
      .then(producao => {
        this.detalhes =  {
          ...producao, 
          nomemaquina: producao.maquina?.nome + " " + producao.maquina.numero,
          nomeproduto: producao.produto?.nome,
          nomeatributo: producao.atributo?.nome,
          nomeoperador: producao.operador?.nome,
          nomeembalador: producao.embalador?.nome,
        };
      });
    this.displayDetalhes = true;
  }

  reorderColumns() {
    this.selectedColumns = [...this.selectedColumns];  // Forçar uma mudança de referência
    this.selectedColumns.sort((a, b) => a.order - b.order);  // Ordenar as colunas com base no 'order'
  }

}

