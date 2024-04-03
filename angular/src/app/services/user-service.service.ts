import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ILoginUser } from '../interfaces/iloginuser';
import { IRole } from '../interfaces/irole';
import { IAnonymizedUser } from '../interfaces/iAnonymizedUser';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  AnonymizeUserURL = environment.url.logistica + 'api/auth';
  UserURL = environment.url.logistica + 'api/auth/signup';
  RolesURL = environment.url.logistica + 'api/roles';
  constructor(private http: HttpClient, private injector: Injector) { }

  registerUser(user: ILoginUser) {
    return this.http.post<ILoginUser>(this.UserURL, user);
  };

  getUsers() {
    return this.http.get<ILoginUser[]>(this.AnonymizeUserURL);
  };

  anonymizeUser(user: IAnonymizedUser)  {
    return this.http.patch<IAnonymizedUser>(this.AnonymizeUserURL + '/anonymize', user);
  }
  

  getRoles() {
    return this.http.get<IRole[]>(this.RolesURL);
  }

  getUserLogistic() {
    return this.http.get<number>(this.RolesURL + '/userLogistic');
  }

  getUserShipping() {
    return this.http.get<number>(this.RolesURL + '/userShipping');
  }

  getUserWarehouse() {
    return this.http.get<number>(this.RolesURL + '/userWarehouse');
  }

  getRoleByName(role: string) {
    return this.http.get<IRole>(this.RolesURL + '/' + role);
  }

  getRoleNameById(id: string) {
    return this.http.get<string>(this.RolesURL + '/getRoleById/' + id);
  }

}




