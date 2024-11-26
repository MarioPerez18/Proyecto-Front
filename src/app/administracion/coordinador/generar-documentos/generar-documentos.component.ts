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
                                'descripcion', 'tipo_participante', 'fecha_termino', 'documento', 'editar_documento'
  ];
  genera_documentos:string = 'Generar documentos';
  btn_generar_pdf:string = 'generar PDF';
  envia_documentos:string = 'Enviar documentos';
  btn_enviar_pdf:string = 'Enviar correo';
  participantes:any[] = [];
  id_coordinador = sessionStorage.getItem("id_usuario");
  dataSource = new MatTableDataSource();
  
  input_vacio:boolean = true;

  
  constructor(private api: DataService, private route: ActivatedRoute, private coordenadasService: CoordenadasService,
    private coordenadas: CoordenadasService
  ){}


  ngOnInit(){
    this.obtener_participantes(); 
  }


  obtener_participantes(){
    this.api.get_participants().subscribe((data:any) => {
      this.participantes = data;
      let encontrar_usuario_coordinador = this.participantes.find((participante:any) => {return participante.id_participante == this.id_coordinador});
      this.participantes = this.participantes.filter((participante:any) => {return participante.Evento == encontrar_usuario_coordinador.Evento});
      this.dataSource.data = this.participantes;
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.input_vacio = (filterValue != '')? false : true; 
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  generarPDF(){
    let genera_documento;

    this.dataSource.filteredData.forEach((participante:any) => {
      genera_documento = {
        id:participante.id,
        Nombres:participante.Nombres,
        ApellidoPaterno:participante.ApellidoPaterno,
        ApellidoMaterno:participante.ApellidoMaterno,
        Correo:participante.Correo,
        Evento:participante.Evento,
        Descripcion:participante.Descripcion,
        TipoParticipante:participante.TipoParticipante,
        FechaTermino:participante.FechaTermino,
        coordenada_x:this.coordenadas.coordenadass[0].coordenada_x,
        coordenada_y:this.coordenadas.coordenadass[0].coordenada_y,
        coordenada_x_qr:this.coordenadas.coordenadass[0].coordenada_x_qr,
        coordenada_y_qr:this.coordenadas.coordenadass[0].coordenada_y_qr,
        coordenada_x_descripcion:this.coordenadas.coordenadass[0].coordenada_x_descripcion,
        coordenada_y_descripcion:this.coordenadas.coordenadass[0].coordenada_y_descripcion,
        coordenada_x_fecha:this.coordenadas.coordenadass[0].coordenada_x_fecha,
        coordenada_y_fecha:this.coordenadas.coordenadass[0].coordenada_y_fecha
      }
      this.api.generate_document(genera_documento);
    })
  }
}

