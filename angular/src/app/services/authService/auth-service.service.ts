import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    

    userUrl = environment.url.logistica + "api/auth/signin";
    constructor(private http: HttpClient) {
          
    }

    
    login(email: string, password: string){
       
        return this.http.post(this.userUrl, { email, password });
    }

    roleMatch(allowedRoles: any): boolean {
        var isMatch = false;
        var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
        var userRole = payLoad.role;
        allowedRoles.forEach((element: any) => {
          if (userRole == element) {
            isMatch = true;
          }
        });
        return isMatch;
      }

      verifyIfUserExists(email: string){
        return this.http.post( environment.url.logistica + 'api/auth/signupviagoogle', { email });
      }
    
  
}