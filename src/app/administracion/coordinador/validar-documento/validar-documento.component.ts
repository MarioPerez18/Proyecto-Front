import { Component, OnInit } from '@angular/core';
import { ValidacionDocumento } from './validacion_documento.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-validar-documento',
  templateUrl: './validar-documento.component.html',
  styleUrls: ['./validar-documento.component.css']
})
export class ValidarDocumentoComponent implements OnInit {
  cadena:string;
  datos_participante:any[] = [];

  fecha:string;
  url_qr:string;
  
  constructor(private validar_documento: ValidacionDocumento){}

  ngOnInit(){
    
  }

  arreglo_datos_participante_vacio(){
    return this.datos_participante.length > 0;
  }

  url_qr_code(url:any){
    this.url_qr = url;

  }

  
  validar_documento_participante(){
    const array_cadena = this.url_qr.split("/");
    this.validar_documento.validar_documento(array_cadena.pop())
    .subscribe(
      (respuesta:any) => {
        const fecha = new Date(respuesta.FechaTermino);
        this.fecha = fecha.toLocaleDateString("es-ES");
        this.datos_participante.push(respuesta);
        console.log(this.datos_participante);
      },
      (error:any) => 
          Swal.fire({
              title: "Error al validar el documento",
              icon: "error",
              confirmButtonText: 'Ok'
          })
    );
  }




}
