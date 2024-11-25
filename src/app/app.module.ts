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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { DataService } from './data.service';
import { GenerarDocumentosComponent } from './administracion/coordinador/generar-documentos/generar-documentos.component';
import { RegistroService } from './registro/registro.service';
import { ParticipantesComponent } from './participantes/participantes.component';
import { EventosComponent } from './participantes/eventos/eventos.component';
import { EditarEventoComponent } from './administracion/administrador/editar-evento/editar-evento.component';
import { EditarInstitucionComponent } from './administracion/administrador/editar-institucion/editar-institucion.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DocumentoParticipanteComponent } from './administracion/coordinador/generar-documentos/documento-participante/documento-participante.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistrarTipoParticipanteComponent } from './administracion/coordinador/registrar-tipo-participante/registrar-tipo-participante.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CoordenadasService } from './administracion/coordinador/generar-documentos/coordenadas.service';
import { TipoPlantillaComponent } from './administracion/coordinador/registrar-tipo-participante/tipo-plantilla/tipo-plantilla.component';
import { ValidarDocumentoComponent } from './administracion/coordinador/validar-documento/validar-documento.component';
import { ValidacionDocumento } from './administracion/coordinador/validar-documento/validacion_documento.service';
import { LecturaCodigosQrComponent } from './administracion/coordinador/validar-documento/lectura-codigos-qr/lectura-codigos-qr.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogoComponent } from './administracion/coordinador/validar-documento/lectura-codigos-qr/dialogo/dialogo.component';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon';  
import { MatButtonModule } from '@angular/material/button';
import { EditarDocumentoParticipanteComponent } from './administracion/coordinador/generar-documentos/editar-documento-participante/editar-documento-participante.component'; 

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
    DocumentoParticipanteComponent,
    RegistrarTipoParticipanteComponent,
    TipoPlantillaComponent,
    ValidarDocumentoComponent,
    LecturaCodigosQrComponent,
    DialogoComponent,
    EditarDocumentoParticipanteComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,   
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [DataService, LoginService, RegistroService, CoordenadasService, ValidacionDocumento],
  bootstrap: [AppComponent]
})
export class AppModule { }
