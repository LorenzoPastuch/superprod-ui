import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Produto } from 'src/app/core/models/produto.model';
import { ProdutoService } from '../produto.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {
  

  salvando: boolean = false;
  produto = new Produto()
  idProduto: number;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit() {

    this.title.setTitle('Cadastro Produto');
    this.idProduto = this.route.snapshot.params['id'];
    if(this.idProduto) {
      this.spinner.show();
      this.carregarProduto(this.idProduto);
    }else {
      this.produto.status = true;
    }
  }

  get editando() {
    return Boolean(this.produto.id);
  }


  salvar(form: NgForm) {
    if(this.editando) {
      this.atualizarProduto(form)
    }else {
      this.adiconarProduto(form);
    }
  }


  carregarProduto(id: number) {
    this.produtoService.buscarPorId(id)
    .then((obj) => {
      this.produto = obj;
      this.atualizarTituliEdicao();
      this.spinner.hide();
    })
    .catch((erro) => {
      this.spinner.hide();
     this.erroHandler.handle(erro);
    })
  }


  atualizarProduto(form: NgForm) {
    this.salvando = true;
    this.produtoService.atualizar(this.produto)
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


  adiconarProduto(form: NgForm) {
    this.salvando = true;
    this.produtoService.adicionar(this.produto)
    .then((obj) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Produto',
        detail: `${obj.nome}, adicionado com sucesso!`
      });
      this.salvando = false;
      this.router.navigate(['/produtos']);
    })
    .catch((erro) => {
      this.salvando = false;
      this.erroHandler.handle(erro);
    })
  }

  atualizarTituliEdicao() {
    this.title.setTitle(`Edição de Produto: ${this.produto.nome}`)
  }

}
