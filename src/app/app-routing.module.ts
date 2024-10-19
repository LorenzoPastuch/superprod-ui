import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaoAutorizadaComponent } from './core/layout/nao-autorizada/nao-autorizada.component';
import { PaginaNaoEncontradaComponent } from './core/layout/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AlterarSenhaComponent } from './core/layout/nav/navbar/alterar-senha/alterar-senha.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'moldes', loadChildren: () =>
      import('./pages/molde/molde.module').then(m => m.MoldeModule)
  },
  {
    path: 'empresas', loadChildren: () =>
      import('./pages/empresas/empresa.module').then(m => m.EmpresaModule)
  },
  {
    path: 'usuarios', loadChildren: () =>
      import('./pages/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'maquinas', loadChildren: () =>
      import('./pages/maquina/maquina.module').then(m => m.MaquinaModule)
  },
  {
    path: 'funcionarios', loadChildren: () =>
      import('./pages/funcionario/funcionario.module').then(m => m.FuncionarioModule)
  },
  {
    path: 'produtos', loadChildren: () =>
      import('./pages/produto/produto.module').then(m => m.ProdutoModule)
  },
  {
    path: 'atributos', loadChildren: () =>
      import('./pages/atributos/atributo.module').then(m => m.AtributoModule)
  },
  {
    path: 'producoes', loadChildren: () =>
      import('./pages/producao/producao.module').then(m => m.ProducaoModule)
  },
  {
    path: 'relatorios', loadChildren: () =>
      import('./pages/relatorios/relarotio.module').then(m => m.RelatorioModule)
  },
  { path: 'alterarsenha', component: AlterarSenhaComponent },

  { path: 'nao-autorizado', component: NaoAutorizadaComponent },
  {
    path: 'pcp', loadChildren: () =>
      import('./pages/pcp/pcp.module').then(m => m.PcpModule)
  },
  

  /*   { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
    { path: '**', redirectTo: 'pagina-nao-encontrada' } */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
