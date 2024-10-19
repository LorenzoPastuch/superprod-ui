import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../relatorio.service';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from '../../usuario/usuario.service';
import { MaquinaService } from '../../maquina/maquina.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  dataInicio: Date;
  dataFim: Date;
  mes: string;
  mes1: string;
  ano: string;
  ano1: string;
  maquina: string;
  usuario: string;
  traducao: any;
  usuarios = [];
  maquinas = [];


  meses = [
    { label: 'Janeiro', value: '1' },
    { label: 'Fevereiro', value: '2' },
    { label: 'Março', value: '3' },
    { label: 'Abril', value: '4' },
    { label: 'Maio', value: '5' },
    { label: 'Junho', value: '6' },
    { label: 'Julho', value: '7' },
    { label: 'Agosto', value: '8' },
    { label: 'Setembro', value: '9' },
    { label: 'Outubro', value: '10' },
    { label: 'Novembro', value: '11' },
    { label: 'Dezembro', value: '12' }
  ];

  anos = [
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
  ];

  constructor(
    private relatoriosService: RelatorioService,
    private title: Title,
    private userService: UsuarioService,
    private maquinaService: MaquinaService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Relatórios');
    this.carregarUsuarios();
    this.carregarMaquinas();
  }

  gerarMensalUsuario() {
    this.relatoriosService.relatorioMensalUsuario(this.mes1, this.ano1, this.usuario)
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    });
   }

   gerarMensal() {
    this.relatoriosService.relatorioMensal(this.mes, this.ano)
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    });
   }

   gerarMensalMaquina() {
    this.relatoriosService.relatorioMensalMaquina(this.mes, this.ano, this.maquina)
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    });
   }

   gerarMaquinas() {
     this.relatoriosService.relatorioMaquinas()
     .then(relatorio => {
       const url = window.URL.createObjectURL(relatorio);
       window.open(url);

      });
   }

   gerarMolde() {
     this.relatoriosService.relatorioMolde()
     .then(relatorio => {
       const url = window.URL.createObjectURL(relatorio);
       window.open(url);

      });
   }
   gerarProduto() {
     this.relatoriosService.relatorioProduto()
     .then(relatorio => {
       const url = window.URL.createObjectURL(relatorio);
       window.open(url);

      });
   }



   gerarUsuarios() {
    this.relatoriosService.relatorioUsuarios()
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    });
   }


   carregarUsuarios() {
    return this.userService.listarUsuarios()
      .then(user => {
        this.usuarios = user
          .map(mp => ({ label: mp.nome, value: mp.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  carregarMaquinas() {
    return this.maquinaService.listarMaquina()
      .then(obj => {
        this.maquinas = obj
          .map(mp => ({ label: mp.nome, value: mp.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  gerarProducaoFiltro() {
    this.relatoriosService.relatorioProucaoFiltro(this.dataInicio, this.dataFim)
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    });
   }

}
