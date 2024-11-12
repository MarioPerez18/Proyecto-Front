import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../data.service';
import { CdkDragRelease } from '@angular/cdk/drag-drop';
import { CoordenadasService } from '../../generar-documentos/coordenadas.service';

@Component({
  selector: 'app-tipo-plantilla',
  templateUrl: './tipo-plantilla.component.html',
  styleUrls: ['./tipo-plantilla.component.css']
})
export class TipoPlantillaComponent implements OnInit {
  @ViewChild('dragContainer', { static: false }) dragContainer!: ElementRef;
  plantilla:any[];
  url_plantilla:string;
  tipo_participante:string;

  showDiv: boolean = false;
  descripcionDiv: boolean = false;
  imgDiv: boolean = false;
  fecha_finalizacionDiv: boolean = false;
  

  position_nombres_coordinador = { x:350 , y:380 }; // Coordenadas iniciales
  position_descripcion_coordinador = {x:300, y:430 };
  position_imagen_coordinador = {x:400, y:640 };
  position_fecha_coordinador = {x: 600, y: 320};

  position_nombres_ponente = { x: 320, y: 370 }; // Coordenadas iniciales
  position_descripcion_ponente = {x: 374, y: 310};
  position_imagen_ponente = {x: 643, y: 533};
  position_fecha_ponente = {x: 603, y: 454};

  
  coordenada_x_px:number;
  coordenada_y_px:number;
  
  coordenada_x_px_qr:number;
  coordenada_y_px_qr:number;
 
  coordenada_x_px_descripcion:number;
  coordenada_y_px_descripcion:number;

  coordenada_x_px_fecha:number;
  coordenada_y_px_fecha:number;


  
  @ViewChild('divNombre') divNombre: ElementRef;
  @ViewChild('divImagen') divImagen: ElementRef;
  @ViewChild('divDescripcion') divDescripcion: ElementRef;

  @ViewChild('divNombrePonente') divNombrePonente: ElementRef;
  @ViewChild('divImagenPonente') divImagenPonente: ElementRef;
  @ViewChild('divDescripcionPonente') divDescripcionPonente: ElementRef;
  @ViewChild('divFechaPonente') divFechaPonente: ElementRef;

  constructor(private route: ActivatedRoute, private api: DataService,  private coordenadasService: CoordenadasService){}

  ngOnInit(): void {
      this.tipo_participante =  this.route.snapshot.params['tipo-plantilla'];
      this.obtener_plantilla_documento();
     
  }

  coordinador(){
    return this.tipo_participante == "coordinador";
  }

  ponente(){
    return this.tipo_participante == "ponente";
  }


  obtener_plantilla_documento(){
    this.api.get_document_type(this.tipo_participante).subscribe((data:any) => {
      this.plantilla = data;
      this.url_plantilla = this.plantilla[1];
    });
  }

  nombreDiv(event: any){
    this.showDiv = event.target.checked;
    if (this.showDiv) {
      //ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 100; // Nueva coordenada Y
    }

  }

  descripcioneDiv(event: any){
    this.descripcionDiv = event.target.checked;
    if (this.descripcionDiv) {
      //ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 150; // Nueva coordenada Y
    }

  }

  imagenDiv(event: any){
    this.imgDiv = event.target.checked;
    if (this.imgDiv) {
      //ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 150; // Nueva coordenada Y
    }
  }

  fechaDiv(event: any){
    this.fecha_finalizacionDiv = event.target.checked;
    if (this.fecha_finalizacionDiv) {
      //ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 150; // Nueva coordenada Y
    }
  }

  nombreDivPonente(event: any){
    this.showDiv = event.target.checked;
    if (this.showDiv) {
      //ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 100; // Nueva coordenada Y
    }

  }

  descripcioneDivPonente(event: any){
    this.descripcionDiv = event.target.checked;
    if (this.descripcionDiv) {
      //ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 150; // Nueva coordenada Y
    }

  }

  imagenDivPonente(event: any){
    this.imgDiv = event.target.checked;
    if (this.imgDiv) {
      //ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 150; // Nueva coordenada Y
    }
  }

