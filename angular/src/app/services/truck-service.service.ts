import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITruck } from '../interfaces/itruck';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TruckServiceService {

  TruckURL = environment.url.logistica + 'api/Trucks';

  constructor(private http: HttpClient, private injector: Injector) { }


  getAllTrucks(){
    return this.http.get<ITruck[]>(this.TruckURL);
  }

  createTruck(truck: ITruck){
    return this.http.post<ITruck>(this.TruckURL, truck);
  }

  updateTruck(truck: ITruck) {
     return this.http.put<ITruck>(this.TruckURL, truck);
   }

   deleteTruck(plate: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        plate: plate
      },
    };
    return this.http.delete(this.TruckURL, options);
  }

  inactivateTruck(plate: string){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        plate: plate,
      },
    };
    return this.http.delete(this.TruckURL + '/SoftDelete', options);
  }

  activateTruck(truck: ITruck) {
    return this.http.patch<ITruck>(this.TruckURL + '/Activate', truck);
  }

}
