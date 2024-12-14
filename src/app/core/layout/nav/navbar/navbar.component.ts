import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Empresas } from 'src/app/core/models/empresas.model';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { EmpresaService } from 'src/app/pages/cadastro/empresas/empresa.service';
import { AuthService } from 'src/app/pages/seguranca/auth.service';
import { UsuarioService } from 'src/app/pages/cadastro/usuario/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  openTabs: {[key: string]: boolean} = {
    cadastro: false,
    relatorio: false,
    producao: false
  };
  
  sair: any;
  logo: any = '/assets/imagem/logo branca.svg';
  logoDescricao: any = '/assets/images/Logo original.svg';
  visibleSidebar;
  menu;
  env = environment;
  displayEmpresas: boolean;
  loading: boolean;
  empresas = [];
  usuario = new Usuarios();
  usuarios = new Array<Usuarios>();
  colsEmpresa = [];
  razaosocial: string;
  empresaativa: number;
  dadosempresaativa = new Empresas();
  empresa = new Empresas();

  constructor(
  public auth: AuthService,
  private errorHandler: ErrorHandlerService,
  private router: Router,
  private confirmation: ConfirmationService,
  private empresaService: EmpresaService,
  private messageService: MessageService,
  private usuarioService: UsuarioService,
    
  ) { }

  ngOnInit() {
    this.razaosocial = '...';

    this.colsEmpresa = [
      { field: 'id', header: 'ID', width: '80px' },
      { field: 'cnpj', header: 'Cnpj', width: '300px' },
      { field: 'razaosocial', header: 'Empresa', width: '250px' },
      { field: 'cidade', header: 'Cidade', width: '100px' },
      { field: 'uf', header: 'Estado', width: '100px' },
    ];
  }

  ngAfterViewInit() {
    if (this.auth.jwtPayload) {
      this.usuarioLogado();
    }
  }

  toggleTab(tab: string) {
    // Verifica se a aba clicada já está aberta
    const isTabAlreadyOpen = this.openTabs[tab];

    // Fecha todas as abas
    for (let key in this.openTabs) {
      this.openTabs[key] = false;
    }
    
    // Abre a aba clicada
    if (!isTabAlreadyOpen) {
      this.openTabs[tab] = true;
    }
  }

  novoAccessToken() {
    this.auth.obterNovoAccessToken();
  }
  confirmarLogout(sair: any) {
    this.confirmation.confirm({
      message: `Tem certeza que deseja sair? `,
      accept: () => {
        this.logout(sair);
      }
    });
  }
  logout(sair: any) {
  this.auth.logout()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  showEmpresas() {
    this.menu = false;
    this.displayEmpresas = true;
    // colocar timeOut
    this.carregarEmpresasUsuario();
  }
  carregarEmpresasUsuario() {
    this.loading = true;
    return this.usuarioService
      .buscarPorId(this.usuario.id)
      .then((obj) => {
        this.empresas = obj.empresas;
        this.loading = false;
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
        this.loading = false;
      });
  }

  selecionaEmpresa(empresaativa: number) {
    this.usuarioService
      .empresaAtivar(this.usuario.id, {empresaativa})
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Empresa',
          detail: `selecionada com sucesso!`,
        });
        this.displayEmpresas = false;
        this.usuarioLogado();
        this.redirectTo('/');
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }
  redirectTo(uri: string) {
    if (this.router.url === '/dashboard') {
      window.location.reload();
    }
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
  usuarioLogado() {
    this.usuarioService
      .listarUsuarios()
      .then((obj) => {
        this.usuarios = obj;
        this.verificarUsuarioLogado(this.usuarios);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  verificarUsuarioLogado(usuarios: Array<Usuarios>) {
    for (const i of Object.keys(usuarios)) {
      if (this.auth.jwtPayload?.user_name === usuarios[i].username) {
        this.usuario = usuarios[i];
        this.usuarioService.buscarPorId(this.usuario.id).then((obj2) => {
          this.empresaativa = obj2.empresaativa;
          this.carregarEmpresaAtiva(this.empresaativa);
          this.empresas = obj2.empresas;
        });
      } else {
        this.razaosocial = null;
      }
    }
  }

  carregarEmpresaAtiva(id: number) {
    this.empresaService.buscarPorId(id).then((obj) => {
      this.razaosocial = obj.razaosocial;
    })
  }

  temAlgumaPermissaoCadastro(): boolean {
    return (
      this.auth.temPermissao('view_empresa') ||
      this.auth.temPermissao('view_user') ||
      this.auth.temPermissao('view_produto') ||
      this.auth.temPermissao('view_molde') ||
      this.auth.temPermissao('view_maquina') ||
      this.auth.temPermissao('view_atributo') ||
      this.auth.temPermissao('view_colaborador') 
    );
  }

  temAlgumaPermissaoProducao(): boolean {
    return (
      this.auth.temPermissao('view_producaopcp') ||
      this.auth.temPermissao('view_insumos') ||
      this.auth.temPermissao('view_producao') ||
      this.auth.temPermissao('view_embaladores') ||
      this.auth.temPermissao('view_trocamoldepcp')
    )
  }

  temAlgumaPermissaoAlmoxarifado(): boolean {
    return (
      this.auth.temPermissao('view_registroalmoxarifado') ||
      this.auth.temPermissao('add_registroalmoxarifado')
    )
  }


  temAlgumaPermissaoRelatorio(): boolean {
    return (
      this.auth.temPermissao('view_relatorio')
    )
  }
}
