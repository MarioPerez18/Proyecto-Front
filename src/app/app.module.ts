import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdministradorComponent } from './administracion/administrador/administrador.component';
import { CoordinadorComponent } from './administracion/coordinador/coordinador.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistrarEventoComponent } from './administracion/administrador/registrar-evento/registrar-evento.component';
import { RegistrarInstitucionComponent } from './administracion/administrador/registrar-institucion/registrar-institucion.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { DataService } from './data.service';
import { GenerarDocumentosComponent } from './administracion/coordinador/generar-documentos/generar-documentos.component';
import { RegistroService } from './registro/registro.service';
import { ParticipantesComponent } from './participantes/participantes.component';
import { EventosComponent } from './participantes/eventos/eventos.component';
import { EditarEventoComponent } from './administracion/administrador/editar-evento/editar-evento.component';
import { EditarInstitucionComponent } from './administracion/administrador/editar-institucion/editar-institucion.component';



@NgModule({
  declarations: [
    AppComponent,
    AdministradorComponent,
    CoordinadorComponent,
    LoginComponent,
    RegistroComponent,
    RegistrarEventoComponent,
    RegistrarInstitucionComponent,
    GenerarDocumentosComponent,
    ParticipantesComponent,
    EventosComponent,
    EditarEventoComponent,
    EditarInstitucionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataService, LoginService, RegistroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
