
export class Login{

    email:string = '';
    password:string  = '';

    constructor(correo:string, contraseña:string){
        this.email = correo;
        this.password = contraseña;
    }
    
}