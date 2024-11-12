import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Producao } from 'src/app/core/models/producao.model';
import { Regex } from 'src/app/core/validators/regex';
import { AuthService } from '../../seguranca/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlmoxarifadoService } from '../almoxarifado.service';
import { InsumoService } from '../../cadastro/insumo/insumo.service';
import { NgForm } from '@angular/forms';
import { RegistroAlmoxarifado } from 'src/app/core/models/registro_almoxarifado.model';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.css']
})
export class AlmoxarifadoMovimentacaoComponent implements OnInit {
  messageDrop = 'Nenhum resultado encontrado...';
  regex = new Regex();
  salvando: boolean;
  registros = new Producao();
  insumos = [];
  insumosFiltrados = [];
  classes = [];
  selectedClasse: any;
  selectedInsumo: any;
  selectedTipoMovimentacao: any;
  codigoInsumo: any;
  movimentacao = new RegistroAlmoxarifado();
  movimentacaoOptions = [
    { label: 'Retirada', value: 'RETIRADA' },
    { label: 'Devolução', value: 'DEVOLUÇÃO' }
  ];

  constructor(
    private almoxarifadoService: AlmoxarifadoService,
    private insumoService: InsumoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public auth: AuthService,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.carregarInsumos();
  }

  carregarInsumos() {
    return this.insumoService
    .listarInsumos()
    .then((obj) => {
        this.insumos = obj;
        this.classes = Array.from(new Set(this.insumos.map((item: any) => item.classe)))
        .map(classe => ({label: classe, value: classe}));
    })
  }

  filtrarPorClasse(selectedClasse: string) {
    this.insumosFiltrados = this.insumos.filter((insumo: any) => insumo.classe === selectedClasse)
  }

  atualizarCodigo(selectedInsumo: any) {
    this.codigoInsumo = selectedInsumo ? selectedInsumo.codigo : '';
  }

  salvar() {
    this.salvando = true;
    this.movimentacao.tipo_movimentacao = this.selectedTipoMovimentacao.value;
    this.movimentacao.insumo.id = this.selectedInsumo.id;
    this.almoxarifadoService.adicionar(this.movimentacao)
    .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Produção',
          detail: `adicionado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/producoes']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
}
