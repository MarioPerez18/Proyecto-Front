import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from './login.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  bandera:boolean = false;
  constructor(private loginService: LoginService, private router: Router) {}

  
  iniciar_sesion(form: NgForm) {
    this.bandera = true;
    const email = form.value.email;
    const password = form.value.password;

    let sesion = new Login(email, password);
    this.loginService.login(sesion);
    this.obtener_respuesta(sesion);
  }

  obtener_respuesta(credenciales: Login) {
    this.loginService.login(credenciales).subscribe(
      (respuesta: any) => {
        sessionStorage.setItem('token', respuesta.token);
        sessionStorage.setItem('nombre_usuario', respuesta.user);
        sessionStorage.setItem('id_usuario', respuesta.user_id);
        if (respuesta.role == 'admin') {
          this.router.navigate(['/administrador']);
        } else if (respuesta.role == 'coordi') {
          this.router.navigate(['/coordinador']);
        } else {
          this.router.navigate(['/participantes']);
        }
      },
      (error) => {

        Swal.fire({
          title: error.error.status,
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Reintentar',
        })
        this.bandera = false;
      }
    );
    
    
  }

}
