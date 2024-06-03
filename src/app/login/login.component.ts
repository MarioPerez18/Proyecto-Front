import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from './login.model';
import { LoginService } from './login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

  constructor(private loginService: LoginService,private router:Router){}

  iniciar_sesion(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    let sesion = new Login(email, password);
    this.loginService.login(sesion);
  }

}
