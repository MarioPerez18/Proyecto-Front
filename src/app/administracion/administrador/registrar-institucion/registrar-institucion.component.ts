import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-registrar-institucion',
  templateUrl: './registrar-institucion.component.html',
  styleUrls: ['./registrar-institucion.component.css']
})
export class RegistrarInstitucionComponent implements OnInit {

  instituciones:any[] = [];

  constructor(private api: DataService){}

  ngOnInit(){
    this.obtener_instituciones();
  }

  obtener_instituciones(){
    this.api.get_institutions().subscribe((data:any) => {
      this.instituciones = data;
      console.log(data);
    })
    
  }

}
