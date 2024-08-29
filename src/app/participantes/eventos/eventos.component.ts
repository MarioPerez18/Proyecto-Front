import { Component, OnInit } from '@angular/core';
import { event } from 'jquery';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventos:any[] = [];
  id_usuario: number | null = null;

  constructor(private api: DataService){}


  ngOnInit() {
    this.todos_los_eventos();
      
  }

  todos_los_eventos(){
    this.api.get_events().subscribe((data:any) => {
      this.eventos = data;
      console.log(data);
    })
  }

  inscribirse(id_evento:any){
    const usuario = {
      user_id:this.id_usuario = Number(sessionStorage.getItem("id_usuario")),
      event_id:id_evento,
      participant_type_id:1
    }

    this.api.register_event(usuario);
    //console.log(typeof id_evento);
  }
}
