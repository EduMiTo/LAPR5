import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPath } from '../interfaces/ipath';
import { environment } from 'src/environments/environment';
import { IWarehouse } from '../interfaces/iwarehouse';
import Node from '../Components/3D/road-network/Node';



@Injectable({
  providedIn: 'root'
})
export class PathServiceService {

  whHelper: IWarehouse[] = [];
  paths: IPath[] = [];



  PathURL = environment.url.logistica + 'api/Paths';
  
  constructor(private http: HttpClient, private injector: Injector) { }


  getAllPaths(){
    return this.http.get<IPath[]>(this.PathURL);
  }

  createPath(path: IPath){
    return this.http.post<IPath>(this.PathURL, path);
  }

  updatePath(path: IPath){
    return this.http.put<IPath>(this.PathURL, path);
  }


  deletePath(id: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id
      },
    };
    return this.http.delete(this.PathURL, options);
  }





}
