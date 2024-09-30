import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CoordenadasService } from './coordenadas.service';

@Component({
  selector: 'app-generar-documentos',
  templateUrl: './generar-documentos.component.html',
  styleUrls: ['./generar-documentos.component.css']
})
export class GenerarDocumentosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombres', 'apellido_paterno', 'apellido_materno', 'evento',
                                'descripcion', 'tipo_participante', 'fecha_termino', 'documento'
  ];
  genera_documentos:string = 'Generar documentos';
  btn_generar_pdf:string = 'generar PDF';
  envia_documentos:string = 'Enviar documentos';
  btn_enviar_pdf:string = 'Enviar correo';
  participantes:any[] = [];
  id_coordinador = sessionStorage.getItem("id_usuario");
  dataSource = new MatTableDataSource();
  
  coordenada_x:any;
  coordenada_y:any;

  
  constructor(private api: DataService, private route: ActivatedRoute, private coordenadasService: CoordenadasService,
    private coordenadas: CoordenadasService
  ){}


  ngOnInit(){
    this.obtener_participantes(); 
    //this.coordenada_x = this.route.snapshot.params['coordenada_x_mm'];
    //this.coordenada_y = this.route.snapshot.params['coordenada_y_mm'];
    //console.log(this.coordenada_x);
  }


  obtener_participantes(){
    this.api.get_participants().subscribe((data:any) => {
      this.participantes = data;
      let encontrar_usuario_coordinador = this.participantes.find((participante:any) => {return participante.id_participante == this.id_coordinador});
      this.participantes = this.participantes.filter((participante:any) => {return participante.Evento == encontrar_usuario_coordinador.Evento});
      this.dataSource.data = this.participantes;
    });
  }


  generarPDF(){
    let genera_documento;

    this.participantes.forEach((participante) => {
      genera_documento = {
        participante,
        coordenada_x:this.coordenadas.coordenadass[0].coordenada_x -40,
        coordenada_y:this.coordenadas.coordenadass[0].coordenada_y
      }
      //console.log(genera_documento);
      this.api.generate_document(genera_documento);
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  

}

