import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../";
import { DataModel, Planet } from "../models/models";
import { of } from "rxjs";
import { throwError } from "rxjs";

@Injectable()
export class ApiMock implements ApiService {
  constructor() {}

    getPlanets(page: number, next: string): Observable<DataModel> {
    // return  throwError('e')
    const results = <DataModel>{
      count: 61,
      next: "",
      previous: "",
      results: Array.from(Array(20).keys()).map(i => {
        return <Planet>{
          name: `planet${i}`,
          rotation_period: "test",
          orbital_period: "tet",
          diameter: "test",
          climate: "stdrv",
          gravity: "sdcsdc",
          terrain: "edwedc",
          surface_water: "csdcsdc",
          population: "wefsedcesc",
          residents: ["test"],
          films: ["test"],
          created: "edcwecwedc",
          edited: "wecwec",
          url: "wewec"
        };
      })
    };
    return of(results);
  }

  getPlanet(id: string): Observable<Planet> {
    // return throwError('');
    const planet = <Planet>{
      name: "Alderaan",
      rotation_period: "24",
      orbital_period: "364",
      diameter: "12500",
      climate: "temperate",
      gravity: "1 standart",
      terrain: "grasslands, mountains",
      surface_water: "40",
      population: "20000000",
      residents: [
        "https://swapi.co/api/people/5/",
        "https://swapi.co/api/people/68/",
        "https://swapi.co/api/people/81/"
      ],
      films: ["https://swapi.co/api/films/6/", "https://swapi.co/api/films/1/"],
      created: "2014-12-10T11:35:48.479000Z",
      edited: "2014-12-20T20:58:18.420000Z",
      url: "https://swapi.co/api/planets/2/"
    };

    return of(planet);
  }

  searchPlanet(term: string, next?: string): Observable<DataModel> {
    throwError("e");
    if (next && next != "prev") {
      const results2 = <DataModel>{
        count: 61,
        next: "next",
        previous: "prev",
        results: Array.from(Array(20).keys())
          .map(i => {
            return <Planet>{
              name: `planet${i + 10}`,
              rotation_period: "test",
              orbital_period: "tet",
              diameter: "test",
              climate: "stdrv",
              gravity: "sdcsdc",
              terrain: "edwedc",
              surface_water: "csdcsdc",
              population: "wefsedcesc",
              residents: ["test"],
              films: ["test"],
              created: "edcwecwedc",
              edited: "wecwec",
              url: "wewec"
            };
          })
          .filter(val => {
            return val.name.indexOf(term) > -1;
          })
      };
      return of(results2);
    }
    if (!next || next === "prev") {
      const results = <DataModel>{
        count: 61,
        next: "term",
        previous: "",
        results: Array.from(Array(20).keys())
          .map(i => {
            return <Planet>{
              name: `planet${i}`,
              rotation_period: "test",
              orbital_period: "tet",
              diameter: "test",
              climate: "stdrv",
              gravity: "sdcsdc",
              terrain: "edwedc",
              surface_water: "csdcsdc",
              population: "wefsedcesc",
              residents: ["test"],
              films: ["test"],
              created: "edcwecwedc",
              edited: "wecwec",
              url: "wewec"
            };
          })
          .filter(val => {
            return val.name.indexOf(term) > -1;
          })
      };

      return of(results);
    }
  }
}
