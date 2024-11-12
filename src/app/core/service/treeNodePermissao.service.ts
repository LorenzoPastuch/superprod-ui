import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TreeNodePermissoesService {
  treeNodePermissoes: TreeNode[];
  constructor() { }

  criarTreeNodePermissoes() {
    return [

      {
        label: 'Todas Permissões',
        selectable: true,
        data: 'Node',
        key: 'Node',

        children: [
          {
            label:'Cadastro',
            data:  'cadastroNode',
            key: 'cadastroNode',
            children: [
              {
                label: 'Empresas',
                data: 'empresa',
                key: 'empresa',
                children: [
                  {
                    label: 'Criar',
                    data: 'empresaCriar',
                    key: 'add_empresa',
                  },
                  {
                    label: 'Visualizar',
                    data: 'empresaVisualizar',
                    key: 'view_empresa',
                  },
                  {
                    label: 'Editar',
                    data: 'empresaEditar',
                    key: 'change_empresa',
                  },
                ],
              },
              {  
                label: 'Usuários',
                data: 'usuario',
                key: 'usuario',
                children: [
                  {
                    label: 'Criar',
                    data: 'usuarioCriar',
                    key: 'add_user',
                  },
                  {
                    label: 'Visualizar',
                    data: 'usuarioVisualizar',
                    key: 'view_user',
                  },
                  {
                    label: 'Editar',
                    data: 'usuarioEditar',
                    key: 'change_user',
                  },
                ],
              },
              {
                label: 'Produto',
                data: 'produto',
                key: 'produto',
                children: [
                  {
                    label: 'Criar',
                    data: 'produtoCriar',
                    key: 'produtoCriar',
                  },
                  {
                    label: 'Visualizar',
                    data: 'produtoVisualizar',
                    key: 'produtoVisualizar',
                  },
                  {
                    label: 'Editar',
                    data: 'produtoEditar',
                    key: 'produtoEditar',
                  },
                ],
              },
              {
                label: 'Molde',
                data: 'molde',
                key: 'molde',
                children: [
                  {
                    label: 'Criar',
                    data: 'moldeCriar',
                    key: 'moldeCriar',
                  },
                  {
                    label: 'Visualizar',
                    data: 'moldeVisualizar',
                    key: 'moldeVisualizar',
                  },
                  {
                    label: 'Editar',
                    data: 'moldeEditar',
                    key: 'moldeEditar',
                  },
                ],
              },
              {
                label: 'Maquina',
                data: 'maquina',
                key: 'maquina',
                children: [
                  {
                    label: 'Criar',
                    data: 'maquinaCriar',
                    key: 'maquinaCriar',
                  },
                  {
                    label: 'Visualizar',
                    data: 'maquinaVisualizar',
                    key: 'maquinaVisualizar',
                  },
                  {
                    label: 'Editar',
                    data: 'maquinaEditar',
                    key: 'maquinaEditar',
                  },
                ],
              },
              {
                label: 'Atributo',
                data: 'atributo',
                key: 'atributo',
                children: [
                  {
                    label: 'Criar',
                    data: 'atributoCriar',
                    key: 'atributoCriar',
                  },
                  {
                    label: 'Visualizar',
                    data: 'atributoVisualizar',
                    key: 'atributoVisualizar',
                  },
                  {
                    label: 'Editar',
                    data: 'atributoEditar',
                    key: 'atributoEditar',
                  },
                  
                ],
              },
              {
                label: 'Colaboradores',
                data: 'colaborador',
                key: 'colaborador',
                children: [
                  {
                    label: 'Criar',
                    data: 'colaboradorCriar',
                    key: 'colaboradorCriar',
                  },
                  {
                    label: 'Visualizar',
                    data: 'colaboradorVisualizar',
                    key: 'colaboradorVisualizar',
                  },
                  {
                    label: 'Editar',
                    data: 'colaboradorEditar',
                    key: 'colaboradorEditar',
                  },
                ],
              },
              {
                label: 'Produção',
                data: 'producao',
                key: 'producao',
                children: [
                  {
                    label: 'Criar',
                    data: 'producaoCriar',
                    key: 'producaoCriar',
                  },
                  {
                    label: 'Visualizar',
                    data: 'producaoVisualizar',
                    key: 'producaoVisualizar',
                  },
                  {
                    label: 'Editar',
                    data: 'producaoEditar',
                    key: 'producaoEditar',
                  },
                ],
              },
              {
                label: 'Insumo',
                data: 'insumo',
                key: 'insumo',
                children: [
                  {
                    label: 'Criar',
                    data: 'insumoCriar',
                    key: 'insumoCriar',
                  },
                  {
                    label: 'Visualizar',
                    data: 'insumoVisualizar',
                    key: 'insumoVisualizar',
                  },
                  {
                    label: 'Editar',
                    data: 'insumoEditar',
                    key: 'insumoEditar',
                  },
                ],
              },

            ],
          },
          {
            label: 'PCP',
            data: 'PCPNode',
            key: 'PCPNode',
            children: [
              {
                label: 'Producao PCP',
                data: 'producaopcp',
                key: 'producaopcp',
                children:[
                  {
                    label: 'Criar',
                    data: 'producaopcpCriar',
                    key: 'producaopcpCriar'
                  },
                  {
                    label: 'Visualizar',
                    data: 'producaopcpVisualizar',
                    key: 'producaopcpVisualizar'
                  },
                  {
                    label: 'Editar',
                    data: 'producaopcpEditar',
                    key: 'producaopcpEditar'
                  },
                  {
                    label: 'Excluir',
                    data: 'producaopcpExcluir',
                    key: 'producaopcpExcluir'
                  }
                ]
              },
              {
                label: 'Insumos',
                data: 'insumos',
                key: 'insumos',
                children:[
                  {
                    label: 'Visualizar',
                    data: 'insumospcpVisualizar',
                    key: 'insumospcpVisualizar'
                  }
                ]
              },
              {
                label: 'Embaladores',
                data: 'embaladores',
                key: 'embaladores',
                children:[
                  {
                    label: 'Criar',
                    data: 'embaladoresCriar',
                    key: 'embaladoresCriar'
                  },
                  {
                    label: 'Visualizar',
                    data: 'embaladoresVisualizar',
                    key: 'embaladoresVisualizar'
                  },
                  {
                    label: 'Editar',
                    data: 'embaladoresEditar',
                    key: 'embaladoresEditar'
                  }
                ]
              }
            ]
          },
          {
            label: 'Almoxarifado',
            data: 'almoxarifadoNode',
            key: 'almoxarifadoNode',
            children: [
              {
                label: 'Visualizar',
                data: 'almoxarifadoVisualizar',
                key: 'almoxarifadoVisualizar'
              },
              {
                label: 'Criar',
                data: 'almoxarifadoCriar',
                key: 'almoxarifadoCriar'
              },
              {
                label: 'Editar',
                data: 'almoxarifadoEditar',
                key: 'almoxarifadoEditar'
              },
            ]
          }
        ]
      }        // {
    ]          //   label: 'Relatorio',
  }            //   data: 'relatorio',
}              //   key: 'relatorio',
              //   children: [
                  
              //     {
              //       label: 'Visualizar',
              //       data: 'relatoriosVisualizar',
              //       key: 'relatoriosVisualizar',
              //     }
                
              //   ],
              // },
