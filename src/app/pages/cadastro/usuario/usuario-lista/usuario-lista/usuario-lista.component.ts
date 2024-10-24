import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { UsuarioService } from '../../usuario.service';
import { AuthService } from 'src/app/pages/seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ValidationService } from 'src/app/core/service/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {

  @ViewChild('tabela') table: Table;

  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  cols: any[];
  sinal = true;
  status = 'Ativo';
  usuariosUrl: string;
  usuarios = [];
  usuario: Usuarios;
  _selectedColumns: any[];
  selectionCols: Usuarios;
  tabela: any;
  display: boolean;
  valorTooltip = 'Inativos';
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];

  idUser: number;

  showDialog() {
    this.display = true;
  }

  constructor(
    private title: Title,
    private userService: UsuarioService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private errorHandler: ErrorHandlerService,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  onClear() {
    this.table.clear();
  }

  refresh() {
    this.carregarUsers();
  }

  ngOnInit() {
    this.conf.ripple = true;
    this.title.setTitle('Usuários');
    this.carregarUsers();

    this.items = [
      {
        label: 'Ativo / Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        },
      }
    ];

    this.cols = [
      { field: 'id', header: 'Código', width: '130px', type: 'numeric' },
      { field: 'nome', header: 'Nome', width: '200px' , type: 'text'},
      { field: 'datagravacao', header: 'Data Alteração', width: '200px', type: 'date', data: true, format: `dd/MM/yyyy H:mm` },
      { field: 'username', header: 'Login', width: '300px', type: 'text' },
      { field: 'statusformatado', header: 'Status', width: '100px', type: 'text' }
    ];
    this._selectedColumns = this.cols;
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  carregarUsers() {
    this.spinner.show();
    this.userService.listarUsuarios()
      .then(user => {
        this.usuarios = user;
        this.usuarios = this.validationService.formataAtivoeInativo(this.usuarios);
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
    this.userService.AlternarLista(valor)
      .then(obj => {
        this.usuarios = obj
        this.usuarios = this.validationService.formataAtivoeInativo(this.usuarios);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  resetSenha(idUser: number) {
    this.idUser = this.route.snapshot.params['id'];
    this.userService
      .resetSenha(idUser)
      .then((usuario) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Senha',
          detail: `Resetada com sucesso!`,
        });
        this.router.navigate(['/usuarios']);
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }



}
