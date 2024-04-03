import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPacking } from '../interfaces/ipacking';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PackingServiceService {

  PackingURL = environment.url.logistica + 'api/Packings';

  constructor(private http: HttpClient, private injector: Injector) { }


  getAllPackings(){
    return this.http.get<IPacking[]>(this.PackingURL);
  }

  createPacking(packing: IPacking){
    return this.http.post<IPacking>(this.PackingURL, packing);
  }

  updatePacking(packing: IPacking){
    return this.http.put<IPacking>(this.PackingURL, packing);
  }

  deletePacking(id: String){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id
      },
    };

    return this.http.delete(this.PackingURL + '/deletePacking', options);
  }



}
