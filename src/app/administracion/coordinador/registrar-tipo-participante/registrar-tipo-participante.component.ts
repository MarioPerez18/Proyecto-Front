import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/data.service';

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


  constructor(private api: DataService){}
  

  ngOnInit(){
    this.obtener_tipos_de_participantes();
    this.obtener_tipos_de_documentos();
  }


  obtener_tipos_de_participantes(){
    this.api.get_participant_types().subscribe((data:any) => {
      this.tipos_de_participantes = data;
    });
  }

  obtener_tipos_de_documentos(){
    this.api.get_document_types().subscribe((data:any) => {
      this.tipos_de_documentos = data;
    });
  }

  recuperar_id_tipo_participante(participante_id:number){
    this.id_tipo_participante = participante_id;
    console.log( this.id_tipo_participante);
  }

  recupera_id_documento(tipo_documento_id:number){
    this.id_tipo_documento = tipo_documento_id;
    console.log(this.id_tipo_documento);
  }


  registrar_tipos_de_participantes(form: NgForm){
    
    const tipo_participante = {
      participantType:form.value.participantType
    };
    this.api.register_participant_type(tipo_participante);
  }

  asignar_plantilla(){
    const plantilla_participante = {
      participant_type_id: this.id_tipo_participante,
      document_type_id: this.id_tipo_documento
    }
    this.api.asignar_plantilla_participante(plantilla_participante);
    
  }

}
