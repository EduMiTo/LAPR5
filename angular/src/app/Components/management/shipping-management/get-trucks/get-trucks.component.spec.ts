import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TruckServiceService } from '../../../../services/truck-service.service';
import { of } from 'rxjs/internal/observable/of';
import { ITruck } from 'src/app/interfaces/itruck';
import { GetTrucksComponent } from './get-trucks.component';
import { By } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GetTrucksComponent', () => {
  let component: GetTrucksComponent;
  let fixture: ComponentFixture<GetTrucksComponent>;
  let mockTruckService : TruckServiceService;
  let truckMock1: ITruck= {
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
  let truckMock2: ITruck= {
    plate: '01-01-AA',
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [ GetTrucksComponent ]
    })
    .compileComponents();
    mockTruckService = TestBed.inject(TruckServiceService);
    spyOn(mockTruckService, 'getAllTrucks').and.returnValue(of([truckMock1,truckMock2]));
    spyOn(mockTruckService, 'deleteTruck').and.returnValue(of([truckMock1]));

    fixture = TestBed.createComponent(GetTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate truck with empty attributes', () => {
    expect(component.truck.plate).toEqual('');
    expect(component.truck.tare).toEqual(0);
    expect(component.truck.maximumBattery).toEqual(0);
    expect(component.truck.autonomy).toEqual(0);
    expect(component.truck.massCapacity).toEqual(0);
    expect(component.truck.chargeTime.hours).toEqual(0);
    expect(component.truck.chargeTime.minutes).toEqual(0);
    expect(component.truck.chargeTime.seconds).toEqual(0);
  });

  it('should toggle sidebar', () => {
    let sidebar = component.sideBarOpen;
    component.sideBarToggler();
    expect(component.sideBarOpen).toEqual(!sidebar);
  });

  it('should have a input element with id myInput', () => {
    const el = fixture.debugElement.query(By.css('#myInput'));
    expect (el). toBeTruthy();
  });
});
