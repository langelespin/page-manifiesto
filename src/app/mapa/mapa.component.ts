import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../services/paises.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor(
    private paisesService: PaisesService
  ){

  }

  ngOnInit(): void {
    this.paisesService.getDatosPaisesMap().subscribe(resp =>{
      console.log("paises", resp)
    })
  }

}
