import { Component, OnInit, ViewChild } from '@angular/core';
import { EmbaladoresPcpService } from '../embaladores/embaladores.service';
import { Table } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { EmbaladorPcp } from 'src/app/core/models/embaladorpcp.model';
import { ColaboradorService } from '../../cadastro/colaborador/colaborador.service';
import { AuthService } from '../../seguranca/auth.service';


@Component({
  selector: 'app-pcp-controle',
  templateUrl: './embaladores.component.html',
  styleUrls: ['./embaladores.component.css']
})
export class EmbaladoresPcpComponent implements OnInit {
  @ViewChild('tabela') table: Table;

  embaladores: any[];
  distribuicao = new EmbaladorPcp();
  cols: any[];
  editing = false;

  constructor(
    private embaladoresService: EmbaladoresPcpService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService,
    private colaboradorService: ColaboradorService,
    public auth: AuthService,

  ) {}

  ngOnInit() {
    
    this.carregarDistribuicao();
    this.carregarEmbaladores();
    this.cols = [
      { field: 'maquina', header: 'Máquina', width: '180px', type: 'text' },
      { field: 'produto', header: 'Produto', width: '180px', type: 'text' },
      { field: 'nome_embalador', header: 'Embalador', width: '50px', type: 'text' },
    ];
  }

  carregarDistribuicao() {
    this.spinner.show();
    this.embaladoresService.listarEmbaladores()
    .then(obj => {
        this.distribuicao = obj.filter(item => item.status !== 'PARADA' && item.status !== 'TROCA DE MOLDE');
    })
    .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
    });
    this.spinner.hide()
  }

  carregarEmbaladores() {
    this.colaboradorService.listar()
    .then(obj => {
      this.embaladores = obj
      .filter(item => item.funcao === 'AUXILIAR DE PRODUÇAO')
      .map((mp) => ({ label: mp.nome, value: mp.id }));
    })
  }

  atualizar(distribuicao: any) {
    distribuicao.setor = distribuicao.maquina.maquina.nome;
    console.log(distribuicao)
    this.embaladoresService.atualizarEmbalador(distribuicao)
    .then(() => {
      this.carregarDistribuicao();
    });
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

  rotacionarEmbaladores() {
    this.embaladoresService.rotacionar().then(() => {
      this.carregarDistribuicao();
      this.carregarEmbaladores();
    }
    );
  }
}
