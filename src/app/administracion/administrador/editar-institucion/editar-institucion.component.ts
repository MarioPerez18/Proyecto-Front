import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editar-institucion',
  templateUrl: './editar-institucion.component.html',
  styleUrls: ['./editar-institucion.component.css']
})
export class EditarInstitucionComponent implements OnInit {
  instituciones: any[] = [];
  tipos_de_instituciones: any[] = [];
  id_instituto:number = 0;
  uri_instituto:string = "";

  nombre_corto_input:string = "";
  nombre_largo_input:string = "";
  tipo_institucion_id_input:number = 0;

  constructor(private api: DataService, private route: ActivatedRoute){}

  ngOnInit(){
    this.obtener_instituciones();
    this.obtener_tipos_de_instituciones();
    this.uri_instituto = this.route.snapshot.params['institucion'].replaceAll("-", " ");
  }

  obtener_instituciones() {
    this.api.get_institutions().subscribe((data: any) => {
      this.instituciones = data;
      
      let instituto = this.instituciones.find((instituto:any) => {return instituto.longNameUri == this.uri_instituto});
      this.id_instituto = instituto.id;
      this.nombre_corto_input = instituto.shortName;
      this.nombre_largo_input = instituto.longName;
      this.tipo_institucion_id_input = instituto.institution_type_id;
    });
  }

  obtener_tipos_de_instituciones() {
    this.api.get_institutions_types().subscribe((data: any) => {
      this.tipos_de_instituciones = data;
    });
  }


  actualizar_instituto(){
    const instituto = {
      shortName:this.nombre_corto_input,
      longName:this.nombre_largo_input,
      institution_type_id:this.tipo_institucion_id_input
    }
    this.api.update_institution(instituto, this.id_instituto);
  }
}
