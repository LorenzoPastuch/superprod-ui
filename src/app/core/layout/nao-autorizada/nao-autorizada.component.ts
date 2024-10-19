import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-nao-autorizada',
  templateUrl: './nao-autorizada.component.html',
  styleUrls: ['./nao-autorizada.component.css']
})
export class NaoAutorizadaComponent implements OnInit {

  constructor(private conf: PrimeNGConfig) { }

  ngOnInit() {
    this.conf.ripple = true;
  }

}
