import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Registro } from './registro.model';

@Injectable()
export class RegistroService{

    constructor(private router:Router, private httpclient: HttpClient){}

     //Registro participante
     insert_participant(registro: Registro){
        this.httpclient.post('http://localhost:8000/api/register', registro)
        .subscribe(
            (respuesta:any) => {
                console.log("Te has registrado " +  respuesta.token);
                sessionStorage.setItem('token', respuesta.token);
                this.router.navigate(['/']);
            },
            error => console.log("Error al guardar la cuenta" + error)
        );
    }

}