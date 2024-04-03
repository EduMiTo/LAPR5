import { TestBed } from '@angular/core/testing';

import { RoutePlanningService } from './route-planning.service';
import { Iroute } from '../interfaces/iroute';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { create } from 'domain';


describe('RoutePlanningService', () => {
  let service: RoutePlanningService;
  let expectedRoutesPlanning: Iroute[];
  let createdRoutePlanning: Iroute;

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoutePlanningService]
    });
    service = TestBed.inject(RoutePlanningService);
    httpMock = TestBed.inject(HttpTestingController);


    expectedRoutesPlanning = [{id: 'Route1', truckPlate: 'AA-12-BB', planningDate: '21122022', path: 'M01-A01-P02-C01-M01', planningTime: 360}, {id: 'Route2', truckPlate: 'AA-12-AB', planningDate: '23122022', path: 'M01-P02-C01-M01', planningTime: 278}]  as Iroute[];

    createdRoutePlanning = {id: 'Route1', truckPlate: 'AA-12-BB', planningDate: '21122022', path: 'M01-A01-P02-C01-M01', planningTime: 360} as Iroute;

  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getRoutes', () => {
    it('should return expected',() => {


      service.getAllRoutes().subscribe(routes => {
        expect(routes.length).toBe(2);
        expect(routes).toEqual(expectedRoutesPlanning);
      });

      const req = httpMock.expectOne(service.PathUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedRoutesPlanning);

    });

  });


  describe('#getPlanByPlateAndDate', () => {
    it('should return expected',() => {

      let plate = 'AA-12-BC';
      let date = '21102022';

      

      service.getPlanByPlateAndDate(plate, date).subscribe(routePlanning => {
        expect(routePlanning).toEqual(createdRoutePlanning);
      });

      const req = httpMock.expectOne(service.PathUrl + '/' + plate + '/' + date);
      expect(req.request.method).toEqual('GET');
      req.flush(createdRoutePlanning);
    
    });

  });


  /*describe('#createPlanByPlateAndDate', () => {
    it('should create expected',() => {

      let plate = 'AA-12-BB';
      let date = '21122022';
      let type = '1';

      service.postPlanByPlateAndDate(plate, date, type).subscribe(routePlanning => {
        let a = routePlanning;
        console.log(a);
        expect(a).toEqual(createdRoutePlanning);
      });

      const req = httpMock.expectOne(service.PathPlanUrl + '?plate=' + plate + '&date=' + date, '&type='+ type);
      expect(req.request.method).toEqual('POST');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: createdRoutePlanning });

      req.event(expectedResponse);


    });

  });*/

});
