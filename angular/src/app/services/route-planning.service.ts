import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iroute } from '../interfaces/iroute';

@Injectable({
  providedIn: 'root'
})
export class RoutePlanningService {
  
  PathPlanUrl = environment.url.planeamento + 'api/Planning';
  PathUrl = environment.url.logistica + 'api/Planning';
  constructor(private http: HttpClient, private injector: Injector) { }

  postPlanByPlateAndDate(plate: string, date: string, type: string, generations:number, crossover:number, mutation:number, population:number){

    return this.http.post<Iroute>(this.PathPlanUrl+ '?plate=' + plate + '&date=' +date + "&type='"+ type+ "'&generations="+ generations+"&crossover="+ crossover+ "&mutation="+ mutation+ "&population="+ population+"",null);
  }    


  getPlanByPlateAndDate(plate: string, date: string){

    return this.http.get<Iroute>(this.PathUrl + '/' + plate + '/' + date);
  }


  getAllRoutes(){
    return this.http.get<Iroute[]>(this.PathUrl);
  }

  deletePlanning(id: string){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id
      },
    };

    return this.http.delete(this.PathUrl + '/deletePlanning', options);
  }
}