  onDragReleased(event: CdkDragRelease<any>) {
    if (this.dragContainer) {
      // Obtener las coordenadas del contenedor
      const containerRect = this.dragContainer.nativeElement.getBoundingClientRect();
  
      // Obtener el rectángulo del elemento arrastrado
      const draggedElementRect = event.source.element.nativeElement.getBoundingClientRect();
  
      // Calcular las coordenadas relativas al contenedor
      const relativeX = draggedElementRect.left - containerRect.left;
      const relativeY = draggedElementRect.top - containerRect.top;
  
      // Asegurarse de que las coordenadas no son negativas ni exceden el contenedor
      const adjustedX = Math.max(0, Math.min(relativeX, containerRect.width - draggedElementRect.width));
      const adjustedY = Math.max(0, Math.min(relativeY, containerRect.height - draggedElementRect.height));
  
      // Guardar las coordenadas directamente en píxeles
      this.coordenada_x_px = Math.trunc(adjustedX);
      this.coordenada_y_px = Math.trunc(adjustedY);
  
      console.log(`Nueva coordenada X en px: ${this.coordenada_x_px}`);
      console.log(`Nueva coordenada Y en px: ${this.coordenada_y_px}`);
    } else {
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

    // Guardar las coordenadas directamente en píxeles
    this.coordenada_x_px_qr = Math.trunc(adjustedX);
    this.coordenada_y_px_qr = Math.trunc(adjustedY);
  }

  coordenadas_descripcion(event: CdkDragRelease<any>){
    //Se obtienen las coordenadas del elemento
    const contenedor = this.dragContainer.nativeElement.getBoundingClientRect();
     
    //Se obtiene el div del elemento arrastrado
    const elemento_arrastrable = event.source.element.nativeElement.getBoundingClientRect();

    // Se calculan las coordenadas relativas al contenedor
    const relativoX = elemento_arrastrable.left - contenedor.left;
    const relativoY =  elemento_arrastrable.top - contenedor.top;

    //Se asegura de que las coordenadas no son negativas ni exceden el contenedor
    const adjustedX = Math.max(0, Math.min(relativoX, contenedor.width - elemento_arrastrable.width));
    const adjustedY = Math.max(0, Math.min(relativoY, contenedor.height - elemento_arrastrable.height));

     //Se guardan las coordenadas directamente en píxeles
     this.coordenada_x_px_descripcion = Math.trunc(adjustedX);
     this.coordenada_y_px_descripcion = Math.trunc(adjustedY);
 }

 coordenadas_fecha(event: CdkDragRelease<any>){
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

  // Guardar las coordenadas directamente en píxeles
  this.coordenada_x_px_fecha = Math.trunc(adjustedX);
  this.coordenada_y_px_fecha = Math.trunc(adjustedY);
}


  coordenadas_coordinador(){
    const coordenadas = {
      coordenada_x:this.coordenada_x_px || this.position_nombres_coordinador.x,
      coordenada_y:this.coordenada_y_px || this.position_nombres_coordinador.y,
      coordenada_x_qr:this.coordenada_x_px_qr || this.position_imagen_coordinador.x,
      coordenada_y_qr:this.coordenada_y_px_qr || this.position_imagen_coordinador.y,
      coordenada_x_descripcion:this.coordenada_x_px_descripcion || this.position_descripcion_coordinador.x,
      coordenada_y_descripcion:this.coordenada_y_px_descripcion || this.position_descripcion_coordinador.y
    }

    this.coordenadasService.agregar_coordenada_coordinador(coordenadas);



    console.log(coordenadas);
  }

  coordenadas_ponente(){
    const coordenadas = {
      coordenada_x:this.coordenada_x_px  || this.position_nombres_ponente.y,
      coordenada_y:this.coordenada_y_px  || this.position_nombres_ponente.x,
      coordenada_x_qr:this.coordenada_x_px_qr || this.position_imagen_ponente.y,
      coordenada_y_qr:this.coordenada_y_px_qr || this.position_imagen_ponente.x,
      coordenada_x_descripcion:this.coordenada_x_px_descripcion || this.position_descripcion_ponente.y,
      coordenada_y_descripcion:this.coordenada_y_px_descripcion || this.position_descripcion_ponente.x,
      coordenada_y_fecha:this.coordenada_x_px_fecha || this.position_fecha_ponente.y,
      coordenada_x_fecha:this.coordenada_y_px_fecha || this.position_fecha_ponente.x
    }
    this.coordenadasService.agregar_coordenada_ponente(coordenadas);
    console.log(coordenadas);

  }

}
