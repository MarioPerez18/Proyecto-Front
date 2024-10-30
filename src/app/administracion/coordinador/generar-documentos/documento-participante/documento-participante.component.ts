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
  tipo_participante:string;
  plantilla:any[];
  url_plantilla:string;
  tipo_plantilla:string;
  png_qr:string;
  
  coordenada_x_mm:number;
  coordenada_y_mm:number;
  //coordenada_x:number;
  //coordenada_y:number;

  coordenada_x_mm_qr:number;
  coordenada_y_mm_qr:number;
  //coordenada_x_qr:number;
  //coordenada_y_qr:number;

  coordenada_x_mm_descripcion:number;
  coordenada_y_mm_descripcion:number;
  //coordenada_x_descripcion:number;
  //coordenada_y_descripcion:number;

  position_nombres:any; // Coordenadas iniciales
  position_descripcion:any;
  position_imagen:any;


  constructor(private api: DataService,private route: ActivatedRoute, private router: Router,
    private coordenadasService: CoordenadasService
  ){}
  

  ngOnInit(){
    this.obtener_participantes();  
    this.tipo_participante = this.route.snapshot.params['tipo_participante'];
     console.log(this.tipo_participante);
    //console.log(this.tipo_participante);
    this.obtener_plantilla_documento();
    switch(this.tipo_participante){
      case "coordinador":
        this.position_nombres = {x:this.coordenadasService.coordenadass_coordi[0].coordenada_x, y:this.coordenadasService.coordenadass_coordi[0].coordenada_y};
        this.position_descripcion = {x:this.coordenadasService.coordenadass_coordi[0].coordenada_x_descripcion, y:this.coordenadasService.coordenadass_coordi[0].coordenada_y_descripcion};
        this.position_imagen = {x:this.coordenadasService.coordenadass_coordi[0].coordenada_x_qr, y:this.coordenadasService.coordenadass_coordi[0].coordenada_y_qr};
        break;
      case "ponente":
        this.position_nombres = {x:this.coordenadasService.coordenadass_ponente[0].coordenada_x, y:this.coordenadasService.coordenadass_ponente[0].coordenada_y};
        this.position_descripcion = {x:this.coordenadasService.coordenadass_ponente[0].coordenada_x_descripcion, y:this.coordenadasService.coordenadass_ponente[0].coordenada_y_descripcion};
        this.position_imagen = {x:this.coordenadasService.coordenadass_ponente[0].coordenada_x_qr, y:this.coordenadasService.coordenadass_ponente[0].coordenada_y_qr};
        break;
      default:
        console.log("algo salió mal");

    }  
  }


  obtener_participantes(){
    this.api.get_participants().subscribe((data:any) => {
      this.participantes = data;
      this.participantes = this.participantes.filter((participante:any)=>{
        return participante.TipoParticipante == this.tipo_participante;
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


  onDragReleased(event: CdkDragRelease<any>) {
    if(this.dragContainer){
      // Obtener las coordenadas del elemento
      const containerRect = this.dragContainer.nativeElement.getBoundingClientRect();
      
      // Obtener el rectángulo del elemento arrastrado
      const draggedElementRect = event.source.element.nativeElement.getBoundingClientRect();
  
      // Calcular las coordenadas relativas al contenedor
      const relativeX = draggedElementRect.left - containerRect.left;
      const relativeY =  draggedElementRect.top - containerRect.top;

      // Asegurarse de que las coordenadas no son negativas ni exceden el contenedor
      const adjustedX = Math.max(0, Math.min(relativeX, containerRect.width - draggedElementRect.width));
      const adjustedY = Math.max(0, Math.min(relativeY, containerRect.height - draggedElementRect.height));
      
      
      // Calcular coordenadas relativas en porcentaje
      const relativeXPercent = (adjustedX / containerRect.width) * 100;
      const relativeYPercent = (adjustedY / containerRect.height) * 100;
    
      // Conversión de píxeles a milímetros, ajustando con la proporción de la página A4
      const containerWidthInMm = 300;  // Ancho de A4 en mm
      const containerHeightInMm = 210; // Alto de A4 en mm

     
      // Convertir coordenadas relativas (proporcionales) a milímetros
      this.coordenada_x_mm = Math.trunc((relativeXPercent / 100) * containerWidthInMm) - 20;
      this.coordenada_y_mm = Math.trunc((relativeYPercent / 100) * containerHeightInMm);
      

    }else{
      console.log("contenedor no encontrado");
    }
  }

  coordenadas_png_qr(event: CdkDragRelease<any>){
    // Obtener las coordenadas del elemento
    const containerRect = this.dragContainer.nativeElement.getBoundingClientRect();
      
    // Obtener el rectángulo del elemento arrastrado
    const draggedElementRect = event.source.element.nativeElement.getBoundingClientRect();

    // Calcular las coordenadas relativas al contenedor
    const relativeX = draggedElementRect.left - containerRect.left;
    const relativeY =  draggedElementRect.top - containerRect.top;

    // Asegurarse de que las coordenadas no son negativas ni exceden el contenedor
    const adjustedX = Math.max(0, Math.min(relativeX, containerRect.width - draggedElementRect.width));
    const adjustedY = Math.max(0, Math.min(relativeY, containerRect.height - draggedElementRect.height));
    
    
    // Calcular coordenadas relativas en porcentaje
    const relativeXPercent = (adjustedX / containerRect.width) * 100;
    const relativeYPercent = (adjustedY / containerRect.height) * 100;
  
    // Conversión de píxeles a milímetros, ajustando con la proporción de la página A4
    const containerWidthInMm = 300;  // Ancho de A4 en mm
    const containerHeightInMm = 210; // Alto de A4 en mm

    // Convertir coordenadas relativas (proporcionales) a milímetros
    this.coordenada_x_mm_qr = Math.trunc((relativeXPercent / 100) * containerWidthInMm);
    this.coordenada_y_mm_qr = Math.trunc((relativeYPercent / 100) * containerHeightInMm);
  }

  coordenadas_descripcion(event: CdkDragRelease<any>){
     // Obtener las coordenadas del elemento
     const containerRect = this.dragContainer.nativeElement.getBoundingClientRect();
      
     // Obtener el rectángulo del elemento arrastrado
     const draggedElementRect = event.source.element.nativeElement.getBoundingClientRect();
 
     // Calcular las coordenadas relativas al contenedor
     const relativeX = draggedElementRect.left - containerRect.left;
     const relativeY =  draggedElementRect.top - containerRect.top;
 
     // Asegurarse de que las coordenadas no son negativas ni exceden el contenedor
     const adjustedX = Math.max(0, Math.min(relativeX, containerRect.width - draggedElementRect.width));
     const adjustedY = Math.max(0, Math.min(relativeY, containerRect.height - draggedElementRect.height));
     
     
     // Calcular coordenadas relativas en porcentaje
     const relativeXPercent = (adjustedX / containerRect.width) * 100;
     const relativeYPercent = (adjustedY / containerRect.height) * 100;
   
     // Conversión de píxeles a milímetros, ajustando con la proporción de la página A4
     const containerWidthInMm = 300;  // Ancho de A4 en mm
     const containerHeightInMm = 210; // Alto de A4 en mm
 
     // Convertir coordenadas relativas (proporcionales) a milímetros
     this.coordenada_x_mm_descripcion = Math.trunc((relativeXPercent / 100) * containerWidthInMm) - 7;
     this.coordenada_y_mm_descripcion = Math.trunc((relativeYPercent / 100) * containerHeightInMm);

  }

  
  /*oordenadas(){
    const coordenadas = {
      coordenada_x:this.coordenada_x_mm,
      coordenada_y:this.coordenada_y_mm,
      coordenada_x_qr:this.coordenada_x_mm_qr,
      coordenada_y_qr:this.coordenada_y_mm_qr,
      coordenada_x_descripcion:this.coordenada_x_mm_descripcion,
      coordenada_y_descripcion:this.coordenada_y_mm_descripcion

    }
    this.coordenadasService.agregar_coordenada(coordenadas);
    console.log(coordenadas);
  }*/

    /*pixelsToMm = (pixels:any) => {
      const ppi = 96; // resolución estándar
      const inches = pixels / ppi; // convertimos a pulgadas
      const mm = inches * 25.4; // convertimos a milímetros
      return mm;

      const ppi = 96; // resolución estándar
      const inches = pixels / ppi; // convertimos a pulgadas
      const mm = inches * 25.4; // convertimos a milímetros
      return mm;
    };*/

    pixeles_a_mm(nombres_y_px:number, nombres_x_px:number,imagen_y_px:number,imagen_x_px:number,descripcion_y_px:number,descripcion_x_px:number){
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

    }



    coordenadas(position_nombres_y:number, position_nombres_x:number, position_imagen_y:number, position_imagen_x:number,position_descripcion_y:number,position_descripcion_x:number){
      this.pixeles_a_mm(position_nombres_y,position_nombres_x,position_imagen_y,position_imagen_x,position_descripcion_y,position_descripcion_x);
    
        const coordenadas = {
          coordenada_x:this.coordenada_x_mm,
          coordenada_y:this.coordenada_y_mm,
          coordenada_x_qr:this.coordenada_x_mm_qr,
          coordenada_y_qr:this.coordenada_y_mm_qr,
          coordenada_x_descripcion:this.coordenada_x_mm_descripcion,
          coordenada_y_descripcion:this.coordenada_y_mm_descripcion
    
        }
      
      //this.coordenadasService.agregar_coordenada(coordenadas);
      console.log("Coordenadas_finales: " + " nombres_x: " + coordenadas.coordenada_x + " mm, " + "nombres_y: " + coordenadas.coordenada_y + " mm, "
        + " qr_x: " + coordenadas.coordenada_x_qr + " qr_y: " + coordenadas.coordenada_y_qr + ", descripcion_x: " + coordenadas.coordenada_x_descripcion +
        " descripcion_y: " + coordenadas.coordenada_y_descripcion
      );
    }
  
}
