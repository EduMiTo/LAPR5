import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ILoginUser } from '../interfaces/iloginuser';
import { IRole } from '../interfaces/irole';

import { UserServiceService } from './user-service.service';

describe('UserServiceService', () => {
  let service: UserServiceService;
  let expectedUsers: ILoginUser[];
  let createdUser: ILoginUser;
  let expectedRoles: IRole[];
  let createdRole: IRole

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserServiceService]
    });
    service = TestBed.inject(UserServiceService);
    httpMock = TestBed.inject(HttpTestingController);


    expectedUsers = [{firstName: 'Kevin', lastName: 'Durant', email: 'kd7@eletric-go.com', password: 'kd7bn12345', role: 'Shipping Manager'}, {firstName: 'Steph', lastName: 'Curry', email: 'sc30@eletric-go.com', password: 'sc30gsw12345', role: 'Warehouse Manager'}]  as ILoginUser[];
    createdUser = {firstName: 'Steph', lastName: 'Curry', email: 'sc30@eletric-go.com', password: 'sc30gsw12345', role: 'Warehouse Manager'} as ILoginUser;

    expectedRoles = [{name: 'Warehouse Manager', id: 'WarehouseManager1221'}, {name: 'Shipping Manager', id: 'ShippingManager1221'}]  as IRole[];
    createdRole = {name: 'Warehouse Manager', id: 'WarehouseManager1221'} as IRole;
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getRoles', () => {
    it('should return expected',() => {


      service.getRoles().subscribe(roles => {
        expect(roles.length).toBe(2);
        expect(roles).toEqual(expectedRoles);
      });

      const req = httpMock.expectOne(service.RolesURL);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedRoles);

    });

  });


  describe('#createUser', () => {
    it('should create expected',() => {

      service.registerUser(createdUser).subscribe(user => {
        expect(user).toEqual(createdUser);
      });

      const req = httpMock.expectOne(service.UserURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(createdUser);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: createdUser });

      req.event(expectedResponse);


    });

  });



   describe('#getRoleByName', () => {
      it('should delete expected',() => { 
  
        const name : string = 'Warehouse Manager';
  
  
        service.getRoleByName(name).subscribe(role => {
          expect(role).toEqual(createdRole);
        });
  
        const req = httpMock.expectOne(service.RolesURL + '/' + name);
        expect(req.request.method).toEqual('GET');
  
        const expectedResponse = new HttpResponse(
          { status: 200, statusText: 'OK', body: createdRole });
  
        req.event(expectedResponse);
  
  
      }); 

  });


});
