import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';



@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css',]
})


export class AdministradorComponent {

  constructor(private dataService: DataService){}

  es_autenticado(){
    return this.dataService.es_autenticado();
  }

  cerrar_sesion(){
    this.dataService.cierra_sesion();
  }


}
