import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDelivery } from '../interfaces/idelivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryServiceService {

  DeliveryURL = environment.url.armazem + 'api/Deliveries';

  constructor(private http: HttpClient, private injector: Injector) { }


  getAllDeliveries(){
    return this.http.get<IDelivery[]>(this.DeliveryURL + '/listAll');
  }

  createDelivery(delivery: IDelivery){
    return this.http.post<IDelivery>(this.DeliveryURL, delivery);
  }

  deleteDelivery(id: string){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
      },
    };
    return this.http.delete<IDelivery>(this.DeliveryURL+ '/HardDelete/', options);
  }

  updateDelivery(delivery: IDelivery){

    return this.http.patch<IDelivery>(this.DeliveryURL +'/Update', delivery);
  }

}
