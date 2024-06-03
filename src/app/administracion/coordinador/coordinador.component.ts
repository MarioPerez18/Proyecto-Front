import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-coordinador',
  templateUrl: './coordinador.component.html',
  styleUrls: ['./coordinador.component.css']
})
export class CoordinadorComponent{

  constructor(private dataService: DataService){}

  es_autenticado(){
    return this.dataService.es_autenticado();
  }

  cerrar_sesion(){
    this.dataService.cierra_sesion();
  }

  
}
