import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-generar-documentos',
  templateUrl: './generar-documentos.component.html',
  styleUrls: ['./generar-documentos.component.css']
})
export class GenerarDocumentosComponent implements OnInit {

  genera_documentos:string = 'Generar documentos';
  btn_generar_pdf:string = 'generar PDF';
  envia_documentos:string = 'Enviar documentos';
  btn_enviar_pdf:string = 'Enviar correo';

  participantes:any[] = [];
  id_coordinador = sessionStorage.getItem("id_usuario");

  constructor(private api: DataService){}


  ngOnInit(){
    this.obtener_participantes();   
  }


  obtener_participantes(){
    this.api.get_participants().subscribe((data:any) => {
      this.participantes = data;
      let encontrar_usuario_coordinador = this.participantes.find((participante:any) => {return participante.id_participante == this.id_coordinador});
      this.participantes = this.participantes.filter((participante:any) => {return participante.Evento == encontrar_usuario_coordinador.Evento});
    });
  }

  
  
  generarPDF(){
    this.participantes.forEach((participante) => {
      this.api.generate_document(participante);
    });
  }

  

}

