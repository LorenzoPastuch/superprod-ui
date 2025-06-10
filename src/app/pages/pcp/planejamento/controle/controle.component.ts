import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PcpService } from '../planejamento.service';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/core/service/websocket.service';



@Component({
  selector: 'app-pcp-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class PcpControleComponent implements OnInit, OnDestroy {
  @ViewChild('tabela') table: Table;
  maquinas = [];
  producao = [];
  combinado = [];
  cols: any[];
  private subscription!: Subscription;

  constructor(
    private pcpService: PcpService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService,
    private webSocketService: WebSocketService,
  ) {}

  ngOnInit() {
    this.carregarMaquinas();
    this.subscription = this.webSocketService.connect().subscribe((data: any) => {
      const maquinaIndex = this.maquinas.findIndex(maquina => maquina.maquina === data.maquina);
      this.maquinas[maquinaIndex] = { ...this.maquinas[maquinaIndex], ...data };
    });

    this.cols = [
      { field: 'maquina', header: 'Máquina', width: '180px', type: 'text' },
      { field: 'produto', header: 'Produto', width: '130px', type: 'text' },
      { field: 'atributo', header: 'Atributo', width: '330px', type: 'text' },
      { field: 'status', header: 'Status', width: '250px', type: 'text' },
    ];
  }

  ngOnDestroy(): void {
    // Fechar conexão ao destruir o componente
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.webSocketService.disconnect();
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
      case 'FILA DE PRODUÇÃO':
        return 'warning';
        case 'TROCA DE MOLDE':
        return 'info';
      case 'PARADA':
        return 'danger';
    }
  }
}
