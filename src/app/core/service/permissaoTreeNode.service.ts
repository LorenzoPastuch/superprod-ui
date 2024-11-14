import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {TreeNode} from 'primeng/api'
import { Permissoes } from '../models/permissoes.model';

@Injectable({
  providedIn: 'root',
})
export class PermissaoTreeNodeService {
  constructor(private router: Router) { }

  permissaoTreeNode(selected: any, permissao: any) {
    for (const i of Object.keys(selected)) {
      
      switch (selected[i].data) {
        // Permissão em Empresa---------------------------------
        case 'empresaCriar':
          permissao.push({ codename: 'add_empresa' });
          break;
        case 'empresaEditar':
          permissao.push({ codename: 'change_empresa' });
          break;
        case 'empresaVisualizar':
          permissao.push({ codename: 'view_empresa' });
          break;
  
        // Permissão em Usuario---------------------------------
        case 'usuarioCriar':
          permissao.push({ codename: 'add_user' });
          break;
        case 'usuarioEditar':
          permissao.push({ codename: 'change_user' });
          break;
        case 'usuarioVisualizar':
          permissao.push({ codename: 'view_user' });
          break;

        // Permissão em Produto---------------------------------
        case 'produtoCriar':
          permissao.push({ codename: 'add_produto' });
          break;
        case 'produtoEditar':
          permissao.push({ codename: 'change_produto' });
          break;
        case 'produtoVisualizar':
          permissao.push({ codename: 'view_produto' });
          break;

        // Permissão em Molde---------------------------------
        case 'moldeCriar':
          permissao.push({ codename: 'add_molde' });
          break;
        case 'moldeEditar':
          permissao.push({ codename: 'change_molde' });
          break;
        case 'moldeVisualizar':
          permissao.push({ codename: 'view_molde' });
          break;

        // Permissão em Maquina---------------------------------
        case 'maquinaCriar':
          permissao.push({ codename: 'add_maquina' });
          break;
        case 'maquinaEditar':
          permissao.push({ codename: 'change_maquina' });
          break;
        case 'maquinaVisualizar':
          permissao.push({ codename: 'view_maquina' });
          break;

        // Permissão em Atributo---------------------------------
        case 'atributoCriar':
          permissao.push({ codename: 'add_atributo' });
          break;
        case 'atributoEditar':
          permissao.push({ codename: 'change_atributo' });
          break;
        case 'atributoVisualizar':
          permissao.push({ codename: 'view_atributo' });
          break;

        // Permissão em Colaboradores---------------------------------
        case 'colaboradorCriar':
          permissao.push({ codename: 'add_colaborador' });
          break;
        case 'colaboradorEditar':
          permissao.push({ codename: 'change_colaborador' });
          break;
        case 'colaboradorVisualizar':
          permissao.push({ codename: 'view_colaborador' });
          break;

        // Permissão em Produção---------------------------------
        case 'producaoCriar':
          permissao.push({ codename: 'add_producao' });
          break;
        case 'producaoEditar':
          permissao.push({ codename: 'change_producao' });
          break;
        case 'producaoVisualizar':
          permissao.push({ codename: 'view_producao' });
          break;

        // Permissão em Insumo---------------------------------
        case 'insumoCriar':
          permissao.push({ codename: 'add_insumo' });
          break;
        case 'insumoEditar':
          permissao.push({ codename: 'change_insumo' });
          break;
        case 'insumoVisualizar':
          permissao.push({ codename: 'view_insumo' });
          break;

          // Permissão em PCP---------------------------------
        case 'producaopcpCriar':
          permissao.push({ codename: 'add_producaopcp' });
          break;
        case 'producaopcpEditar':
          permissao.push({ codename: 'change_producaopcp' });
          break;
        case 'producaopcpVisualizar':
          permissao.push({ codename: 'view_producaopcp' });
          break;
        case 'producaopcpExcluir':
          permissao.push({ codename: 'delete_producaopcp' });
          break;

          // Permissão em InsumosPCP---------------------------------
        case 'insumospcpVisualizar':
          permissao.push({ codename: 'view_insumospcp' });
          break;

          // Permissão em EmbaladoresPCP---------------------------------
        case 'embaladorespcpEditar':
          permissao.push({ codename: 'change_embaladorespcp' });
          break;
        case 'embaladorespcpVisualizar':
          permissao.push({ codename: 'view_embaladorespcp' });
          break;

          // Permissão em Almoxarifado---------------------------------
        case 'almoxarifadoVisualizar':
          permissao.push({ codename: 'view_registroalmoxarifado' });
          break;

        case 'almoxarifadoCriar':
          permissao.push({ codename: 'add_registroalmoxarifado' });
          break;

        case 'almoxarifadoEditar':
          permissao.push({ codename: 'change_registroalmoxarifado' });
          break;
  
    
         
        
        // case 'relatoriosVisualizar':
        //   permissao[5].codename = 'view_relatorio';
        //   break;

        
        
        // // Permissão em Operador---------------------------------
        // case 'operadorCriar':
        //   console.log('existe atendimento');
        //   permissao[7].permission.add = true;
        //   break;
        // case 'operadorVisualizar':
        //   permissao[7].permission.view = true;
        //   break;
        // case 'operadorEditar':
        //   permissao[7].permission.change = true;
        //   break;
        
         // Adicione mais casos conforme necessário para outras entidades

        // Adaptação para a entidade 'producao'

        // Adicione mais casos conforme necessário para outras entidades

        // Adaptação para a entidade 'usuarios'

        // Adicione mais casos conforme necessário para outras entidades

        // Adaptação para a entidade 'relatorios'

        // Adaptação para a entidade 'empresas'


        // Adaptação para a entidade 'operador'


      }
    }

  }

