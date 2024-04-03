import { TestBed } from '@angular/core/testing';

import { WarehouseServiceService } from './warehouse-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IWarehouse } from '../interfaces/iwarehouse';
import { HttpResponse } from '@angular/common/http';

describe('WarehouseServiceService', () => {
  let service: WarehouseServiceService;
  let expectedWarehouses: IWarehouse[];
  let createdWarehouse: IWarehouse;

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WarehouseServiceService]
    });
    service = TestBed.inject(WarehouseServiceService);
    httpMock = TestBed.inject(HttpTestingController);


    expectedWarehouses = [{id: 'C01', designation: 'Castelo de Paiva', address: 'Rua das Cerdeiras,4021-132,Arouca,Portugal,11', latitude: 99, longitude: -15, altitude: 45 }, {id: 'C02', designation: 'Serradelo', address: 'Rua das Cerdeiras,4021-132,Castelo de Paiva,Portugal,20', latitude: 99, longitude: -17, altitude: 45}]  as IWarehouse[];

    createdWarehouse = { id: 'C01', designation: 'Castelo de Paiva', address: 'Rua das Cerdeiras,4021-132,Arouca,Portugal,11', latitude: 99, longitude: -15, altitude: 45 } as IWarehouse;

  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getWarehouses', () => {
    it('should return expected',() => {


      service.getWarehouses().subscribe(warehouses => {
        expect(warehouses.length).toBe(2);
        expect(warehouses).toEqual(expectedWarehouses);
      });

      const req = httpMock.expectOne(service.UserURL + '/listAll');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedWarehouses);

    });

  });


  describe('#patchWarehouses', () => {
    it('should update expected',() => {

      const updatedWarehouse: IWarehouse = {
        id: 'C01', designation: 'Castelo de Paiva', address: 'Rua das Cerdeiras,4078-012-Arouca,Portugal,11', latitude: 99, longitude: -15, altitude: 45,
        active: false
      };


      service.updateWarehouse(updatedWarehouse).subscribe(warehouse => {
        expect(warehouse).toEqual(updatedWarehouse);
      });

      const req = httpMock.expectOne(service.UserURL);
      expect(req.request.method).toEqual('PATCH');
      expect(req.request.body).toEqual(updatedWarehouse);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updatedWarehouse });

      req.event(expectedResponse);

    });

  });


  describe('#createdWarehouses', () => {
    it('should create expected',() => {

      service.addWarehouse(createdWarehouse).subscribe(warehouse => {
        expect(warehouse).toEqual(createdWarehouse);
      });

      const req = httpMock.expectOne(service.UserURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(createdWarehouse);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: createdWarehouse });

      req.event(expectedResponse);


    });

  });



    describe('#deleteWareouses', () => {
      it('should delete expected',() => {
  
        const id : string = 'C01';
  
  
        service.deleteWarehouse(id).subscribe(warehouse => {
          expect(warehouse).toEqual(createdWarehouse);
        });
  
        const req = httpMock.expectOne(service.UserURL+ '/HardDelete/');
        expect(req.request.method).toEqual('DELETE');
        expect(req.request.body).toEqual({id:id});
  
        const expectedResponse = new HttpResponse(
          { status: 200, statusText: 'OK', body: createdWarehouse });
  
        req.event(expectedResponse);
  
  
      }); 

  });

 


});
