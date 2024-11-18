import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import Swal from 'sweetalert2'

@Injectable()
export class ValidacionDocumento{

    constructor(private httpclient: HttpClient, private router:Router){}

    //Se recupera el token y se genera el header
    getHttpHeaders(){
        const token = sessionStorage.getItem("token");
         return {
             headers: new HttpHeaders({
                 Authorization: `Bearer ${token}`
             })
         };
     }

    validar_documento(cadena:any){
        return this.httpclient.get(`http://localhost:8000/api/validation/${cadena}`);
    }
}

