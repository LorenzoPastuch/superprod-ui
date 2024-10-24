import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from '../../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidationService } from 'src/app/core/service/validation.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AtributoService } from '../atributo.service';

@Component({
  selector: 'app-listar-atributo',
  templateUrl: './listar-atributo.component.html',
  styleUrls: ['./listar-atributo.component.css']
})
export class ListarAtributoComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  atributos = [];
  cols: any[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  sinal = true;
  valorTooltip = 'Inativos';

  constructor(
    public auth: AuthService,
    private title: Title,
    private spinner: NgxSpinnerService,
    private validationService: ValidationService,
    private erroHandler: ErrorHandlerService,
    private atributoService: AtributoService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Atributos');
    this.items = [
      {
        label: 'Ativo/Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        }
      }
    ]
    this.carregarAtributos();

    this.cols = [
      { field: 'id', header: 'Código', width: '100px', type: 'numeric', key: 1 },
      { field: 'nome', header: 'Nome', width: '150px', type: 'text', key: 2 },
      { field: 'datagravacao', header: 'Data Gravação', width: '100px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date', key: 4 },
      { field: 'loginusuario', header: 'Usuário Gravação', width: '150px', type: 'text', key: 5 },
      { field: 'statusformatado', header: 'Status', width: '150px', type: 'text', key: 6 }
    ]
  }

  carregarAtributos() {
    this.spinner.show();
    this.atributoService.listar()
      .then((obj) => {
        this.atributos = obj;
        this.atributos = this.validationService.formataAtivoeInativo(this.atributos);
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
    this.atributoService.AlternarLista(valor)
      .then((obj) => {
        this.atributos = obj;
        this.atributos = this.validationService.formataAtivoeInativo(this.atributos);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  refresh() {
    this.carregarAtributos();
  }

  onClear() {
    this.table.clear();
  }
}
