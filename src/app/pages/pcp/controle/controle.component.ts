import { Component, OnInit, ViewChild } from '@angular/core';
import { PcpService } from '../pcp.service';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';



@Component({
  selector: 'app-pcp-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class PcpControleComponent implements OnInit {
  @ViewChild('tabela') table: Table;
  maquinas = [];
  producao = [];
  combinado = [];
  cols: any[];

  constructor(
    private pcpService: PcpService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService,
  ) {}

  ngOnInit() {
    this.carregarMaquinas();

    this.cols = [
      { field: 'maquina', header: 'Máquina', width: '180px', type: 'text' },
      { field: 'produto', header: 'Produto', width: '130px', type: 'text' },
      { field: 'atributo', header: 'Atributo', width: '330px', type: 'text' },
      { field: 'status', header: 'Status', width: '250px', type: 'text' },
      // { field: 'quantidade', header: 'Quantidade', width: '150px', type: 'numeric' },
      // { field: 'lote', header: 'Lote', width: '110px', type: 'text' },
      // { field: 'loginusuario', header: 'Usuário', width: '130px', type: 'text' },
      // { field: 'datagravacao', header: 'Data Sistema', width: '170px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date' },
      // { field: 'statusformatado', header: 'Status', width: '120px', type: 'text'}
    ];
  }

  carregarMaquinas(){
    this.spinner.show();
    this.pcpService.listarMaquinas()
    .then(obj => {
      this.maquinas = obj;
    })
    .catch((erro) => {
      this.spinner.hide();
      this.errorHandler.handle(erro);
    });
    this.spinner.hide();
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'EM PRODUÇÃO':
        return 'success';
      case 'TROCA DE MOLDE':
        return 'info';
      case 'PARADA':
        return 'danger';
    }
  }
}
