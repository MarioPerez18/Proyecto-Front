import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import Swal from 'sweetalert2'



@Injectable()
export class DataService{
    
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

    //Obtener los institutos
    get_institutions(){
        return this.httpclient.get('http://localhost:8000/api/institutions');
    }

    //Obtener los tipos de institutos
    get_institutions_types(){
        return this.httpclient.get('http://localhost:8000/api/institution-type', this.getHttpHeaders());
    }

    //actualizar institucion
    update_institution(institucion:any, id_institucion:number){
        this.httpclient.put(`http://localhost:8000/api/update-institution/${id_institucion}`, institucion, this.getHttpHeaders())
        .subscribe(
            (respuesta:any) => {
                this.router.navigate(['/administrador/instituciones']);
            },
            error => {
                Swal.fire({
                    title: "No se pudo actualizar",
                    icon: "error",
                    confirmButtonText: 'Ok'
                })
            }
         )

    }

    //eliminar una institucion
    delete_institution(id_institucion:number){
        return this.httpclient.delete(`http://localhost:8000/api/institution/${id_institucion}`, this.getHttpHeaders());
    }

   
    //Obtener a los participantes que ya concluyó su participacion en el evento
    get_participants(){
        return this.httpclient.get('http://localhost:8000/api/participant-event', this.getHttpHeaders());
    }

    //Obtener a los usuarios
    get_users(){
        return this.httpclient.get('http://localhost:8000/api/users', this.getHttpHeaders());
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
            (error:any) => 
                Swal.fire({
                    title: "Error al generar los documentos",
                    icon: "error",
                    confirmButtonText: 'Ok'
                })
        );
    }

    //Se recuperan todos los tipos de documentos
    get_document_types(){
        return this.httpclient.get('http://localhost:8000/api/document_type', this.getHttpHeaders());
    }

    
    //Se recupera solo un tipo de documento
    get_document_type(tipo_participante:string){
        return this.httpclient.get(`http://localhost:8000/api/type_document/${tipo_participante}`, this.getHttpHeaders());
    } 


    register_participant_type(tipoParticipante:any){
        return this.httpclient.post('http://localhost:8000/api/participant-types', tipoParticipante, this.getHttpHeaders());
    }

    get_participant_types(){
        return this.httpclient.get('http://localhost:8000/api/participant-types', this.getHttpHeaders());
    }


    //Obtener los eventos
    get_events(){
        return this.httpclient.get('http://localhost:8000/api/events', this.getHttpHeaders());
    }

    //actualizar un evento
    update_event(evento:any, id:number){
        this.httpclient.put(`http://localhost:8000/api/events/${id}`, evento, this.getHttpHeaders())
        .subscribe(
            (respuesta:any) => {
                /*Swal.fire({
                    title: respuesta.respuesta,
                    icon: respuesta.icono,
                    confirmButtonText: 'Ok'
                })*/
                this.router.navigate(['/administrador/eventos']);
            },
            error => 
                Swal.fire({
                    title: "No se pudo actualizar",
                    icon: "error",
                    confirmButtonText: 'Ok'
                })
        );
        
    }
    //eliminar un evento
    delete_event(id_evento:number){
        return this.httpclient.delete(`http://localhost:8000/api/events/${id_evento}`, this.getHttpHeaders());
    }


    //registrar un nuevo evento
    register_new_event(evento:any){
        return this.httpclient.post('http://localhost:8000/api/events', evento, this.getHttpHeaders());  
    }

    asignar_tipo_participante_a_evento(evento_participante:any){
        this.httpclient.put('http://localhost:8000/api/event-participant-type', evento_participante, this.getHttpHeaders())
        .subscribe(
            (respuesta:any) => {
                Swal.fire({
                    title: respuesta.asociado,
                    icon: respuesta.icono,
                    confirmButtonText: 'Ok'
                })
            },
            error => {
                Swal.fire({
                    title: "No se pudo asociar",
                    icon: "error",
                    confirmButtonText: 'Ok'
                })
            }
        )

    }

    //el participante se registra a un evento
    register_event(usuario:any){
        this.httpclient.post('http://localhost:8000/api/participant-event', usuario, this.getHttpHeaders())
        .subscribe(
            (respuesta:any) => {
                Swal.fire({
                    title: respuesta.registrado,
                    icon: respuesta.icono,
                    confirmButtonText: 'Ok'
                })
            },
            error => 
                Swal.fire({
                    title: error.error.registrado,
                    icon: error.error.icono,
                    confirmButtonText: 'Ok'
                })
        );   
    }


    //registrar una nueva institución
    register_institution(institucion:any){
        return this.httpclient.post('http://localhost:8000/api/institution', institucion, this.getHttpHeaders());
    }
    


    //Se asigna un coordinador a un evento
    asignar_coordinador_evento(usuario:any){
        this.httpclient.post('http://localhost:8000/api/user-event', usuario, this.getHttpHeaders())
        .subscribe(
            (respuesta:any) => {
                Swal.fire({
                    title: respuesta.registrado,
                    icon: respuesta.icono,
                    confirmButtonText: 'Ok'
                })
            },
            error => 
                Swal.fire({
                    title: error.error.registrado,
                    icon: error.error.icono,
                    confirmButtonText: 'Ok'
                })
        );   

    }

    //asociar al participante su plantilla
    asignar_plantilla_participante(plantilla_participante:any){
        this.httpclient.post('http://localhost:8000/api/participant-type-document-type', plantilla_participante, this.getHttpHeaders())
        .subscribe(
            (respuesta:any) => {
                Swal.fire({
                    title: respuesta.registrado,
                    icon: respuesta.icono,
                    confirmButtonText: 'Ok'
                })
            },
            error => 
                Swal.fire({
                    title: error.error.registrado,
                    icon: "error",
                    confirmButtonText: 'Ok'
                })
        )

    }




    //se verifica si el usuario está autenticado
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