  AtribuirPermissoesTreeNode(nodes: TreeNode[], permissoes: { codename: string }[]): TreeNode[] {
    let selected: TreeNode[] = [];
    for (let node of nodes) {
      // Verifica se o nó tem permissão correspondente na lista
      if (permissoes.some((p) => p.codename === node.key)) {
        selected.push(node);
      }

      // Se o nó tiver filhos, aplica a recursão
      if (node.children) {
        selected = [...selected, ...this.AtribuirPermissoesTreeNode(node.children, permissoes)];
      }
    }
    return selected;
  }
}


    // Início de Permissao de Molde--------------------------------------------------------------
//     if (permissao[0].permission.add !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'moldeCriar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[0].permission.view !== true) {
//       console.log(permissao[0].permission.view)
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'moldeVisualizar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[0].permission.change !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'moldeEditar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (
//         permissao[0].permission.add !== true &&
//         permissao[0].permission.view !== true &&
//         permissao[0].permission.change !== true 
//         ) 
//       {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'molde') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     // Fim permissao de Molde -------------------------------------------------------------------

//     // Início de Permissao de Maquina--------------------------------------------------------------
//  if (permissao[1].permission.add !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'maquinaCriar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[1].permission.view !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'maquinaVisualizar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[1].permission.change !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'maquinaEditar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (
//       permissao[1].permission.add !== true &&
//       permissao[1].permission.view !== true &&
//       permissao[1].permission.change !== true 
//     ) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'maquina') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     // Fim permissao de Maquina -------------------------------------------------------------------

//     // Início de Permissao de Exames--------------------------------------------------------------
 
//     if (permissao[2].permission.add !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'produtoCriar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[2].permission.view !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'produtoVisualizar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[2].permission.change !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'produtoEditar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (
//       permissao[2].permission.add !== true &&
//       permissao[2].permission.view !== true &&
//       permissao[2].permission.change !== true 
//     ) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'produto') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     // Fim permissao de Operador -------------------------------------------------------------------
 
//     // Início de Permissao de Produto--------------------------------------------------------------
//     if (permissao[3].permission.add !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'producaoCriar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[3].permission.view !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'producaoVisualizar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[3].permission.change !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'producaoEditar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
    
//     if (
//       permissao[3].permission.add !== true &&
//       permissao[3].permission.view !== true &&
//       permissao[3].permission.change !== true 
//     ) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'producao') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     // Fim permissao de Produto -------------------------------------------------------------------
 
//     // Início de Permissao de Usuarios--------------------------------------------------------------
//     if (permissao[4].permission.add !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'usuarioCriar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[4].permission.view !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'usuarioVisualizar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[4].permission.change !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'usuarioEditar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
    
//     if (
//       permissao[4].permission.add !== true &&
//       permissao[4].permission.view !== true &&
//       permissao[4].permission.change !== true 
//     ) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'usuario') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     // Fim permissao de Usuarios -------------------------------------------------------------------
 
//     // Início de Permissao de Relatórios------------------------------------------------
//     if (permissao[5].permission.view !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'relatorioVisualizar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[5].permission.view !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'relatorio') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
   
    
//     // Fim permissao de Relatórios------------------------------------------------

//     // Início de Permissao de Empresas--------------------------------------------------------------
//     if (permissao[6].permission.add !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'empresaCriar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[6].permission.view !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'empresaVisualizar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[6].permission.change !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'empresaEditar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
    
//     if (
//       permissao[6].permission.add !== true &&
//       permissao[6].permission.view !== true &&
//       permissao[6].permission.change !== true 
//     ) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'empresa') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     // Fim permissao de Empresas -------------------------------------------------------------------
//     if (permissao[7].permission.add !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'operadorCriar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[7].permission.view !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'operadorVisualizar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//     if (permissao[7].permission.change !== true) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'operadorEditar') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
    
//     if (
//       permissao[7].permission.add !== true &&
//       permissao[7].permission.view !== true &&
//       permissao[7].permission.change !== true 
//     ) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'operador') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     } 
//     // Fim permissao de Producao -------------------------------------------------------------------

//     // Verificar Node de Cadastro-------------------------------------------------------------------
//     if (
//       permissao[0].permission.add !== true &&
//       permissao[0].permission.view !== true &&
//       permissao[0].permission.change !== true &&

//       permissao[1].permission.add !== true &&
//       permissao[1].permission.view !== true &&
//       permissao[1].permission.change !== true &&

//       permissao[2].permission.add !== true &&
//       permissao[2].permission.view !== true &&
//       permissao[2].permission.change !== true &&

//       permissao[3].permission.add !== true &&
//       permissao[3].permission.view !== true &&
//       permissao[3].permission.change !== true &&

//       permissao[4].permission.add !== true &&
//       permissao[4].permission.view !== true &&
//       permissao[4].permission.change !== true &&

//       permissao[5].permission.view !== true &&

//       permissao[6].permission.add !== true &&
//       permissao[6].permission.view !== true &&
//       permissao[6].permission.change !== true &&

//       permissao[7].permission.add !== true &&
//       permissao[7].permission.view !== true &&
//       permissao[7].permission.change !== true 
//     ) {
//       selectedpermissao.forEach((item, index) => {
//         if (item.data === 'cadastroNode') {
//           selectedpermissao.splice(index, 1);
//         }
//       });
//     }
//   }
