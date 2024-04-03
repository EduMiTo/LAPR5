import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ILoginUser } from 'src/app/interfaces/iloginuser';

import { AuthenticationService } from './auth-service.service';

describe('AuthServiceService', () => {
  let service: AuthenticationService;
  let expectedUsers: ILoginUser[];
  let createdUser: ILoginUser;

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);


    expectedUsers = [{firstName: 'Kevin', lastName: 'Durant', email: 'kd7@eletric-go.com', password: 'kd7bn12345', role: 'Shipping Manager'}, {firstName: 'Steph', lastName: 'Curry', email: 'sc30@eletric-go.com', password: 'sc30gsw12345', role: 'Warehouse Manager'}]  as ILoginUser[];
    createdUser = {firstName: 'Steph', lastName: 'Curry', email: 'sc30@eletric-go.com', password: 'sc30gsw12345', role: 'Warehouse Manager'} as ILoginUser;

  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#login', () => {
    it('should return expected',() => {

      let email: string = 'sc30@eletric-go.com';
      let password: string= 'sc30gsw12345';

      service.login(email, password).subscribe(user => {
        let userLogin: ILoginUser = user as ILoginUser;
        expect(userLogin.email).toEqual(createdUser.email);
      });

      const req = httpMock.expectOne(service.userUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({email: email, password: password});

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: createdUser });

      req.event(expectedResponse);
    });

  });


});
