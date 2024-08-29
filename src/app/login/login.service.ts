import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login.model';



@Injectable()
export class LoginService{

   
    constructor(private httpclient: HttpClient){}

    //método que consume la ruta login, recibe un objeto, en ese objeto esta el correo y contraseña del usuario.
    login(credenciales:Login){
        return this.httpclient.post('http://localhost:8000/api/login', credenciales);
    }

   

}