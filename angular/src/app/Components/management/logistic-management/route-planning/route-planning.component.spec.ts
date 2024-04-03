import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RoutePlanningComponent } from './route-planning.component';
import {FormsModule} from '@angular/forms';
import { RoutePlanningService } from '../../../../services/route-planning.service';
import { Iroute } from 'src/app/interfaces/iroute';
import { of } from 'rxjs/internal/observable/of';
import { PackingServiceService } from '../../../../services/packing-service.service';
import { IPacking } from 'src/app/interfaces/ipacking';
import { IDelivery } from 'src/app/interfaces/idelivery';
import { DeliveryServiceService } from 'src/app/services/delivery-service.service';
import { ITruck } from 'src/app/interfaces/itruck';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TruckServiceService } from 'src/app/services/truck-service.service';

describe('RoutePlanningComponent', () => {
  let component: RoutePlanningComponent;
  let fixture: ComponentFixture<RoutePlanningComponent>;
  let mockTruckService: TruckServiceService;
  let mockPlanningService : RoutePlanningService;
  let truckMock: ITruck= {
    plate: '01-01-AB',
    tare: 7500,
    massCapacity: 4300,
    maximumBattery: 80,
    autonomy: 100,
    chargeTime:{
      hours: 1,
      minutes: 0,
      seconds: 0
    },
    active:false
  };
  let planningMock1: Iroute= {
    id: '1',
    truckPlate: '01-01-AA',
    planningDate: '15052012',
    path: 'M01',
    planningTime: 200,
    heuristic: 'best-time',
    generations: 0,
    population: 0,
    crossover: 0,
    mutation: 0
  };
  let mockPackingService : PackingServiceService;
  let packingMock1: IPacking= {
    id:'1',
    truckPlate: '01-01-AA',
    deliveryId: '1',
    position:{
        positionX: 0,
        positionY: 0,
        positionZ: 0
    }
  };
  let packingMock2: IPacking= {
    id:'2',
    truckPlate: '01-01-AA',
    deliveryId: '2',
    position:{
        positionX: 1,
        positionY: 0,
        positionZ: 0
    }
  };
  let mockDeliveryService : DeliveryServiceService;
  let deliveryMock1: IDelivery= {
    id: '1',
    weight: 200,
    unloadTime: 7,
    loadTime: 9,
    limitDate: '10/10/2022',
    warehouse: 'M01'
  };
  let deliveryMock2: IDelivery= {
    id: '2',
    weight: 150,
    unloadTime: 10,
    loadTime: 15,
    limitDate: '10/10/2022',
    warehouse: 'M02'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        MatSidenavModule
      ],
      declarations: [ RoutePlanningComponent ]
    })
    .compileComponents();
    mockPlanningService = TestBed.inject(RoutePlanningService);
    spyOn(mockPlanningService, 'postPlanByPlateAndDate').and.returnValue(of(planningMock1));
    mockPackingService = TestBed.inject(PackingServiceService);
    spyOn(mockPackingService, 'getAllPackings').and.returnValue(of([packingMock1,packingMock2]));
    mockDeliveryService = TestBed.inject(DeliveryServiceService);
    spyOn(mockDeliveryService, 'getAllDeliveries').and.returnValue(of([deliveryMock1,deliveryMock2]));
    mockTruckService = TestBed.inject(TruckServiceService);
    spyOn(mockTruckService, 'getAllTrucks').and.returnValue(of([truckMock]));

    fixture = TestBed.createComponent(RoutePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    let sidebar = component.sideBarOpen;
    component.sideBarToggler();
    expect(component.sideBarOpen).toEqual(!sidebar);
  });

  it('should instantiate route with empty attributes', () => {
    expect(component.routes.id).toEqual('');
    expect(component.routes.truckPlate).toEqual('');
    expect(component.routes.planningDate).toEqual('');
    expect(component.routes.planningTime).toEqual(0);
    expect(component.routes.path).toEqual('');
    expect(component.routes.heuristic).toEqual('');
    expect(component.message).toEqual('');
  });

  it('should get all delivery through a mocked service', () => {
    component.getAllDeliveries();
    expect(component.deliveries).toEqual([deliveryMock1,deliveryMock2]);
  });

  it('should get plates through a mocked service', () => {
    component.getPlates();
    expect(component.plateList).toEqual([truckMock]);
  });

  it('should update submit variable when call getRoutePlanning method', () => {
    component.getRoutePlanning();
    expect(component.submitted).toBeTrue();
  });

  it('should return the dates of the planning for a specific truck', () => {
    component.getDates(packingMock1.truckPlate);
    expect(component.dateList).toEqual([deliveryMock1]);
    expect(component.selected).toBeTrue();
  });

  it('should post a planning', () => {
    component.postPlan(packingMock1.truckPlate, deliveryMock1.limitDate,planningMock1.heuristic,planningMock1.generations,planningMock1.population,planningMock1.crossover,planningMock1.mutation);
    expect(component.routes.truckPlate).toEqual(packingMock1.truckPlate);
    expect(component.routes.planningDate).toEqual(deliveryMock1.limitDate);
    expect(component.submitted).toBeTrue();
  });
});
