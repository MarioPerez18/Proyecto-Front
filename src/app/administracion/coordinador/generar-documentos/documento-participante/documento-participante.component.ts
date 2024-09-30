import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CdkDragEnd  } from '@angular/cdk/drag-drop';
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
  coordenada_x_mm:number;
  coordenada_y_mm:number;
  coordenada_x:number;
  coordenada_y:number;

 


  constructor(private api: DataService,private route: ActivatedRoute, private router: Router,
    private coordenadasService: CoordenadasService
  ){}
  

  ngOnInit(){
    this.obtener_participantes();  
    this.tipo_participante = this.route.snapshot.params['tipo_participante'];
    console.log(this.tipo_participante);
    this.obtener_plantilla_documento();
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
    });
  }


  onDragReleased(event: CdkDragRelease<any>) {
    // Obtener el elemento DOM
    // Obtener las coordenadas del elemento
    //const rect = this.dragContainer.nativeElement.getBoundingClientRect();
    //const element = event.source.element.nativeElement;
    // Obtener la posición del contenedor
    if(this.dragContainer){
      const containerRect = this.dragContainer.nativeElement.getBoundingClientRect();
      // Obtener la posición global del elemento arrastrado
      //const { x, y } = event.source.getFreeDragPosition();
      // Obtener el rectángulo del elemento arrastrado
      const draggedElementRect = event.source.element.nativeElement.getBoundingClientRect();
  
      // Calcular las coordenadas relativas al contenedor
      const relativeX = draggedElementRect.left - containerRect.left;
      const relativeY =  draggedElementRect.top - containerRect.top;

      // Asegurarse de que las coordenadas no son negativas ni exceden el contenedor
      const adjustedX = Math.max(0, Math.min(relativeX, containerRect.width - draggedElementRect.width));
      const adjustedY = Math.max(0, Math.min(relativeY, containerRect.height - draggedElementRect.height));
      
      
      this.coordenada_x =  Math.trunc(adjustedX);
      this.coordenada_y =  Math.trunc(adjustedY);
  
      //convertir de px a mm
      this.coordenada_x_mm = Math.trunc(this.coordenada_x / 3.779527559);
      this.coordenada_y_mm = Math.trunc(this.coordenada_y / 3.779527559);
    }else{
      console.log("contenedor no encontrado");
    }
  }

  coordenadas(){
    const coordenadas = {
      coordenada_x:this.coordenada_x_mm,
      coordenada_y:this.coordenada_y_mm 
    }
    this.coordenadasService.agregar_coordenada(coordenadas);
  }
  
}
