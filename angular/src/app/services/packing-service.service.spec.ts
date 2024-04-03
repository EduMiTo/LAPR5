import { TestBed } from '@angular/core/testing';

import { PathServiceService } from './path-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IWarehouse } from '../interfaces/iwarehouse';
import { HttpResponse } from '@angular/common/http';
import { IPath } from '../interfaces/ipath';
import { PackingServiceService } from './packing-service.service';
import { IPacking } from '../interfaces/ipacking';

describe('Paht', () => {
  let service: PackingServiceService;
  let expectedPackings: IPacking[];
  let createdPacking: IPacking;

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PackingServiceService]
    });
    service = TestBed.inject(PackingServiceService);
    httpMock = TestBed.inject(HttpTestingController);


    expectedPackings = [{id: 'P01', truckPlate: 'A1-19-BH', deliveryId: 'D01', position: {positionX: 0, positionY: 0, positionZ: 0}},  {id: 'P02', truckPlate: 'A1-19-BH', deliveryId: 'D02', position: {positionX: 0, positionY: 1, positionZ: 0}}]  as IPacking[];

    createdPacking = {id: 'P01', truckPlate: 'A1-19-BH', deliveryId: 'D01', position: {positionX: 0, positionY: 0, positionZ: 0}} as IPacking;

  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getPaths', () => {
    it('should return expected',() => {


      service.getAllPackings().subscribe(packings => {
        expect(packings.length).toBe(2);
        expect(packings).toEqual(expectedPackings);
      });

      const req = httpMock.expectOne(service.PackingURL);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedPackings);

    });

  });


  describe('#putPackings', () => {
    it('should update expected',() => {

      const updatedPacking: IPacking = {id: 'P01', truckPlate: 'A1-19-BH', deliveryId: 'D01', position: {positionX: 0, positionY: 2, positionZ: 1}};

      service.updatePacking(updatedPacking).subscribe(packing => {
        expect(packing).toEqual(updatedPacking);
      });

      const req = httpMock.expectOne(service.PackingURL);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updatedPacking);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updatedPacking });

      req.event(expectedResponse);

    });

  });


  describe('#createPacking', () => {
    it('should create expected',() => {

      service.createPacking(createdPacking).subscribe(packing => {
        expect(packing).toEqual(createdPacking);
      });

      const req = httpMock.expectOne(service.PackingURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(createdPacking);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: createdPacking });

      req.event(expectedResponse);


    });

  });


});