import { TestBed } from '@angular/core/testing';

import { PathServiceService } from './path-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IWarehouse } from '../interfaces/iwarehouse';
import { HttpResponse } from '@angular/common/http';
import { IPath } from '../interfaces/ipath';

describe('Paht', () => {
  let service: PathServiceService;
  let expectedPaths: IPath[];
  let createdPath: IPath;

  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PathServiceService]
    });
    service = TestBed.inject(PathServiceService);
    httpMock = TestBed.inject(HttpTestingController);


    expectedPaths = [{id: 'Path1', idWarehouseStart: 'A01', idWarehouseEnd: 'C01', distance: 1500, time: {hours: 1, minutes: 43, seconds: 12},  energy: 1200, extraTime: {hours: 0, minutes: 50, seconds:10}}, {id: 'Path2', idWarehouseStart: 'B01', idWarehouseEnd: 'D01', distance: 1700, time: {hours: 2, minutes: 11, seconds: 34},  energy: 1500, extraTime: {hours: 0, minutes: 59, seconds:10}}]  as IPath[];

    createdPath = {id: 'Path1', idWarehouseStart: 'A01', idWarehouseEnd: 'C01', distance: 1500, time: {hours: 1, minutes: 43, seconds: 12},  energy: 1200, extraTime: {hours: 0, minutes: 50, seconds:10}} as IPath;

  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getPaths', () => {
    it('should return expected',() => {


      service.getAllPaths().subscribe(paths => {
        expect(paths.length).toBe(2);
        expect(paths).toEqual(expectedPaths);
      });

      const req = httpMock.expectOne(service.PathURL);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedPaths);

    });

  });


  describe('#putPaths', () => {
    it('should update expected',() => {

      const updatedPath: IPath = {id: 'Path1', idWarehouseStart: 'A01', idWarehouseEnd: 'C01', distance: 1500, time: {hours: 1, minutes: 43, seconds: 12},  energy: 1200, extraTime: {hours: 0, minutes: 50, seconds:10}};


      service.updatePath(updatedPath).subscribe(path => {
        expect(path).toEqual(updatedPath);
      });

      const req = httpMock.expectOne(service.PathURL);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updatedPath);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updatedPath });

      req.event(expectedResponse);

    });

  });


  describe('#createPath', () => {
    it('should create expected',() => {

      service.createPath(createdPath).subscribe(path => {
        expect(path).toEqual(createdPath);
      });

      const req = httpMock.expectOne(service.PathURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(createdPath);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: createdPath });

      req.event(expectedResponse);


    });

  });



    describe('#deletePath', () => {
      it('should delete expected',() => {
  
        const id : string = 'Path1';
  
  
        service.deletePath(id).subscribe(warehouse => {
          expect(warehouse).toEqual(createdPath);
        });
  
        const req = httpMock.expectOne(service.PathURL);
        expect(req.request.method).toEqual('DELETE');
        expect(req.request.body).toEqual({id:id});
  
        const expectedResponse = new HttpResponse(
          { status: 200, statusText: 'OK', body: createdPath });
  
        req.event(expectedResponse);
  
  
      }); 

  });


});
