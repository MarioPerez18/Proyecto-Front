import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import Swal from 'sweetalert2'



@Injectable()
export class DataService{

    constructor(private httpclient: HttpClient, private router:Router){}

    //Obtener los institutos
    get_institutions(){
        return this.httpclient.get('http://localhost:8000/api/institutions');
    }

   
    //Obtener a los participantes que ya concluyó su participacion en el evento
    get_participants(){
        return this.httpclient.get('http://localhost:8000/api/participant-event', this.getHttpHeaders());
    }

    //Generar los documentos de participación
    generate_document(participante:any){
        this.httpclient.post('http://localhost:8000/api/documents', participante, this.getHttpHeaders())
        .subscribe(
            (respuesta:any) => {
                Swal.fire({
                    title: respuesta.documento,
                    icon: respuesta.icono,
                    confirmButtonText: 'Ok'
                })
                //console.log(respuesta);
            },
            error => console.log("Error al generar los documentos" + error) 
        );
    }

    get_events(){
        return this.httpclient.get('http://localhost:8000/api/events', this.getHttpHeaders());
    }

     //Se recupera el token y se genera el header
     getHttpHeaders(){
        const token = sessionStorage.getItem("token");
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    es_autenticado(){
        return sessionStorage.getItem("token") != null;
    }

     //método que consume la ruta logout, se le pasa el token del usuario.
     cierra_sesion(){
        this.httpclient.get('http://localhost:8000/api/logout', this.getHttpHeaders())
        .subscribe(
            (respuesta:any) => {
                console.log("Has cerrado sesión ", respuesta);
                sessionStorage.removeItem("token");
                this.router.navigate(['/']);
            },
            error => console.log("Error cerrar sesion " , error)
        );   
    }

}