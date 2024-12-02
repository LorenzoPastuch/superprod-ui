import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FilterService, LazyLoadEvent, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FiltrosProducao } from 'src/app/core/models/filtro.model';
import { Regex } from 'src/app/core/validators/regex';
import { AuthService } from '../../../seguranca/auth.service';
import { ValidationService } from 'src/app/core/service/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProducaoService } from '../producao.service';
import { FiltroproducaoService } from 'src/app/core/service/filtros/filtroproducao.service';
import { Producao } from 'src/app/core/models/producao.model';

@Component({
  selector: 'app-producao-lista',
  templateUrl: './producao-lista.component.html',
  styleUrls: ['./producao-lista.component.css']
})
export class ProducaoListaComponent implements OnInit {

  // @ViewChild('tabela', { static: true }) table: Table;
  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef;

  regex = new Regex();
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  rangeDates: Date[];
  producoes: any[];
  cols: any[];
  colsItens = [];
  sinal = true;
  totalExames: number;
  atendimento: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  restoringFilter: boolean;
  messageDrop = 'Nenhum resultado encontrado...';
  valorTooltip = 'Inativos';
  displayExames: boolean;
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  selectedProducao: any;
  rangeDatesFiltroDataprivicao: Date[];
  rangeDatesFiltroDataproducao: Date[];
  rangeDatesFiltroGravacao: Date[];
  totalRegistros = 0;
  totalPages = 0;
  first = 1;
  filtro = new FiltrosProducao();
  timeout: any;
  dataprevisaode: string;
  dataprevisaoate: string;
  dataproducaode: string;
  dataproducaoate: string;
  blockBtnFilter = false;
  detalhes = new Producao();
  displayDetalhes: boolean;
  detalhesProd: any[];


  constructor(
    private producaoService: ProducaoService,
    private title: Title,
    // private relatoriosService: RelatoriosService,
    private errorHandler: ErrorHandlerService,
    private filterService: FilterService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService,
    private filtroProducao: FiltroproducaoService,
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
      { field: 'data', header: 'Data Produção', width: '180px', data: true,  format: `dd/MM/yyyy`, type: 'date' },
      { field: 'numeromaquina', header: 'Máquina', width: '130px', type: 'numeric' },
      { field: 'nomeproduto', header: 'Produto', width: '330px', type: 'text' },
      { field: 'nomeatributo', header: 'Atributo', width: '250px', type: 'text' },
      { field: 'quantidade', header: 'Quantidade', width: '150px', type: 'numeric' },
      { field: 'lote', header: 'Lote', width: '110px', type: 'text' },
      { field: 'usuariogravacao', header: 'Usuário', width: '130px', type: 'text' },
      { field: 'datagravacao', header: 'Data Sistema', width: '170px', data: true, format: `dd/MM/yyyy HH:mm`, type: 'date' },
      { field: 'statusformatado', header: 'Status', width: '120px', type: 'text'}
    ];

    this.detalhesProd = [
      { value: 'data', label: 'Data Produção', data: true, format: `dd/MM/yyyy`, type: 'date' },
      { value: 'horainicial', label: 'Hora de Início' },
      { value: 'horafinal', label: 'Hora Final' },
      { value: 'numeromaquina', label: 'Máquina' },
      { value: 'nomeproduto', label: 'Produto' },
      { value: 'nomeatributo', label: 'Atributo' },
      { value: 'quantidade', label: 'Quantidade' },
      { value: 'perda', label: 'Perda (Kg)' },
      { value: 'motivoperda', label: 'Motivo de perda' },
      { value: 'ciclo', label: 'Ciclo' },
      { value: 'lote', label: 'Lote' },
      { value: 'nomeoperador', label: 'Operador' },
      { value: 'nomeembalador', label: 'Embalador' },
      { value: 'observacao', label: 'Observação' },
      { value: 'usuariogravacao', label: 'Usuário'},
      { value: 'datagravacao', label: 'Data Sistema', data: true, format: `dd/MM/yyyy H:mm`, type: 'date'  },
    ];
  }

  // filtroDefault() {
  //   this.filtro.pagina = 0;
  //   this.filtro.itensPorPagina = 10;
  //   this.filtro.status = 'Ativos';
  // }

  changePage(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.filtro.itensPorPagina = event?.rows;
    this.carregarProducao();
  }

  refresh() {
    this.carregarProducao();
  }

  carregarProducao() {
    this.spinner.show();
    this.producaoService.listarProducao()
      .then(obj => {
        this.producoes = obj;
        this.producoes = this.producoes.map(producao => {
          return {
            ...producao, 
            numeromaquina: producao.maquina?.numero,
            nomeproduto: producao.produto?.nome,
            nomeatributo: producao.atributo.nome,
            data: new Date(producao.data),
            datagravacao: new Date(producao.datagravacao) 
          };
        });
        this.producoes = this.validationService.formataAtivoeInativo(this.producoes);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      }); 
  }

  AlternarLista() {
    this.spinner.show();
    const valor = this.sinal ? '/inativos' : '/ativos';
    if (this.sinal === true) {
      this.valorTooltip = 'Ativos';
      this.sinal = false;
    } else {
      this.valorTooltip = 'Inativos';
      this.sinal = true;
    }
    this.producaoService.AlternarLista(valor)
      .then((obj) => {
        this.producoes = obj;
        this.producoes = this.producoes.map(producao => {
          return {
            ...producao, 
            numeromaquina: producao.maquina?.numero,
            nomeproduto: producao.produto?.nome,
            nomeatributo: producao.atributo.nome,
            data: new Date(producao.data),
            datagravacao: new Date(producao.datagravacao) 
          };
        });
        this.producoes = this.validationService.formataAtivoeInativo(this.producoes);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  search(value: any) {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => {
      this.applySearch(value);
    }, 800);
  }

  applySearch(value: any) {
    this.blockBtnFilter = true;
    if (
      value.qty === null ||
      value.qty === undefined
    ) {
      this.btnBlock();
    } else {
      this.filtroProducao.filtro(value, this.filtro).then((obj) => {
        this.filtro = obj;
        this.carregarProducao();
        this.FirstPage();
        this.btnBlock();
      }).catch((erro) => {
        this.spinner.hide();
        this.btnBlock();
        this.errorHandler.handle(erro);
      });
    }
  }

  FirstPage() {
    this.paginator.changePage(0);
  }

  verifyFocus() {
    this.buttonFilter.nativeElement.focus();
  }

  btnBlock() {
    setTimeout(() => {
      this.blockBtnFilter = false;
    }, 680);
  }

  showDetalhes(id: number) {
    this.producaoService.buscarPorId(id)
      .then(producao => {
        this.detalhes =  {
          ...producao, 
          numeromaquina: producao.maquina?.numero,
          nomeproduto: producao.produto?.nome,
          nomeatributo: producao.atributo?.nome,
          nomeoperador: producao.operador?.nome,
          nomeembalador: producao.embalador?.nome,
        };
      });
    this.displayDetalhes = true;
  }
}

