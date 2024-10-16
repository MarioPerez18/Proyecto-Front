import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../data.service';

@Component({
  selector: 'app-tipo-plantilla',
  templateUrl: './tipo-plantilla.component.html',
  styleUrls: ['./tipo-plantilla.component.css']
})
export class TipoPlantillaComponent implements OnInit {
  plantilla:any[];
  url_plantilla:string;
  tipo_participante:string;

  showDiv: boolean = false;
  descripcionDiv: boolean = false;
  imgDiv: boolean = false;
  

  position_nombres = { x: 360, y: 350 }; // Coordenadas iniciales
  position_descripcion = {x: 430, y: 300};
  position_imagen = {x: 630, y: 400};

  position_nombres_ponente = { x: 310, y: 370 }; // Coordenadas iniciales
  position_descripcion_ponente = {x: 380, y: 320};
  position_imagen_ponente = {x: 630, y: 530};

  
  @ViewChild('divNombre') divNombre: ElementRef;
  @ViewChild('divImagen') divImagen: ElementRef;
  @ViewChild('divDescripcion') divDescripcion: ElementRef;

  @ViewChild('divNombrePonente') divNombrePonente: ElementRef;
  @ViewChild('divImagenPonente') divImagenPonente: ElementRef;
  @ViewChild('divDescripcionPonente') divDescripcionPonente: ElementRef;

  constructor(private route: ActivatedRoute, private api: DataService){}

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
      // Puedes ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 100; // Nueva coordenada Y
    }

  }

  descripcioneDiv(event: any){
    this.descripcionDiv = event.target.checked;
    if (this.descripcionDiv) {
      // Puedes ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 150; // Nueva coordenada Y
    }

  }

  imagenDiv(event: any){
    this.imgDiv = event.target.checked;
    if (this.imgDiv) {
      // Puedes ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 150; // Nueva coordenada Y
    }
  }

  nombreDivPonente(event: any){
    this.showDiv = event.target.checked;
    if (this.showDiv) {
      // Puedes ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 100; // Nueva coordenada Y
    }

  }

  descripcioneDivPonente(event: any){
    this.descripcionDiv = event.target.checked;
    if (this.descripcionDiv) {
      // Puedes ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 150; // Nueva coordenada Y
    }

  }

  imagenDivPonente(event: any){
    this.imgDiv = event.target.checked;
    if (this.imgDiv) {
      // Puedes ajustar la posición aquí si es necesario
      //this.position.x = 100; // Nueva coordenada X
      //this.position.y = 150; // Nueva coordenada Y
    }
  }

}
