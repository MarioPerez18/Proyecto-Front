import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CdkDragRelease } from '@angular/cdk/drag-drop';
import { DataService } from '../../../../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CoordenadasService } from '../coordenadas.service';

@Component({
  selector: 'app-documento-participante',
  templateUrl: './documento-participante.component.html',
  styleUrls: ['./documento-participante.component.css']
})
export class DocumentoParticipanteComponent implements OnInit {
  @ViewChild('dragContainer', { static: false }) dragContainer!: ElementRef;

  participantes:any[] = [];
  id_participante:number;
  tipo_participante:string;
  plantilla:any[];
  url_plantilla:string;
  tipo_plantilla:string;
  png_qr:string;
  
  coordenada_x_mm:number;
  coordenada_y_mm:number;
 

  coordenada_x_mm_qr:number;
  coordenada_y_mm_qr:number;


  coordenada_x_mm_descripcion:number;
  coordenada_y_mm_descripcion:number;


  coordenada_x_mm_fecha:number;
  coordenada_y_mm_fecha:number;

  position_nombres:any; // Coordenadas iniciales
  position_descripcion:any;
  position_imagen:any;
  position_fecha:any;


  constructor(private api: DataService,private route: ActivatedRoute, private router: Router,
    private coordenadasService: CoordenadasService
  ){}
  

  ngOnInit(){
    this.obtener_participantes();  
    this.tipo_participante = this.route.snapshot.params['tipo_participante'];
    this.id_participante = this.route.snapshot.params['id_participante'];
     console.log(this.tipo_participante);
    //console.log(this.tipo_participante);
    this.obtener_plantilla_documento();
    switch(this.tipo_participante){
      case "coordinador":
        this.position_nombres = {x:this.coordenadasService.coordenadass_coordi[0].coordenada_x, y:this.coordenadasService.coordenadass_coordi[0].coordenada_y};
        this.position_descripcion = {x:this.coordenadasService.coordenadass_coordi[0].coordenada_x_descripcion, y:this.coordenadasService.coordenadass_coordi[0].coordenada_y_descripcion};
        this.position_imagen = {x:this.coordenadasService.coordenadass_coordi[0].coordenada_x_qr, y:this.coordenadasService.coordenadass_coordi[0].coordenada_y_qr};
        this.position_fecha = {x:this.coordenadasService.coordenadass_coordi[0].coordenada_y_fecha, y:this.coordenadasService.coordenadass_coordi[0].coordenada_x_fecha};
        break;
      case "ponente":
        this.position_nombres = {x:this.coordenadasService.coordenadass_ponente[0].coordenada_x, y:this.coordenadasService.coordenadass_ponente[0].coordenada_y};
        this.position_descripcion = {x:this.coordenadasService.coordenadass_ponente[0].coordenada_x_descripcion, y:this.coordenadasService.coordenadass_ponente[0].coordenada_y_descripcion};
        this.position_imagen = {x:this.coordenadasService.coordenadass_ponente[0].coordenada_x_qr, y:this.coordenadasService.coordenadass_ponente[0].coordenada_y_qr};
        this.position_fecha = {x:this.coordenadasService.coordenadass_ponente[0].coordenada_y_fecha, y:this.coordenadasService.coordenadass_ponente[0].coordenada_x_fecha};
        break;
      default:
        console.log("algo salió mal");

    }  
  }


  obtener_participantes(){
    this.api.get_participants().subscribe((data:any) => {
      this.participantes = data;
      this.participantes = this.participantes.filter((participante:any)=>{
        return participante.TipoParticipante == this.tipo_participante && participante.id == this.id_participante;
      })
    });
  }

  obtener_plantilla_documento(){
    this.api.get_document_type(this.tipo_participante).subscribe((data:any) => {
      this.plantilla = data;
      this.url_plantilla = this.plantilla[1];
      this.png_qr = this.plantilla[2];
    });
  }




    pixeles_a_mm(nombres_y_px:number, nombres_x_px:number,imagen_y_px:number,imagen_x_px:number,descripcion_y_px:number,descripcion_x_px:number,
                 fecha_y_px:number,fecha_x_px:number
    ){
      const ppi = 96; // resolución estándar

      const pulgadas_y_nombres = nombres_y_px / ppi; // convertir a pulgadas
      this.coordenada_y_mm =  Math.trunc(pulgadas_y_nombres * 25.4); // convertir a milímetros

      const pulgadas_x_nombres = nombres_x_px / ppi; // convertir a pulgadas
      this.coordenada_x_mm =  Math.trunc(pulgadas_x_nombres * 25.4); // convertir a milímetros

      const pulgadas_y_imagen = imagen_y_px / ppi; // convertir a pulgadas
      this.coordenada_y_mm_qr = Math.trunc(pulgadas_y_imagen * 25.4); // convertir a milímetros

      const pulgadas_x_imagen = imagen_x_px / ppi; // convertir a pulgadas
      this.coordenada_x_mm_qr = Math.trunc(pulgadas_x_imagen * 25.4); // convertir a milímetros

      const pulgadas_y_descripcion = descripcion_y_px / ppi; // convertir a pulgadas
      this.coordenada_y_mm_descripcion = Math.trunc(pulgadas_y_descripcion * 25.4); // convertir a milímetros

      const pulgadas_x_descripcion = descripcion_x_px / ppi; // convertir a pulgadas
      this.coordenada_x_mm_descripcion = Math.trunc(pulgadas_x_descripcion  * 25.4); // convertir a milímetros

      const pulgadas_y_fecha = fecha_y_px / ppi; // convertir a pulgadas
      this.coordenada_y_mm_fecha = Math.trunc(pulgadas_y_fecha  * 25.4); // convertir a milímetros

      const pulgadas_x_fecha = fecha_x_px / ppi; // convertir a pulgadas
      this.coordenada_x_mm_fecha = Math.trunc(pulgadas_x_fecha  * 25.4); // convertir a milímetros

    }



    coordenadas(position_nombres_y:number, position_nombres_x:number, position_imagen_y:number, position_imagen_x:number,position_descripcion_y:number,position_descripcion_x:number,position_fecha_y:number, position_fecha_x:number){
      this.pixeles_a_mm(position_nombres_y,position_nombres_x,position_imagen_y,position_imagen_x,position_descripcion_y,position_descripcion_x, position_fecha_y,position_fecha_x);
    
        const coordenadas = {
          coordenada_x:this.coordenada_x_mm,
          coordenada_y:this.coordenada_y_mm,
          coordenada_x_qr:this.coordenada_x_mm_qr,
          coordenada_y_qr:this.coordenada_y_mm_qr,
          coordenada_x_descripcion:this.coordenada_x_mm_descripcion,
          coordenada_y_descripcion:this.coordenada_y_mm_descripcion,
          coordenada_x_fecha:this.coordenada_x_mm_fecha,
          coordenada_y_fecha:this.coordenada_y_mm_fecha
        }
      this.coordenadasService.agregar_coordenada(coordenadas);
    }
}
