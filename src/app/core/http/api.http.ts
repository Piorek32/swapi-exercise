import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DataModel } from "../models/models";
import { ApiService } from "../";
import { Planet } from "@app/core/models";



@Injectable()
export class ApiHttp implements ApiService {
  constructor( private _http: HttpClient) {}

  private apiKey: string = "https://swapi.co/api/planets/";

    getPlanets(page: number, next?: string): Observable<DataModel> {
       
    if (next) return this._http.get<DataModel>(next);
    return this._http.get<DataModel>(`${this.apiKey}?page=${page}`);
  }

  getPlanet(id: string): Observable<Planet> {
    return this._http.get<Planet>(this.apiKey + id);
  }

  searchPlanet(term: string, next?: string): Observable<DataModel> {
    if (next) {
      return this._http.get<DataModel>(next);
    } else {
      return this._http.get<DataModel>(this.apiKey + "?search=" + term);
    }
  }
}
