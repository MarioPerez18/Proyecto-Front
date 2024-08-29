import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {
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
