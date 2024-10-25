import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

import { Empresas } from 'src/app/core/models/empresas.model';
import { EmpresaService } from '../../empresa.service';
import { AuthService } from 'src/app/pages/seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-empresa-lista',
  templateUrl: './empresa-lista.component.html',
  styleUrls: ['./empresa-lista.component.css']
})
export class EmpresaListaComponent implements OnInit {
  @ViewChild('tabela') table: Table;

  empresa = new Empresas();
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  status = 'Ativo';
  sinal = true;
  empresas: Empresas[];
  cols = [];
  selectedEmpresa: Empresas;
  selectionCols: Empresas;
  items: MenuItem[];
  _selectedColumns = [];
  valorTooltip = 'Inativos';
  dialogColunas: boolean;
  yearFilter: Date;
  brands: any[];
  colors: any[];
  noRecords = true;

  constructor(
    private empresaService: EmpresaService,
    private title: Title,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private spinner: NgxSpinnerService
  ) { }

  onClear() {
    this.table.clear();
    this.refresh();
  }


  ngOnInit() {
    this.title.setTitle('Empresas');
    this.carregarEmpresas();

    this.items = [
      {
        label: 'Ativo / Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        },
      }
    ];
    this.brands = [

    ];
    this.colors = [];
    this.cols = [
      // { field: 'id', header: 'Código', width: '115px', type: 'text' },
      { field: 'cnpj', header: 'CNPJ', width: '200px', type: 'text' },
      { field: 'razaosocial', header: 'Empresa', width: '250px', type: 'text' },
      { field: 'cidade', header: 'Cidade', width: '150px', type: 'text' },
      { field: 'uf', header: 'Estado', width: '130px', type: 'text' },
      { field: 'nomecontato', header: 'Nome Contato', width: '200px', type: 'text' },
      { field: 'telefone', header: 'Telefone', width: '200px', type: 'text' },
      { field: 'whats', header: 'WhatsApp', width: '200px', type: 'text' },
      { field: 'status', header: 'Status', width: '107px', type: 'text', status: true },
    ];
  }

  refresh() {
    this.carregarEmpresas();
  }

  carregarEmpresas() {
    this.spinner.show();
    this.empresaService.listar().then((obj) => {
      this.empresas = obj;
      if (this.empresas.length > 0) {
        this.noRecords = true;
      }
      else {
        this.noRecords = false;
      }
      this.spinner.hide();
    })
      .catch((erro) => {
        this.errorHandler.handle(erro);
        this.spinner.hide();
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
    this.empresaService
      .AlternarLista(valor)
      .then((empresa) => {
        (this.empresas = empresa);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro)
      });
  }

}
