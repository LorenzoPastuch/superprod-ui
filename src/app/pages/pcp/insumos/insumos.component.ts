import { Component, OnInit, ViewChild } from '@angular/core';
import { InsumosService } from '../insumos/insumos.service';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';



@Component({
  selector: 'app-pcp-controle',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class PcpInsumosComponent implements OnInit {
  @ViewChild('tabela') table: Table;

  insumos: [];
  cols: any[];

  constructor(
    private insumosService: InsumosService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService,
  ) {}

  ngOnInit() {
    
    this.carregarInsumos();
    this.cols = [
      { field: 'maquina', header: 'Máquina', width: '180px', type: 'text' },
      { field: 'produto', header: 'Produto', width: '130px', type: 'text' },
      { field: 'tipo_material', header: 'Material', width: '330px', type: 'text' },
      { field: 'total_qnt_material', header: 'Quantidade', width: '250px', type: 'numeric' },
      { field: 'total_caixas', header: 'Caixas', width: '250px', type: 'numeric' },
      { field: 'pigmento', header: 'Pigmento', width: '150px', type: 'numeric' },
      // { field: 'lote', header: 'Lote', width: '110px', type: 'text' },
      // { field: 'loginusuario', header: 'Usuário', width: '130px', type: 'text' },
      // { field: 'datagravacao', header: 'Data Sistema', width: '170px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date' },
      // { field: 'statusformatado', header: 'Status', width: '120px', type: 'text'}
    ];
  }

  carregarInsumos() {
    this.spinner.show();
    this.insumosService.listarInsumos()
    .then(obj => {
        this.insumos = obj;
    })
    .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
    });
    this.spinner.hide()
  }

}
