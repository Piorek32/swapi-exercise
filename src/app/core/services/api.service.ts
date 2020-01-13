import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Planet, DataModel } from '@app/core/models'


@Injectable({
  providedIn: 'root'
})
export abstract  class ApiService {


    abstract getPlanets(page: number, next? : string): Observable<DataModel>;
    abstract getPlanet(name: string): Observable<Planet>;
    abstract searchPlanet(term: string, next?: string): Observable<DataModel>;
 



}
