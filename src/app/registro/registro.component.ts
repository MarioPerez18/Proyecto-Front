import { Component, OnInit  } from '@angular/core';
import { Registro } from './registro.model';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { RegistroService } from './registro.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  instituciones:any;

  constructor(private api: DataService, private api_registro: RegistroService){}

  ngOnInit(){
    this.obtener_instituciones();
  }

  obtener_instituciones(){
    this.api.get_institutions().subscribe((data) => {
      this.instituciones = data;
      console.log(this.instituciones);
    })
  }

  registro_participante(form: NgForm){
    const paternalSurname = form.value.paternalSurname;
    const maternalSurname = form.value.maternalSurname;
    const names = form.value.names;
    const gender = form.value.gender;
    const phoneNumber = form.value.phoneNumber;
    const email = form.value.email;
    const password = form.value.password;
    const password_confirmation = form.value.password_confirmation;
    const institution_id =  +form.value.institutions_id;
    
    let registro = new Registro(paternalSurname, maternalSurname, names,
                                gender, phoneNumber, email, password, password_confirmation, institution_id
    );
    this.api_registro.insert_participant(registro);
  }

 
}
