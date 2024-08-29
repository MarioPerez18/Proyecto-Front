import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';



@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit {
  eventos: any[] = [];
  id_evento:number = 0;
  uri_evento:string = "";
  nombre_evento_input:string = "";
  descripcion_input:string = "";
  fecha_inicio_input:string = "";
  fecha_fin_input:string = "";
  
 
  constructor(private route: ActivatedRoute, private api: DataService){}

  ngOnInit(){
    this.obtener_eventos();
    this.uri_evento = this.route.snapshot.params['evento'].replaceAll("-", " ");
  }

  obtener_eventos() {
    this.api.get_events().subscribe((data: any) => {
      this.eventos = data;
      
      let evento = this.eventos.find((evento:any) => {return evento.nameEventUri == this.uri_evento});
      this.id_evento = evento.id;
      this.nombre_evento_input = evento.nameEvent;
      this.descripcion_input = evento.description;
      this.fecha_inicio_input = evento.startDate;
      this.fecha_fin_input = evento.endDate;
    });
  }

  editar_evento(){
    const startDate = this.fecha_inicio_input;
    const endDate = this.fecha_fin_input;
    const nameEvent = this.nombre_evento_input;
    const description = this.descripcion_input;

    const evento = {
      startDate,
      endDate,
      nameEvent,
      description
    }
    this.api.update_event(evento, this.id_evento);
  }
}
