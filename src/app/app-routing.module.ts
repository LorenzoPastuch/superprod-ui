import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaoAutorizadaComponent } from './core/layout/nao-autorizada/nao-autorizada.component';
import { PaginaNaoEncontradaComponent } from './core/layout/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AlterarSenhaComponent } from './core/layout/nav/navbar/alterar-senha/alterar-senha.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadaComponent },
  { path: 'usuarios/:id/alterar-senha', component: AlterarSenhaComponent },
  {
    path: 'cadastro',
    children: [
      {
        path: 'moldes', loadChildren: () =>
          import('./pages/cadastro/molde/molde.module').then(m => m.MoldeModule)
      },
      {
        path: 'empresas', loadChildren: () =>
          import('./pages/cadastro/empresas/empresa.module').then(m => m.EmpresaModule)
      },
      {
        path: 'usuarios', loadChildren: () =>
          import('./pages/cadastro/usuario/usuario.module').then(m => m.UsuarioModule)
      },
      {
        path: 'maquinas', loadChildren: () =>
          import('./pages/cadastro/maquina/maquina.module').then(m => m.MaquinaModule)
      },
      {
        path: 'colaboradores', loadChildren: () =>
          import('./pages/cadastro/colaborador/colaborador.module').then(m => m.ColaboradorModule)
      },
      {
        path: 'produtos', loadChildren: () =>
          import('./pages/cadastro/produto/produto.module').then(m => m.ProdutoModule)
      },
      {
        path: 'atributos', loadChildren: () =>
          import('./pages/cadastro/atributos/atributo.module').then(m => m.AtributoModule)
      },
      {
        path: 'producoes', loadChildren: () =>
          import('./pages/cadastro/producao/producao.module').then(m => m.ProducaoModule)
      }
    ]
  },
  {
    path: 'pcp',
    children: [
      {
        path: 'controle', loadChildren: () =>
          import('./pages/pcp/pcp.module').then(m => m.PcpModule)
      },
    ]
  },
  {
    path: 'relatorios', loadChildren: () =>
      import('./pages/relatorios/relarotio.module').then(m => m.RelatorioModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
