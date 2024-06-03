export class Registro{

    paternalSurname:string = '';
    maternalSurname:string = '';
    names:string = '';
    gender:string = '';
    phoneNumber:string = '';
    email:string = '';
    password:string = '';
    password_confirmation:string = '';
    institutions_id:number = 0;
    

    constructor( apellidoPaterno:string, apellidoMaterno:string, nombres:string,
                 genero:string, telefono:string,  correo:string, contrasena:string, confirmar_contraseña:string, institucion_id:number){

        this.paternalSurname = apellidoPaterno;
        this.maternalSurname = apellidoMaterno;
        this.names = nombres;
        this.gender = genero;
        this.phoneNumber = telefono;
        this.email = correo;
        this.password = contrasena;
        this.password_confirmation = confirmar_contraseña;
        this.institutions_id = institucion_id;
     
    }
}