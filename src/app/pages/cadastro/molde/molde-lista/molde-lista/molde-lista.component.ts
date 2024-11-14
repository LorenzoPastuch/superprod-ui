import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { MoldeService } from '../../molde.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidationService } from 'src/app/core/service/validation.service';
import { AuthService } from 'src/app/pages/seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FiltrosMolde } from 'src/app/core/models/filtro.model';

@Component({
  selector: 'app-molde-lista',
  templateUrl: './molde-lista.component.html',
  styleUrls: ['./molde-lista.component.css']
})
export class MoldeListaComponent implements OnInit {


  @ViewChild('tabela') table: Table;
  
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  moldes = [];
  cols: any[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  sinal = true;
  valorTooltip = 'Inativos';


  filtro = new FiltrosMolde();

  constructor(
    public auth: AuthService,
    private title: Title,
    private moldeService: MoldeService,
    private spinner: NgxSpinnerService,
    private validationService: ValidationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Moldes');
    this.carregarConvenios();
    this.items = [
      {
        label: 'Ativo / Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        }
      }
    ]

    this.cols = [
      { field: 'fabricante', header: 'Fabricante', width: '200px', type: 'text', key: 1 },
      { field: 'nome', header: 'Nome', width: '200px', type: 'text', key: 2 },
      { field: 'ciclo', header: 'Ciclo', width: '50px', type: 'text', key: 3 },
      { field: 'cavidades', header: 'Cavidades', width: '50px', type: 'text', key: 4 },
      { field: 'pesogalho', header: 'Peso do galho', width: '50px', type: 'text', key: 4 },
      { field: 'datagravacao', header: 'Data Gravação', width: '100px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date', key: 5 },
      { field: 'usuariogravacao', header: 'Usuário Gravação', width: '150px', type: 'text', key: 6 },
      { field: 'statusformatado', header: 'Status', width: '150px', type: 'text', key: 7 }
    ]

  }

  filtroDefault() {
    this.filtro.pagina = 0;
    this.filtro.itensPorPagina = 10;
    this.filtro.status = 'Ativos';
  }


  changePage(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.filtro.itensPorPagina = event?.rows;
    this.carregarConvenios();
  }

  carregarConvenios() {
    this.spinner.show();
    this.moldeService.listarMoldes()
      .then((obj) => {
        // Ajuste as datas aqui
        this.moldes = obj.map((molde: any) => {
          if (molde.datagravacao) {
            let date = new Date(molde.datagravacao);
            date.setHours(date.getHours() - 3);
            molde.datagravacao = date.toISOString(); // Ou use outro formato conforme necessário
          }
          return molde;
        });
        this.moldes = this.validationService.formataAtivoeInativo(this.moldes);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }
  

  // AlternarLista() {
  //   if (this.filtro.status === 'Ativos') {
  //     this.filtro.status = 'Inativos';
  //   } else {
  //     this.filtro.status = 'Ativos';
  //   }
  //   this.carregarConvenios();
  // }

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
    this.moldeService.AlternarLista(valor)
      .then((obj) => {
        this.moldes = obj;
        this.moldes = this.validationService.formataAtivoeInativo(this.moldes);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  refresh() {
    this.carregarConvenios();
  }
  onClear() {
    this.table.clear();
  }

}
