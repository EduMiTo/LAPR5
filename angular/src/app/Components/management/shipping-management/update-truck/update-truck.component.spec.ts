import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdateTruckComponent } from './update-truck.component';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TruckServiceService } from '../../../../services/truck-service.service';
import { of } from 'rxjs/internal/observable/of';
import { ITruck } from 'src/app/interfaces/itruck';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdateTruckComponent', () => {
  let component: UpdateTruckComponent;
  let fixture: ComponentFixture<UpdateTruckComponent>;
  let mockTruckService : TruckServiceService;
  let truckMock1: ITruck= {
    plate: '01-01-AB',
    tare: 7500,
    massCapacity: 4300,
    maximumBattery: 80,
    autonomy: 100,
    chargeTime: {
      hours: 1,
      minutes: 0,
      seconds: 0
    },
    active: false
  };
  let truckMock2: ITruck= {
    plate: '01-01-AA',
    tare: 7500,
    massCapacity: 4300,
    maximumBattery: 80,
    autonomy: 100,
    chargeTime: {
      hours: 1,
      minutes: 0,
      seconds: 0
    },
    active: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [ UpdateTruckComponent ]
    })
    .compileComponents();
    mockTruckService = TestBed.inject(TruckServiceService);
    spyOn(mockTruckService, 'updateTruck').and.returnValue(of(truckMock1));
    spyOn(mockTruckService, 'getAllTrucks').and.returnValue(of([truckMock1,truckMock2]));

    fixture = TestBed.createComponent(UpdateTruckComponent);
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

  it('should instantiate selected truck with empty attributes', () => {
    expect(component.selectedTruck.plate).toEqual('');
    expect(component.selectedTruck.tare).toEqual(0);
    expect(component.selectedTruck.maximumBattery).toEqual(0);
    expect(component.selectedTruck.autonomy).toEqual(0);
    expect(component.selectedTruck.massCapacity).toEqual(0);
    expect(component.selectedTruck.chargeTime.hours).toEqual(0);
    expect(component.selectedTruck.chargeTime.minutes).toEqual(0);
    expect(component.selectedTruck.chargeTime.seconds).toEqual(0);
  });

  it('should toggle sidebar', () => {
    let sidebar = component.sideBarOpen;
    component.sideBarToggler();
    expect(component.sideBarOpen).toEqual(!sidebar);
  });

  it('should have a form-control element with id Plate', () => {
    const el = fixture.debugElement.query(By.css('#Plate'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id Tare', () => {
    const el = fixture.debugElement.query(By.css('#Tare'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id MassCapacity', () => {
    const el = fixture.debugElement.query(By.css('#MassCapacity'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id Autonomy', () => {
    const el = fixture.debugElement.query(By.css('#Autonomy'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id Battery', () => {
    const el = fixture.debugElement.query(By.css('#Battery'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id Hours', () => {
    const el = fixture.debugElement.query(By.css('#Hours'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id Minutes', () => {
    const el = fixture.debugElement.query(By.css('#Minutes'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id Seconds', () => {
    const el = fixture.debugElement.query(By.css('#Seconds'));
    expect (el). toBeTruthy();
  });
    
  it('should have a label for the truck plate field', () => {
    const el = fixture.debugElement.query(By.css('#label'));
    expect (el) .toBeTruthy();
  });
    
    
  it('should have a select element for the truck plate field', () => {
    // Arrange & Assert
    const el = fixture.debugElement.query(By.css('#Plate'));
    expect (el) .toBeTruthy();
  });

  it('should render correct number of plate options', () => {
    const plateList = [
      {
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

      },
      {
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

      },
      {
        plate: '01-01-AC',
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

      }
    ];
    
    // Act
    component.trucks = plateList;
    fixture.detectChanges();
    
    const optionEl = fixture.debugElement .queryAll(By.css('#option'));
    expect (optionEl.length) .toEqual(plateList.length);
    
  });

  it('should display correct text on the dropdown options', () => {
    const plateList = [
      {
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

      },
      {
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

      },
      {
        plate: '01-01-AC',
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

      }
    ];
    
    // Act
    component.trucks = plateList;
    fixture.detectChanges();
    
    const optionEls = fixture.debugElement .queryAll(By.css('#option'));
    optionEls.forEach((el, index) => {
      if (index !== 0) {
        expect((el.nativeElement as HTMLOptionElement) .innerText).toEqual(plateList[index]['plate']);
      }
    });
    
  });

  it('should update a truck through a mocked service', () => {
    const plateList = {
        plate: '01-01-AB',
        tare: 7500,
        massCapacity: 4300,
        maximumBattery: 80,
        autonomy: 100,
        chargeTime:{
          hours: 1,
          minutes: 0,
          seconds: 0
        }};
    
        component.updateTruck(plateList);
        expect(component.submitted).toBeTrue();
        expect(component.truck).toEqual(truckMock1);
  });

  it('should get a truck by plate', () => {
      component.ngOnInit();
      component.getTruckByPlate('01-01-AA');
      expect(component.selectedTruck).toEqual(truckMock2);
  });

  it('should submit the form', () => {
    const btnEl = fixture.debugElement.query(By.css('#submit'));
    const fnc = spyOn(component, 'updateTruck');

    (btnEl.nativeElement as HTMLButtonElement) .click();
    fixture.detectChanges();

    expect(fnc).toHaveBeenCalled();
  });
});
