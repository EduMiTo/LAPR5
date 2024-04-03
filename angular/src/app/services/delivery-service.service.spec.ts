import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { IDelivery } from '../interfaces/idelivery';
import { of } from 'rxjs';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { DeliveryServiceService } from './delivery-service.service';

describe('DeliveryServiceService', () => {
  let service: DeliveryServiceService;
  let expectedDeliveries: IDelivery[];
  let createddelivery: IDelivery;

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeliveryServiceService]
    });
    service = TestBed.inject(DeliveryServiceService);
    httpMock = TestBed.inject(HttpTestingController);


    expectedDeliveries = [{ id: '1', weight: 1, loadTime: 1, unloadTime: 1, warehouse: 'A01', limitDate: '12/01/2017' }] as IDelivery[];

    createddelivery = { id: '99', weight: 99, loadTime: 99, unloadTime: 99, warehouse: 'A01', limitDate: '12/01/2017' };

  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getDeliveries', () => {
    it('should return expected',() => {


      service.getAllDeliveries().subscribe(deliveries => {
        expect(deliveries.length).toBe(1);
        expect(deliveries).toEqual(expectedDeliveries);
      });

      const req = httpMock.expectOne(service.DeliveryURL + '/listAll');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedDeliveries);

    });

  });


  describe('#patchDeliveries', () => {
    it('should update expected',() => {

      const updateddelivery: IDelivery = { id: '1', weight: 99, loadTime: 99, unloadTime: 99, warehouse: 'A01', limitDate: '12/01/2017' };


      service.updateDelivery(updateddelivery).subscribe(deliveries => {
        expect(deliveries).toEqual(updateddelivery);
      });

      const req = httpMock.expectOne(service.DeliveryURL + '/Update');
      expect(req.request.method).toEqual('PATCH');
      expect(req.request.body).toEqual(updateddelivery);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updateddelivery });

      req.event(expectedResponse);


    });

  });


  describe('#createDeliveries', () => {
    it('should create expected',() => {



      service.createDelivery(createddelivery).subscribe(deliveries => {
        expect(deliveries).toEqual(createddelivery);
      });

      const req = httpMock.expectOne(service.DeliveryURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(createddelivery);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: createddelivery });

      req.event(expectedResponse);


    });

  });



    describe('#deleteDeliveries', () => {
      it('should delete expected',() => {
  
        const id : string = '99';
  
  
        service.deleteDelivery(id).subscribe(deliveries => {
          expect(deliveries).toEqual(createddelivery);
        });
  
        const req = httpMock.expectOne(service.DeliveryURL+ '/HardDelete/');
        expect(req.request.method).toEqual('DELETE');
        expect(req.request.body).toEqual({id:id});
  
        const expectedResponse = new HttpResponse(
          { status: 200, statusText: 'OK', body: createddelivery });
  
        req.event(expectedResponse);
  
  
      }); 

  });



});



