import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import 'datatables.net';
declare var $:any;




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


  constructor(private api: DataService){}


  ngOnInit(){
    this.obtener_participantes();   
  }


  obtener_participantes(){
    this.api.get_participants().subscribe((data:any) => {
      this.participantes = data;
      //console.log(this.participantes);
    })
  }


  generarPDF(){
    this.participantes.forEach((participante) => {
      //console.log(participante);
      this.api.generate_document(participante);
    });
   
  }

  

}

