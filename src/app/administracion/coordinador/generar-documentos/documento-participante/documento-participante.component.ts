import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CdkDragEnd  } from '@angular/cdk/drag-drop';
import { CdkDragRelease } from '@angular/cdk/drag-drop';
import { DataService } from '../../../../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documento-participante',
  templateUrl: './documento-participante.component.html',
  styleUrls: ['./documento-participante.component.css']
})
export class DocumentoParticipanteComponent implements OnInit {
  participantes:any[] = [];
  tipo_participante:string;
  plantilla:any[];
  url_plantilla:string;
  tipo_plantilla:string;
  coordenada_x_mm:number;
  coordenada_y_mm:number;
  coordenada_x:number;
  coordenada_y:number;

 


  constructor(private api: DataService,private route: ActivatedRoute, private router: Router){}
  

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
      this.tipo_plantilla = this.plantilla[0];
      this.url_plantilla = this.plantilla[1];
      console.log(data[0]);
    });
  }


  onDragReleased(event: CdkDragRelease<any>) {
    // Obtener el elemento DOM
    const element = event.source.element.nativeElement;
    
    // Obtener las coordenadas del elemento
    const rect = element.getBoundingClientRect();
    this.coordenada_x =  Math.trunc(rect.x);
    this.coordenada_y =  Math.trunc(rect.y);

    /*//convertir de px a mm
    this.coordenada_x_mm = Math.trunc(this.coordenada_x/3.7795280352161);
    this.coordenada_y_mm = Math.trunc(this.coordenada_y/3.7795280352161);*/
    this.coordenada_x_mm = 76;
    this.coordenada_y_mm = 88;

    const coordenadas = {
      coordenada_x:this.coordenada_x_mm,
      coordenada_y:this.coordenada_y_mm 
    }

    console.log('Nuevas coordenadas:', coordenadas);
  }

  /*regresar_a_generar(){
    this.router.navigate(['/coordinador/documentos']);
  }*/

}
