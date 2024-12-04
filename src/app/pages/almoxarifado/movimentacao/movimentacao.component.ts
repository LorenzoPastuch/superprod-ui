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
  id: number;
  regex = new Regex();
  salvando: boolean;
  registro: any;
  insumos = [];
  insumosFiltrados = [];
  classes = [];
  selectedClasse: any;
  selectedInsumo: any;
  selectedTipoMovimentacao: any = { label: 'RETIRADA', value: 'RETIRADA' };
  codigoInsumo: any;
  movimentacao = new RegistroAlmoxarifado();
  movimentacaoOptions = [
    { label: 'RETIRADA', value: 'RETIRADA' },
    { label: 'DEVOLUÇÃO', value: 'DEVOLUÇÃO' }
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
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.carregarRegistro(this.id);
    }
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
    if (this.id) {
      this.almoxarifadoService.atualizar(this.movimentacao)
      .then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registro',
            detail: `Atualizado com sucesso!`,
          });
          this.salvando = false;
        })
        .catch((erro) => {
          this.salvando = false;
          this.errorHandler.handle(erro);
        });
  
    } else {
      this.almoxarifadoService.adicionar(this.movimentacao)
      .then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registro',
            detail: `Adicionado com sucesso!`,
          });
          this.salvando = false;
        })
        .catch((erro) => {
          this.salvando = false;
          this.errorHandler.handle(erro);
        });
    }
  }

  get quantidadeMode(): boolean {
    const classe = this.selectedClasse?.value;
    return classe === 'PIGMENTO' || classe === 'MATERIA PRIMA VIRGEM';
  }

  carregarRegistro(id: number) {
    this.spinner.show();
    this.almoxarifadoService
      .buscarPorId(id)
      .then((obj) => {
        this.carregarInsumos().then(() => {
          this.selectedClasse = this.classes.find(
            (classe) => classe.value === obj.insumo.classe
          );
  
          this.filtrarPorClasse(this.selectedClasse.value); 
          this.selectedInsumo = this.insumosFiltrados.find(
            (insumo) => insumo.id === obj.insumo.id
          );
  
          this.selectedTipoMovimentacao = this.movimentacaoOptions.find(
            (tipo) => tipo.value === obj.tipo_movimentacao
          );
  
          this.atualizarCodigo(this.selectedInsumo);
          this.movimentacao = obj;
  
          this.spinner.hide();
        });
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }
}
