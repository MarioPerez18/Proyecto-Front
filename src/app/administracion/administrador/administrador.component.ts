import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';



@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css',]
})


export class AdministradorComponent implements OnInit {
  nombre_usuario: string | null = null;

  constructor(private dataService: DataService){}

  ngOnInit(){
    this.nombre_usuario = sessionStorage.getItem("nombre_usuario");
  }

  es_autenticado(){
    return this.dataService.es_autenticado();
  }

  cerrar_sesion(){
    this.dataService.cierra_sesion();
  }


}
