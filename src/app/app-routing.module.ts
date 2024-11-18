import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administracion/administrador/administrador.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { RegistrarEventoComponent } from './administracion/administrador/registrar-evento/registrar-evento.component';
import { RegistrarInstitucionComponent } from './administracion/administrador/registrar-institucion/registrar-institucion.component';
import { CoordinadorComponent } from './administracion/coordinador/coordinador.component';
import { GenerarDocumentosComponent } from './administracion/coordinador/generar-documentos/generar-documentos.component';
import { ParticipantesComponent } from './participantes/participantes.component';
import { EventosComponent } from './participantes/eventos/eventos.component';
import { EditarEventoComponent } from './administracion/administrador/editar-evento/editar-evento.component';
import { EditarInstitucionComponent } from './administracion/administrador/editar-institucion/editar-institucion.component';
import { DocumentoParticipanteComponent } from './administracion/coordinador/generar-documentos/documento-participante/documento-participante.component';
import { RegistrarTipoParticipanteComponent } from './administracion/coordinador/registrar-tipo-participante/registrar-tipo-participante.component';
import { TipoPlantillaComponent } from './administracion/coordinador/registrar-tipo-participante/tipo-plantilla/tipo-plantilla.component';
import { ValidarDocumentoComponent } from './administracion/coordinador/validar-documento/validar-documento.component';



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'participantes', component:ParticipantesComponent},
  {path: 'participantes/eventos', component:EventosComponent},
  {path: 'participantes/evento/:id', component:EventosComponent},
  {path: 'administrador', component:AdministradorComponent},
  {path: 'administrador/eventos', component:RegistrarEventoComponent},
  {path: 'administrador/eventos/:evento', component:EditarEventoComponent},
  {path: 'administrador/instituciones', component:RegistrarInstitucionComponent},
  {path: 'administrador/instituciones/:institucion', component:EditarInstitucionComponent},
  {path: 'coordinador', component:CoordinadorComponent},
  {path: 'coordinador/tipos-de-participantes', component:RegistrarTipoParticipanteComponent},
  {path: 'coordinador/tipos-plantilla/:tipo-plantilla', component:TipoPlantillaComponent},
  {path: 'coordinador/documentos', component:GenerarDocumentosComponent},
  {path: 'coordinador/validar-documento', component:ValidarDocumentoComponent},
  {path: 'coordinador/documentos/:id_participante/:tipo_participante', component:DocumentoParticipanteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
