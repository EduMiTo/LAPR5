import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IWarehouse } from '../interfaces/iwarehouse';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class WarehouseServiceService {

  UserURL = environment.url.armazem + 'api/Warehouses';
  constructor(private http: HttpClient) { }

  addWarehouse(warehouse: IWarehouse) {
    return this.http.post<IWarehouse>(this.UserURL, warehouse);
  };

  getWarehouses() {
    return this.http.get<IWarehouse[]>(this.UserURL + '/listAll');
  }

  deleteWarehouse(id: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
      },
    };
    return this.http.delete(this.UserURL + '/HardDelete/', options);
  }

  updateWarehouse(warehouse: IWarehouse) {
    return this.http.patch<IWarehouse>(this.UserURL, warehouse);
  }

  inactivateWarehouse(id: string){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
      },
    };
    return this.http.delete(this.UserURL + '/SoftDelete/SoftDelete', options);
  }

  activateWarehouse(warehouse: IWarehouse) {
    return this.http.patch<IWarehouse>(this.UserURL, warehouse);
  }

}
