import { TestBed } from '@angular/core/testing';

import { TruckServiceService } from './truck-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IWarehouse } from '../interfaces/iwarehouse';
import { HttpResponse } from '@angular/common/http';
import { ITruck } from '../interfaces/itruck';

describe('TruckServiceService', () => {
  let service: TruckServiceService;
  let expectedTrucks: ITruck[];
  let createdTruck: ITruck;

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TruckServiceService]
    });
    service = TestBed.inject(TruckServiceService);
    httpMock = TestBed.inject(HttpTestingController);


    expectedTrucks = [{plate: '09-10-AD', tare: 7500, massCapacity: 4500, maximumBattery: 80, autonomy: 120, chargeTime: { hours: 1, minutes: 0, seconds: 0}}, {plate: '12-11-ZZ', tare: 7400, massCapacity: 4000, maximumBattery: 75, autonomy: 100, chargeTime: { hours: 0, minutes: 57, seconds: 0}}]  as ITruck[];

    createdTruck = { plate: '09-10-AD', tare: 7500, massCapacity: 4500, maximumBattery: 80, autonomy: 120, chargeTime: { hours: 1, minutes: 0, seconds: 0}} as ITruck;

  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getTrucks', () => {
    it('should return expected',() => {


      service.getAllTrucks().subscribe(trucks => {
        expect(trucks.length).toBe(2);
        expect(trucks).toEqual(expectedTrucks);
      });

      const req = httpMock.expectOne(service.TruckURL);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedTrucks);

    });

  });


  describe('#putTrucks', () => {
    it('should update expected',() => {

      const updatedTruck: ITruck = { plate: '09-10-AD', tare: 7000, massCapacity: 4300, maximumBattery: 72, autonomy: 100, chargeTime: { hours: 1, minutes: 0, seconds: 0}, active: true};


      service.updateTruck(updatedTruck).subscribe(truck => {
        expect(truck).toEqual(updatedTruck);
      });
      
      const req = httpMock.expectOne(service.TruckURL);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updatedTruck);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updatedTruck });

      req.event(expectedResponse);

    });

  });

  describe('#createTrucks', () => {
    it('should create expected',() => {

      service.createTruck(createdTruck).subscribe(truck => {
        expect(truck).toEqual(createdTruck);
      });

      const req = httpMock.expectOne(service.TruckURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(createdTruck);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: createdTruck });

      req.event(expectedResponse);


    });

    

  });

  describe('#deleteTrucks', () => {
    it('should delete expected',() => {

      const plate : string = '09-10-AD';


      service.deleteTruck(plate).subscribe(truck => {
        expect(truck).toEqual(createdTruck);
      });

      const req = httpMock.expectOne(service.TruckURL);
      expect(req.request.method).toEqual('DELETE');
      expect(req.request.body).toEqual({plate:plate});

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: createdTruck });

      req.event(expectedResponse);


    }); 

});

});

