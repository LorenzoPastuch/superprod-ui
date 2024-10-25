import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Colaborador } from 'src/app/core/models/colaborador.model';
import { ColaboradorService } from '../colaborador.service';

@Component({
  selector: 'app-colaborador-cadastro',
  templateUrl: './colaborador-cadastro.component.html',
  styleUrls: ['./colaborador-cadastro.component.css']
})
export class ColaboradorCadastroComponent implements OnInit {

  messageDrop = 'Nenhum resultado encontrado...';
  salvando: boolean = false;
  colaborador = new Colaborador()
  idColaborador: number;
  funcoes: any[];
  selectedFuncao: any;

  constructor(
    private colaboradorService: ColaboradorService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro Colaborador');
    this.idColaborador = this.route.snapshot.params['id'];
    this.funcoes = [
      { label: 'OPERADOR', value: 'OPERADOR' },
      { label: 'AUXILIAR DE PRODUÇÃO', value: 'AUXILIAR DE PRODUÇAO' },
      { label: 'QUALIDADE', value: 'QUALIDADE' },
      { label: 'AUXILIAR DE QUALIDADE', value: 'AUXILIAR DE QUALIDADE' },
      { label: 'APONTAMENTO', value: 'APONTAMENTO' },
      { label: 'ABASTECEDOR', value: 'ABASTECEDOR' },
      { label: 'OPERADOR DE MOINHO', value: 'OPERADOR DE MOINHO' },
      { label: 'AUXILIAR DE MECÂNICO', value: 'AUXILIAR DE MECÂNICO'},
      { label: 'AUXILIAR DE OPERADOR', value: 'AUXILIAR DE OPERADOR'},
    ];
    if (this.idColaborador) {
      this.spinner.show();
      this.carregarColaborador(this.idColaborador);
    } else {
      this.colaborador.status = true;
    }
  }

  get editando() {
    return Boolean(this.colaborador.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarColaborador(form)
    } else {
      this.adiconarColaborador(form);
    }
  }

  carregarColaborador(id: number) {
    this.colaboradorService.buscarPorId(id)
      .then((obj) => {
        this.selectedFuncao = this.funcoes.find(
          (pac) => pac.value ===  obj.funcao)
        this.colaborador = obj;
        this.atualizarTituliEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.erroHandler.handle(erro);
      })
  }

  atualizarColaborador(form: NgForm) {
    this.salvando = true;
    this.colaborador.funcao = this.selectedFuncao.value;
    this.colaboradorService.atualizar(this.colaborador)
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

  adiconarColaborador(form: NgForm) {
    this.salvando = true;
    this.colaborador.funcao = this.selectedFuncao.value;
    this.colaboradorService.adicionar(this.colaborador)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Molde',
          detail: `${obj.nome}, adicionado com sucesso!`
        });
        this.salvando = false;
        this.router.navigate(['/colaboradors']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.erroHandler.handle(erro);
      })
  }

  atualizarTituliEdicao() {
    this.title.setTitle(`Edição de Molde: ${this.colaborador.nome}`)
  }

}
