import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class CoordenadasService{
   
    coordenadass:any[] = [];

    agregar_coordenada(coordenadas:any){
        this.coordenadass.push(coordenadas);
    }
}

