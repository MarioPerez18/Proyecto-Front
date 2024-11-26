import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2'

interface ParticipantType{
  id:number,
  participantType:string
}

interface DocumentType{
  id:number,
  type:string,
  description:string

}

@Component({
  selector: 'app-registrar-tipo-participante',
  templateUrl: './registrar-tipo-participante.component.html',
  styleUrls: ['./registrar-tipo-participante.component.css']
})
export class RegistrarTipoParticipanteComponent implements OnInit {
  tipos_de_participantes: ParticipantType[];
  tipos_de_documentos: DocumentType[];
  id_tipo_participante:number;
  id_tipo_documento:number;
  id_participante_tipo:number;


  constructor(private api: DataService){}
  

  ngOnInit(){
    this.obtener_tipos_de_participantes();
    this.obtener_tipos_de_documentos();
  }


  obtener_tipos_de_participantes(){
    this.api.get_participant_types().subscribe((data:any) => {
      this.tipos_de_participantes = data;
      data.forEach((tipo:any) => {
        this.id_participante_tipo = tipo.id;
      });
    });
  }

  obtener_tipos_de_documentos(){
    this.api.get_document_types().subscribe((data:any) => {
      this.tipos_de_documentos = data;
    });
  }

  recuperar_id_tipo_participante(participante_id:number){
    this.id_tipo_participante = participante_id;
  }

  recupera_id_documento(tipo_documento_id:number){
    this.id_tipo_documento = tipo_documento_id;
  }


  registrar_tipos_de_participantes(form: NgForm){
    
    const tipo_participante: ParticipantType = {
      id: ++this.id_participante_tipo,
      participantType:form.value.participantType
    };
    
    this.api.register_participant_type(tipo_participante)
    .subscribe(
      (respuesta:any) => {
          Swal.fire({
              title: respuesta.respuesta,
              icon: respuesta.icono,
              confirmButtonText: 'Ok'
          })
          this.tipos_de_participantes.push(tipo_participante);
      },
      error =>
          Swal.fire({
              title: "No se pudo proceder",
              icon: "error",
              confirmButtonText: 'Ok'
          })
    );
  }

  asignar_plantilla(){
    const plantilla_participante = {
      participant_type_id: this.id_tipo_participante,
      document_type_id: this.id_tipo_documento
    }
    this.api.asignar_plantilla_participante(plantilla_participante); 
  }
}
