import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administracion/administrador/administrador.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { RegistrarEventoComponent } from './administracion/administrador/registrar-evento/registrar-evento.component';
import { RegistrarInstitucionComponent } from './administracion/administrador/registrar-institucion/registrar-institucion.component';
import { CoordinadorComponent } from './administracion/coordinador/coordinador.component';
import { GenerarDocumentosComponent } from './administracion/coordinador/generar-documentos/generar-documentos.component';



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'administrador', component:AdministradorComponent},
  {path: 'administrador/eventos', component:RegistrarEventoComponent},
  {path: 'administrador/instituciones', component:RegistrarInstitucionComponent},
  {path: 'coordinador', component:CoordinadorComponent},
  {path: 'coordinador/documentos', component:GenerarDocumentosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
