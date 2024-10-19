import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MessageService, PrimeNGConfig, TreeNode } from 'primeng/api';
import { Permissoes } from 'src/app/core/models/permissoes.model';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { Regex } from 'src/app/core/validators/regex';
import { UsuarioService } from '../../usuario.service';
import { EmpresaService } from 'src/app/pages/empresas/empresa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/pages/seguranca/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { TreeNodePermissoesService } from 'src/app/core/service/treeNodePermissao.service';
import { PermissaoTreeNodeService } from 'src/app/core/service/permissaoTreeNode.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  rowsPerPageTable: number[] = [10, 15, 25, 50, 100, 200];
  permissao = [];
  regex = new Regex();
  usuario = new Usuarios();
  usuarioOrigem = new Usuarios();
  empresas = [];
  usuariosOrigem = [];
  cols: any[];
  colsEmpresa = [];
  selectedRows: any[];
  selectAll = false;
  todos = false;
  permission: TreeNode[];
  selectedPermission: TreeNode[];
  messageDrop = 'Nenhum resultado encontrado...';
  idUsuario: number;
  salvando: boolean;


  constructor(
    private title: Title,
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private treeNodeService: TreeNodePermissoesService,
    private permissaoTreeNode: PermissaoTreeNodeService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro de Usuário');
    this.criarTreeNodePermissoes();
    this.conf.ripple = true;
    this.idUsuario = this.route.snapshot.params['id'];
    // if (this.idUsuario) {
    //   this.carregarPermissoes(this.idUsuario);
    //   this.carregarUsuario(this.idUsuario);
    // } else {
    this.usuario.status = true;
    // this.carregarPermissoes();
    // }
    this.cols = [{ field: 'name', header: 'Permissões' }];
    this.colsEmpresa = [
      { field: 'id', header: 'Código', width: '100px' },
      { field: 'cnpj', header: 'CNPJ', width: '150px' },
      { field: 'razaosocial', header: 'Empresa', width: '250px' },
      { field: 'cidade', header: 'Cidade', width: '150px' },
      { field: 'uf', header: 'Estado', width: '100px' },
    ];
    this.preencheUsuario();
    this.carregarEmpresas();
  }

  get editando() {
    return Boolean(this.usuario.id);
  }

  criarTreeNodePermissoes() {
    this.permission = this.treeNodeService.criarTreeNodePermissoes();
  }

  salvar(form: NgForm) {
    this.usuario.permissoes = this.permissao;
    if (this.editando) {
      // this.atualizarUsuario(form);
    } else {
      this.adicionarUsuario(form);
    }
  }

  adicionarUsuario(form: NgForm) {
    this.salvando = true;
    let chave = 0;
    this.usuario.empresas = [];

    for (const i of Object.keys(this.empresas)) {
      if (this.empresas[i].empresasusuario === true) {
        this.usuario.empresas.push(this.empresas[i]);
      }
      if (this.empresas[i].empresapadrao === true) {
        chave = chave + 1;
        this.usuario.empresaativa = this.empresas[i].id;
        this.usuario.empresapadrao = true;
      }
    }
    if (this.usuario.empresas.length === 0 || chave === 0 || chave > 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Usuário',
        detail: `Você não pode adicionar usuário sem empresa e/ou sem empresa padrão!`,
      });
      this.salvando = false;
    } else {
      for (const i of Object.keys(this.usuario.empresas)) {
        if (
          this.usuario.empresas[i].empresapadrao === null ||
          this.usuario.empresas[i].empresapadrao === undefined
        ) {
          this.usuario.empresas[i].empresapadrao = false;
        }
      }
     
      if(this.verificarPermissoes()) {
         this.usuarioService
        .adicionar(this.usuario)
        .then((usuarioAdicionado) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Usuário',
            detail: `${usuarioAdicionado.first_name}, adicionado com sucesso!`,
          });
          this.salvando = false;
          this.router.navigate(['/usuarios']);
        })
        .catch((erro) => {
          this.salvando = false;
          this.errorHandler.handle(erro);
        });
      } else {
        this.salvando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Usuário',
          detail: `Selecione uma permissão!`,
        });
      }
     
    }
  }

  verificarPermissoes() {
    let chave = true;
    
    if(this.selectedPermission){
      this.permissaoTreeNode.permissaoTreeNode(
        this.selectedPermission,
        this.permissao
      );
      console.log(this.permissao)
      this.usuario.permissoes = this.permissao;
    } else {
      chave = false;

    }
    this.permissao = [];
    return chave;
  }

  carregarEmpresas() {
    this.spinner.show();
    return this.empresaService.listarEmpresas().then((obj) => {
      this.empresas = obj;
      this.spinner.hide();
    })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarUsuario(id: number) {
    this.usuarioService
      .buscarPorId(id)
      .then((usuario) => {
        this.usuario = usuario;
        this.atualizarTituloEdicao();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarPermissoes() {
    this.usuarioService.listarPermissoes().then((per) => {
      console.log(per)
      this.permissao = per;
    })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  preencheUsuario() {
    return this.usuarioService
      .listarUsuarios()
      .then((ex) => {
        this.usuariosOrigem = ex.map((mp) => ({
          label: mp.nome,
          value: mp.id,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Usuário: ${this.usuario.first_name}`);
  }

}
