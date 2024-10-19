import { Injectable } from '@angular/core';
import { FiltrosProducao } from '../../models/filtro.model';

@Injectable({
  providedIn: 'root'
})
export class FiltroproducaoService {

constructor() { }


async filtro(value: any, oldFiltro: FiltrosProducao): Promise<FiltrosProducao> {
  let filtro = new FiltrosProducao();

  filtro = { ...oldFiltro };

  filtro.pagina = 0;
  filtro.itensPorPagina = 10;

  // if (value.field === 'id') {
  //   filtro.id = value.qty;
  // }
 
  // if (value.field === 'nomeOperador') {
  //   filtro.nomeOperador = value.qty;
  // }
  if (value.field === 'nomeMaquina') {
    filtro.nomeMaquina = value.qty;
  }
  if (value.field === 'nomeProduto') {
    filtro.nomeProduto = value.qty;
  }
  if (value.field === 'nomeatributo') {
    filtro.nomeAtributo = value.qty;
  }
  if (value.field === 'quantidade') {
    filtro.quantidade = value.qty;
  }
  if (value.field === 'lote') {
    filtro.lote = value.qty;
  }
  if (value.field === 'status') {
    filtro.status = value.qty;
  }
  if (value.field === 'loginusuario') {
    filtro.loginusuario = value.qty;
  }
  return filtro;
}

}
