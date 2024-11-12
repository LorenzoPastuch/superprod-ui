import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from '../../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidationService } from 'src/app/core/service/validation.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { InsumoService } from '../insumo.service';

@Component({
  selector: 'app-insumo-lista',
  templateUrl: './insumo-lista.component.html',
  styleUrls: ['./insumo-lista.component.css']
})
export class InsumoListaComponent implements OnInit {
  @ViewChild('tabela') table: Table;
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  insumos = [];
  cols: any[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  sinal = true;
  valorTooltip = 'Inativos';


  constructor(
    private insumoService: InsumoService,
    public auth: AuthService,
    private title: Title,
    private spinner: NgxSpinnerService,
    private validationService: ValidationService,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Insumo');
    this.items = [
      {
        label: 'Ativo/Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        }
      }
    ]
    this.carregarInsumo();

    this.cols = [
      { field: 'classe', header: 'Classe', width: '150px', type: 'text', key: 4 },
      { field: 'nome', header: 'Nome', width: '150px', type: 'text', key: 2 },
      { field: 'codigo', header: 'Código', width: '150px', type: 'text', key: 3 },
      { field: 'codigowms', header: 'Codigo WMS', width: '150px', type: 'text', key: 4 },
      { field: 'datagravacao', header: 'Data Gravação', width: '100px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date', key: 9 },
      { field: 'usuariogravacao', header: 'Usuário Gravação', width: '150px', type: 'text', key: 10 },
      { field: 'statusformatado', header: 'Status', width: '150px', type: 'text', key: 11 }
    ]
  }

  carregarInsumo() {
    this.spinner.show();
    this.insumoService.listarInsumos()
      .then((obj) => {
        this.insumos = obj;
        this.insumos = this.validationService.formataAtivoeInativo(this.insumos);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
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
    this.insumoService.AlternarLista(valor)
      .then((obj) => {
        this.insumos = obj;
        this.insumos = this.validationService.formataAtivoeInativo(this.insumos);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  refresh() {
    this.carregarInsumo();
  }

  onClear() {
    this.table.clear();
  }

}
