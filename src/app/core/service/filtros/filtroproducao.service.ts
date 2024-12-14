import { Injectable } from '@angular/core';
import { FiltrosProducao } from '../../models/filtro.model';

@Injectable({
  providedIn: 'root'
})
export class FiltroProducaoService {

constructor() { }


Parametros(filtros: any) {
  const params = [];

  Object.entries(filtros).forEach(([key, param]: [string, any]) => {
    if (param && Array.isArray(param)) {
      param.forEach((filter: any) => {
        if (filter.value) {
          const filterValue = filter.value;
          const matchMode = filter.matchMode;

          switch (key) {
            case 'nomemaquina':
              const [nomeMaquina, numeroMaquina] = filterValue.split(' '); // Exemplo de separação
              if (nomeMaquina) {
                params.push(`maquina__nome${this.getModo(matchMode)}=${nomeMaquina}`);
              }
              if (numeroMaquina) {
                params.push(`maquina__numero${this.getModo(matchMode)}=${numeroMaquina}`);
              }
              break;

            case 'nomeproduto':
              params.push(`produto__nome${this.getModo(matchMode)}=${filterValue}`);
              break;

            case 'nomeatributo':
              params.push(`atributo__nome${this.getModo(matchMode)}=${filterValue}`);
              break;
  

            case 'nomeembalador':
              params.push(`embalador__nome${this.getModo(matchMode)}=${filterValue}`);
              break;

            case 'nomeoperador':
              params.push(`operador__nome${this.getModo(matchMode)}=${filterValue}`);
              break;

            case 'data':
              const formattedDate = this.formatDate(filterValue);
              params.push(`data${this.getModo(matchMode)}=${formattedDate}`);
              break;

            default:
              // Padrão genérico para outros campos
              params.push(`${key}${this.getModo(matchMode)}=${filterValue}`);
          }
        }
      });
    }
  });

  return params.length > 0 ? `&${params.join('&')}` : '';
}

  getModo(matchMode: string): string {
    // Mapeamento de matchMode para modos DRF (alguns modos nao existem)
    const modos = {
      'contains': '__icontains',
      'notContains': '',
      'startsWith': '__istartswith',
      'endsWith': '__iendswith',
      'equals': '',
      'notEquals': '',
      'dateIs': '',
      'dateIsNot': '',
      'dateBefore': '__lte',
      'dateAfter': '__gte',
      'gte': '__gte',
      'lte': '__lte',
    };

    return modos[matchMode];
  }

  formatDate(date: Date): string {
    const isoString = new Date(date).toISOString();
    return isoString.split('.000Z')[0];; // Retorna apenas a parte da data
  }
}
