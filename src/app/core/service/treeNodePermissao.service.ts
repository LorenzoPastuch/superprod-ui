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
            ],
          },
          // {
        //     label: 'PCP',
        //     data: 'PCPNode',
        //     key: 'PCPNode',
        //     children: [
        //       {
        //         label: 'Controle',
        //         data: 'controle',
        //         key: 'controle',
        //         children:[
        //           {
        //             label: 'Criar',
        //             data: 'controleCriar',
        //             key: 'controleCriar'
        //           },
        //           {
        //             label: 'Visualizar',
        //             data: 'controleVisualizar',
        //             key: 'controleVisualizar'
        //           },
        //           {
        //             label: 'Editar',
        //             data: 'controleEditar',
        //             key: 'controleEditar'
        //           }
        //         ]
        //       },
        //       {
        //         label: 'Insumos',
        //         data: 'insumos',
        //         key: 'insumos',
        //         children:[
        //           {
        //             label: 'Criar',
        //             data: 'insumosCriar',
        //             key: 'insumosCriar'
        //           },
        //           {
        //             label: 'Visualizar',
        //             data: 'insumosVisualizar',
        //             key: 'insumosVisualizar'
        //           },
        //           {
        //             label: 'Editar',
        //             data: 'insumosEditar',
        //             key: 'insumosEditar'
        //           }
        //         ]
        //       },
        //       {
        //         label: 'Embaladores',
        //         data: 'embaladores',
        //         key: 'embaladores',
        //         children:[
        //           {
        //             label: 'Criar',
        //             data: 'embaladoresCriar',
        //             key: 'embaladoresCriar'
        //           },
        //           {
        //             label: 'Visualizar',
        //             data: 'embaladoresVisualizar',
        //             key: 'embaladoresVisualizar'
        //           },
        //           {
        //             label: 'Editar',
        //             data: 'embaladoresEditar',
        //             key: 'embaladoresEditar'
        //           }
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     label: 'Relatórios',
        //     data: 'relatoriosNode',
        //     key: 'relatoriosNode',
        //     children: [
        //       {
        //         label: 'Relatório',
        //         data: 'relatorio',
        //         key: 'relatorio',
        //         children:[
        //           {
        //             label: 'Visualizar',
        //             data: 'relatorioVisualizar',
        //             key: 'relatorioVisualizar'
        //           },
        //         ]
        //       },
        //     ]
        //   }
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
