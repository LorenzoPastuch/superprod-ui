import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Insumo } from 'src/app/core/models/insumo.model';
import { InsumoService } from '../insumo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-insumo-cadastro',
  templateUrl: './insumo-cadastro.component.html',
  styleUrls: ['./insumo-cadastro.component.css']
})
export class InsumoCadastroComponent implements OnInit {
  
  messageDrop = 'Nenhum resultado encontrado...';
  salvando: boolean = false;
  insumo = new Insumo()
  idInsumo: number;
  classes: any[];
  selectedClasse: any;

  constructor(
    private insumoService: InsumoService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Insumo');
    this.idInsumo = this.route.snapshot.params['id'];
    this.classes = [
      { label: 'PIGMENTO', value: 'PIGMENTO' },
      { label: 'EMBALAGEM', value: 'EMBALAGEM' },
      { label: 'GERAL', value: 'GERAL' },
      { label: 'CAIXA', value: 'CAIXA' },
      { label: 'MATERIA PRIMA VIRGEM', value: 'MATERIA PRIMA VIRGEM' }
    ];
    if(this.idInsumo) {
      this.spinner.show();
      this.carregarInsumo(this.idInsumo);
    }else {
      this.insumo.status = true;
    }
  }

  get editando() {
    return Boolean(this.insumo.id);
  }


  salvar(form: NgForm) {
    if(this.editando) {
      this.atualizarInsumo(form)
    }else {
      this.adiconarInsumo(form);
    }
  }


  carregarInsumo(id: number) {
    this.insumoService.buscarPorId(id)
    .then((obj) => {
      this.selectedClasse = this.classes.find(
        (pac) => pac.value ===  obj.classe)
      this.insumo = obj;
      this.atualizarTituliEdicao();
      this.spinner.hide();
    })
    .catch((erro) => {
      this.spinner.hide();
     this.erroHandler.handle(erro);
    })
  }


  atualizarInsumo(form: NgForm) {
    this.salvando = true;
    this.insumo.classe = this.selectedClasse.value;
    this.insumoService.atualizar(this.insumo)
    .then((obj) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Molde',
        detail: `${obj.nome}, atualizado com sucesso!`
      });
      this.atualizarTituliEdicao();
      this.salvando = false;
    })
    .catch((erro) => {
      this.salvando = false;
      this.erroHandler.handle(erro);
    })
  }


  adiconarInsumo(form: NgForm) {
    this.salvando = true;
    this.insumo.classe = this.selectedClasse.value;
    this.insumoService.adicionar(this.insumo)
    .then((obj) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Insumo',
        detail: `${obj.nome}, adicionado com sucesso!`
      });
      this.salvando = false;
      this.router.navigate(['/insumos']);
    })
    .catch((erro) => {
      this.salvando = false;
      this.erroHandler.handle(erro);
    })
  }

  atualizarTituliEdicao() {
    this.title.setTitle(`Edição de Insumo: ${this.insumo.nome}`)
  }

}
