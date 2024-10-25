import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from '../../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidationService } from 'src/app/core/service/validation.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit {
  @ViewChild('tabela') table: Table;
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200, 500];
  produtos = [];
  cols: any[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  sinal = true;
  valorTooltip = 'Inativos';


  constructor(
    private produtoService: ProdutoService,
    public auth: AuthService,
    private title: Title,
    private spinner: NgxSpinnerService,
    private validationService: ValidationService,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Lista de Produto');
    this.items = [
      {
        label: 'Ativo/Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        }
      }
    ]
    this.carregarProduto();

    this.cols = [
      { field: 'id', header: 'Código', width: '100px', type: 'numeric', key: 1 },
      { field: 'nome', header: 'Nome', width: '150px', type: 'text', key: 2 },
      { field: 'sku', header: 'SKU', width: '150px', type: 'text', key: 3 },
      { field: 'peso', header: 'Peso (Kg)', width: '150px', type: 'numeric', key: 4 },
      { field: 'datagravacao', header: 'Data Gravação', width: '100px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date', key: 5 },
      { field: 'usuariogravacao', header: 'Usuário Gravação', width: '150px', type: 'text', key: 6 },
      { field: 'statusformatado', header: 'Status', width: '150px', type: 'text', key: 7 }
    ]
  }

  carregarProduto() {
    this.spinner.show();
    this.produtoService.listarProdutos()
      .then((obj) => {
        this.produtos = obj;
        this.produtos = this.validationService.formataAtivoeInativo(this.produtos);
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
    this.produtoService.AlternarLista(valor)
      .then((obj) => {
        this.produtos = obj;
        this.produtos = this.validationService.formataAtivoeInativo(this.produtos);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  refresh() {
    this.carregarProduto();
  }

  onClear() {
    this.table.clear();
  }

}
