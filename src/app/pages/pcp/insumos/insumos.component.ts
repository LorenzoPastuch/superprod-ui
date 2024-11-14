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

  insumos: any[];
  pigmentos: any[];
  cols: any[];
  colsPigmentos: any[];
  displayPigmentos: boolean;

  constructor(
    private insumosService: InsumosService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService,
  ) {}

  ngOnInit() {
    
    this.carregarInsumos();
    this.cols = [
      { field: 'maquina', header: 'Máquina', width: '180px', type: 'text' },
      { field: 'produto', header: 'Produto', width: '200x', type: 'text' },
      { field: 'tipo_material', header: 'Material', width: '50px', type: 'text' },
      { field: 'total_qnt_material', header: 'Quantidade', width: '250px', type: 'numeric' },
      { field: 'total_embalagens', header: 'Embalagens', width: '250px', type: 'numeric' },
      { field: 'tipo_embalagem', header: 'Quantidade', width: '250px', type: 'text' },
      { field: 'total_caixas', header: 'Caixas', width: '250px', type: 'numeric' },
      { field: 'pigmento', header: 'Pigmentos', width: '150px', type: 'numeric' },
    ];

    this.colsPigmentos = [
    {field: 'cor', header: 'Cor',  type: 'text'},
    {field: 'quantidade', header: 'Quantidade',  type: 'numeric'},
    ]

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

  showPigmentos(maquina: number) {
    this.pigmentos = this.insumos.find(item => item.maquina === maquina).pigmentos;
    this.displayPigmentos = true;
  }
}
