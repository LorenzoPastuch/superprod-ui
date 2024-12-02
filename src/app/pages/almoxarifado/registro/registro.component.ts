import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from '../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidationService } from 'src/app/core/service/validation.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AlmoxarifadoService } from '../almoxarifado.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class AlmoxarifadoRegistroComponent implements OnInit {
  @ViewChild('tabela') table: Table;
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  registros = [];
  cols: any[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  sinal = true;
  valorTooltip = 'Inativos';


  constructor(
    private almoxarifadoService: AlmoxarifadoService,
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
        label: 'Exportado/Não exportado',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        }
      }
    ]
    this.carregarRegistros();

    this.cols = [
        { field: 'datagravacao', header: 'Data Gravação', width: '100px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date', key: 9 },
        { field: 'classe', header: 'Classe', width: '150px', type: 'text', key: 2 },
        { field: 'nome', header: 'Nome', width: '150px', type: 'text', key: 3 },
        { field: 'quantidade', header: 'Quantidade', width: '150px', type: 'text', key: 4 },
        { field: 'codigowms', header: 'Codigo WMS', width: '150px', type: 'text', key: 4 },
        { field: 'tipo_movimentacao', header: 'Movimentação', width: '150px', type: 'text', key: 19 },
        { field: 'usuariogravacao', header: 'Usuário Gravação', width: '150px', type: 'text', key: 10 },
    ]
  }

  carregarRegistros() {
    this.spinner.show();
    this.almoxarifadoService.listarRegistros()
      .then((obj) => {
        this.registros = obj;
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  atualizarStatus(registro) {
    this.almoxarifadoService.atualizar(registro)
  }

  AlternarLista() {
    this.spinner.show();
    const valor = this.sinal ? '/exportados' : '/naoexportados';
    if (this.sinal === true) {
      this.valorTooltip = 'Exportados';
      this.sinal = false;
    } else {
      this.valorTooltip = 'Não exportados';
      this.sinal = true;
    }
    this.almoxarifadoService.AlternarLista(valor)
      .then((obj) => {
        this.registros = obj;
        this.registros = this.validationService.formataAtivoeInativo(this.registros);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  refresh() {
    this.carregarRegistros();
  }

  onClear() {
    this.table.clear();
  }
}
