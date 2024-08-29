import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-institucion',
  templateUrl: './registrar-institucion.component.html',
  styleUrls: ['./registrar-institucion.component.css'],
})
export class RegistrarInstitucionComponent implements OnInit {
  instituciones: any[] = [];
  tipos_de_instituciones: any[] = [];
  id:number = 0;

  constructor(private api: DataService, private router:Router) {}

  ngOnInit() {
    this.obtener_instituciones();
    this.obtener_tipos_de_instituciones();
  }

  obtener_instituciones() {
    this.api.get_institutions().subscribe((data: any) => {
      this.instituciones = data;
      //console.log(data);
      data.forEach((institucion:any) => {
        this.id = institucion.id;
        //console.log(institucion.id)
      });
    });
  }

  
  obtener_tipos_de_instituciones() {
    this.api.get_institutions_types().subscribe((data: any) => {
      this.tipos_de_instituciones = data;
    });
  }

  registrar_instituto(form: NgForm) {
    const shortName = form.value.shortName;
    const longName = form.value.longName;
    const institution_type_id = +form.value.institution_type_id;

    const institution = {
      id: ++this.id,
      shortName,
      longName,
      institution_type_id,
    };

    this.api.register_institution(institution).subscribe(
      (respuesta: any) => {
        Swal.fire({
          title: respuesta.respuesta,
          icon: respuesta.icono,
          confirmButtonText: 'Ok',
        });
        this.instituciones.push(institution);
      },
      (error) => {
        Swal.fire({
          title: 'Intentalo de nuevo',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
    //console.log(institution);
  }


  eliminar_instituto(id_institucion:number){
    Swal.fire({
      title: "Estas seguro?",
      text: "No se podrá revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {

      if (result.isConfirmed) {
        this.api.delete_institution(id_institucion)
        .subscribe(
          (respuesta:any) => {
            Swal.fire({
             title: "Instituto eliminado",
             text: respuesta.respuesta,
             icon: respuesta.icono
            });
            this.instituciones = this.instituciones.filter(function(institucion){
              return institucion.id != id_institucion;
            });
          }
        ) 
      }
    });
    //console.log(id_institucion);
  }
}
