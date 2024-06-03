import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Login } from './login.model';
import Swal from 'sweetalert2'


@Injectable()
export class LoginService{

  
    constructor(private router:Router, private httpclient: HttpClient){}

    //método que consume la ruta login, recibe un objeto, en ese objeto esta el correo y contraseña del usuario.
    login(credenciales:Login){
        this.httpclient.post('http://localhost:8000/api/login', credenciales)
        .subscribe(
            (respuesta:any) => {
                console.log("Has iniciado sesión ", respuesta.token);
                sessionStorage.setItem("token", respuesta.token);
                if(respuesta.role == 'Admin'){
                    this.router.navigate(['/administrador']);
                }else if(respuesta.role == 'Coordi'){
                    this.router.navigate(['/coordinador']);
                }else{
                    this.router.navigate(['/']);
                }
            },
            error => 
                Swal.fire({
                    title: error.error.status,
                    text: error.error.message,
                    icon: 'error',
                    confirmButtonText: 'Reintentar'
                })
                //console.log("Credenciales invalidad" , error.error.message) 
        ); 
        
    }
  
}