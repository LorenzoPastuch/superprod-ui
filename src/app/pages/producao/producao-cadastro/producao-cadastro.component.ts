import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Producao } from 'src/app/core/models/producao.model';
import { Regex } from 'src/app/core/validators/regex';
import { AuthService } from '../../seguranca/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProducaoService } from '../producao.service';
import { MaquinaService } from '../../maquina/maquina.service';
import { ProdutoService } from '../../produto/produto.service';
import { NgForm } from '@angular/forms';
import { Produto } from 'src/app/core/models/produto.model';
import { ColaboradorService } from '../../colaborador/colaborador.service';
import { AtributoService } from '../../atributos/atributo.service';

@Component({
  selector: 'app-producao-cadastro',
  templateUrl: './producao-cadastro.component.html',
  styleUrls: ['./producao-cadastro.component.css']
})
export class ProducaoCadastroComponent implements OnInit {
  messageDrop = 'Nenhum resultado encontrado...';
  regex = new Regex();
  traducao: any;
  producoes = new Producao();
  maquinas = [];
  produtos = [];
  colaboradors = [];
  atributos = [];
  novaProducao = false;
  exibirForm = false;
  exibirFormOperador = false;
  exibirFormAlteracao = false;
  prodIndex: number;
  producaoSelecionado: number;
  producao: string;
  idProd: number;
  disabledExcluir: boolean;
  salvando: boolean;
  selectedOperador: any;
  selectedProduto: any;
  selectedMaquina: any;
  selectedColaborador: any;
  selectedAtributo: any;
  selectedMotivoperda: any;
  motivosperda: any[];

  constructor(
    private producaoService: ProducaoService,
    private colaboradorService: ColaboradorService,
    private maquinaService: MaquinaService,
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public auth: AuthService,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
    private atributoService: AtributoService
  ) { }

  ngOnInit() {
    this.carregarMaquina();
    this.carregarProduto();
    this.carregarColaborador();
    this.carregarAtributo();
    this.producoes.status = true;
    this.idProd = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Produção');

    this.motivosperda = [
      { label: 'Produto queimado/derretido', value: 'Produto queimado/derretido' },
      { label: 'Regulagem da máquina', value: 'Regulagem da máquina' },
      { label: 'Material contaminado', value: 'Material contaminado' },
      { label: 'Produto manchado', value: 'Produto manchado' },
      { label: 'Falha na injeção', value: 'Falha na injeção' },
      { label: 'Produto trincado/com estrias', value: 'Produto trincado/com estrias' },
      { label: 'Galhos', value: 'Galhos' },
      { label: 'Outro (Especificar na observação)', value: 'Outro' }
    ];

    if (this.idProd) {
      this.carregarProducao(this.idProd);
    } else {
      this.producoes.status = true;
    }
    
  }


  get editando() {
    return this.producoes && this.producoes.id;
  }

  carregarProducao(id: number) {
    this.producaoService
      .buscarPorId(id)
      .then((obj) => {
        setTimeout(() => {
          this.selectedMaquina = this.maquinas.find(
            (pac) => pac.value === obj.maquina.id
          );
          this.selectedProduto = this.produtos.find(
            (pac) => pac.value === obj.produto.id
          );
          this.selectedColaborador = this.colaboradors.find(
            (pac) => pac.value === obj.colaborador.id
          );
          this.selectedAtributo = this.atributos.find(
            (pac) => pac.value === obj.atributo.id
          );
          

        }, 300);
        this.producoes = obj;
        // this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }



  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarProducao(form);
    } else {
      this.adicionarProducao(form);
    }
  }


  carregarAtributo() {
    return this.atributoService
      .listar()
      .then((pac) => {
        this.atributos = pac.map((mp) => ({ label: mp.nome, value: mp.id }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }


  carregarColaborador() {
    return this.colaboradorService
      .listar()
      .then((pac) => {
        this.colaboradors = pac.map((mp) => ({ label: mp.nome, value: mp.id }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  carregarMaquina() {
    return this.maquinaService
      .listarMaquina()
      .then((pac) => {
        this.maquinas = pac.map((mp) => ({ label: mp.numero, value: mp.id }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  carregarProduto() {
    return this.produtoService
      .listarProdutos()
      .then((pac) => {
        this.produtos = pac.map((mp) => ({ label: mp.nome, value: mp.id }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  adicionarProducao(form: NgForm) {
    this.salvando = true;
    this.producaoMaquina();
    this.producaoProduto();
    this.producaoColaborador();
    this.producaoAtributo();
    this.producaoMotivoperda();
    this.producaoService
      .adicionar(this.producoes)
      .then((atendAdicionado) => {
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


  atualizarProducao(form: NgForm) {
    this.salvando = true;
    this.producaoMaquina();
    this.producaoProduto();
    this.producaoColaborador();
    this.producaoAtributo();
    this.producaoMotivoperda();
    // console.log(this.selectedPaciente);
    // console.log(this.atendimentos);
    console.log(this.producoes)
    this.producaoService
      .atualizar(this.producoes)
      .then((producao) => {
        this.producoes = producao;
        console.log(producao)
        this.messageService.add({
          severity: 'info',
          summary: 'Produção',
          detail: `alterado com sucesso!`,
        });
        this.salvando = false;
        // this.atualizarTituloEdicao();
        this.router.navigate(['/producoes'])
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }

  producaoMaquina() {
    this.producoes.maquina.id = this.selectedMaquina.value;
  }
  producaoProduto() {
    this.producoes.produto.id = this.selectedProduto.value;
  }
  producaoColaborador() {
    this.producoes.colaborador.id = this.selectedColaborador.value;
  }

  producaoAtributo() {
    this.producoes.atributo.id = this.selectedAtributo.value;
  }
  producaoMotivoperda() {
    if (this.selectedMotivoperda) {
      this.producoes.motivoperda = this.selectedMotivoperda.value;
    } else {
      this.selectedMotivoperda = [{ label: 'Nada', value: 'Nada' }];
      this.producoes.motivoperda = null;
    }
  }

//   atualizarTituloEdicao() {
//     this.title.setTitle(`${this.producoes.operador.nome}`);
//   }

}
