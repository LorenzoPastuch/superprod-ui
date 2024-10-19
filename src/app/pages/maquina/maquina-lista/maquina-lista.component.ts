import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { MaquinaService } from '../maquina.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidationService } from 'src/app/core/service/validation.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';
import { MoldeMaquina } from 'src/app/core/models/moldeMaquina.model';

@Component({
  selector: 'app-maquina-lista',
  templateUrl: './maquina-lista.component.html',
  styleUrls: ['./maquina-lista.component.css']
})
export class MaquinaListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  maquinas = [];
  cols: any[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  sinal = true;
  valorTooltip = 'Inativos';

  colsMol = [];


  itensMoldes = new Array<MoldeMaquina>();

  displayMolde: boolean;



  constructor(
    public auth: AuthService,
    private title: Title,
    private maquinaService: MaquinaService,
    private spinner: NgxSpinnerService,
    private validationService: ValidationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Máquinas');
    this.items = [
      {
        label: 'Ativo/Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        }
      }
    ]
    this.carregarMaquinas();

    this.cols = [
      { field: 'id', header: 'Código', width: '100px', type: 'numeric'},
      { field: 'nome', header: 'Nome', width: '150px', type: 'text' },
      { field: 'peso', header: 'Peso', width: '30px', type: 'text' },
      { field: 'numero', header: 'Numero da Maquina', width: '20px', type: 'numeric' },
      { field: 'datagravacao', header: 'Data Gravação', width: '100px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date' },
      { field: 'loginusuario', header: 'Usuário Gravação', width: '150px', type: 'text' },
      { field: 'statusformatado', header: 'Status', width: '150px', type: 'text' }
    ],

    this.colsMol = [
      {field: 'idmolde', header: 'Código',  type: 'numeric'},
      {field: 'descricaomolde', header: 'Molde',  type: 'text'},
    ]
  }

  carregarMaquinas() {
    this.spinner.show();
    this.maquinaService.listarMaquina()
      .then((obj) => {
        this.maquinas = obj;
        this.maquinas = this.validationService.formataAtivoeInativo(this.maquinas);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
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
    this.maquinaService.AlternarLista(valor)
      .then((obj) => {
        this.maquinas = obj;
        this.maquinas = this.validationService.formataAtivoeInativo(this.maquinas);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        // this.erroHandler.handle(erro);
      })
  }

  refresh(){
    this.carregarMaquinas();
  }

  onClear(){
    this.table.clear();
  }



  showMoldes(id: number) {
    this.maquinaService.listarMoldeMaquina(id)

      .then(obj => {
        this.itensMoldes = obj;
      });
    this.displayMolde = true;
  }

}
