import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class CoordenadasService{
   
    coordenadass:any[] = [];
    coordenadass_coordi:any[] = [];
    coordenadass_ponente:any[] = [];

    agregar_coordenada(coordenadas:any){
        this.coordenadass.push(coordenadas);
    }

    agregar_coordenada_coordinador(coordenadas:any){
        this.coordenadass_coordi.push(coordenadas);
    }

    agregar_coordenada_ponente(coordenadas:any){
        this.coordenadass_ponente.push(coordenadas);
    }


}

