import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { FuncionarioService } from '../funcionario.service';
import { AuthService } from '../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { ValidationService } from 'src/app/core/service/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-funcionario-listar',
  templateUrl: './funcionario-listar.component.html',
  styleUrls: ['./funcionario-listar.component.css']
})
export class FuncionarioListarComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  funcionarios = [];
  cols: any[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  sinal = true;
  valorTooltip = 'Inativos';

  constructor(
    private funcionarioService: FuncionarioService,
    public auth: AuthService,
    private title: Title,
    private spinner: NgxSpinnerService,
    private validationService: ValidationService,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit() {

    this.title.setTitle('Lista de Funcionários');
    this.items = [
      {
        label: 'Ativo/Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        }
      }
    ]
    this.carregarFuncionarios();

    this.cols = [
      { field: 'id', header: 'Código', width: '100px', type: 'numeric', key: 1 },
      { field: 'nome', header: 'Nome', width: '150px', type: 'text', key: 2 },
      { field: 'funcao', header: 'Função', width: '150px', type: 'text', key: 3 },
      { field: 'datagravacao', header: 'Data Gravação', width: '100px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date', key: 4 },
      { field: 'loginusuario', header: 'Usuário Gravação', width: '150px', type: 'text', key: 5 },
      { field: 'statusformatado', header: 'Status', width: '150px', type: 'text', key: 6 }
    ]

  }

  carregarFuncionarios() {
    this.spinner.show();
    this.funcionarioService.listar()
      .then((obj) => {
        this.funcionarios = obj;
        this.funcionarios = this.validationService.formataAtivoeInativo(this.funcionarios);
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
    this.funcionarioService.AlternarLista(valor)
      .then((obj) => {
        this.funcionarios = obj;
        this.funcionarios = this.validationService.formataAtivoeInativo(this.funcionarios);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  refresh() {
    this.carregarFuncionarios();
  }

  onClear() {
    this.table.clear();
  }


}
