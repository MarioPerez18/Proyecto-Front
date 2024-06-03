import { Component } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-registrar-evento',
  templateUrl: './registrar-evento.component.html',
  styleUrls: ['./registrar-evento.component.css']
})
export class RegistrarEventoComponent {

  eventos:any[] = [];

  constructor(private api: DataService){}

  ngOnInit(){
    this.obtener_eventos();
  }

  obtener_eventos(){
    this.api.get_events().subscribe((data:any) => {
      this.eventos = data;
    })
  }

}
