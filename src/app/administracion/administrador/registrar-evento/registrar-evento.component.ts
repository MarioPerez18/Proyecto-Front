import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-registrar-evento',
  templateUrl: './registrar-evento.component.html',
  styleUrls: ['./registrar-evento.component.css'],
})
export class RegistrarEventoComponent implements OnInit {
  eventos: any[] = [];
  usuarios: any[] = [];
  id_usuario: number = 0;
  id_evento: number = 0;
  id:number = 0;
 
  constructor(private api: DataService) {}

  ngOnInit() {
    this.obtener_eventos();
    this.obtener_usuarios();
  }
  
  obtener_eventos() {
    this.api.get_events().subscribe((data: any) => {
      this.eventos = data;

      data.forEach((evento:any) => {
        this.id = evento.id
      });
    });
  }

  obtener_usuarios() {
    this.api.get_users().subscribe((data: any) => {
      this.usuarios = data.filter(function(usuario:any){
        return usuario.role == "participante";
      });
    });
  }

  recupera_id_usuario(id_usuario:number){
    this.id_usuario = id_usuario;
  }

  recuperar_id_evento(id_evento: number) {
    this.id_evento = id_evento;
  }

 
  ingresar_coordinador(){
    const usuario_coordinador = {
      user_id: this.id_usuario,
      event_id: this.id_evento,
      participant_type_id:2
    }
    this.api.asignar_coordinador_evento(usuario_coordinador);
  }


  asignar_coordinador(){
    this.ingresar_coordinador();
  }

  
  registrar_evento(form: NgForm){
    const startDate = form.value.startDate;
    const endDate = form.value.endDate;
    const nameEvent = form.value.nameEvent;
    const description = form.value.description;

    const evento = {
      id:++this.id,
      startDate,
      endDate,
      nameEvent,
      description
    }

    this.api.register_new_event(evento).subscribe(
      (respuesta: any) => {
        Swal.fire({
          title: respuesta.respuesta,
          icon: respuesta.icono,
          confirmButtonText: 'Ok',
        });
        this.eventos.push(evento);
      },
      (error) => {
        Swal.fire({
          title: 'Intentalo de nuevo',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }


  eliminar_evento(id_evento:number){
    Swal.fire({
      title: "Estas seguro?",
      text: "No se podrá revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {

      if (result.isConfirmed) {
        this.api.delete_event(id_evento)
        .subscribe(
          (respuesta:any) => {
            Swal.fire({
             title: "Evento eliminado",
             text: respuesta.respuesta,
             icon: respuesta.icono
            });
            this.eventos = this.eventos.filter((evento) => {return evento.id != id_evento});
          }
        ) 
      }
    });
  }
}
