import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateTruckComponent } from './create-truck.component';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TruckServiceService } from '../../../../services/truck-service.service';
import { of } from 'rxjs/internal/observable/of';
import { ITruck } from 'src/app/interfaces/itruck';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateTruckComponent', () => {
  let component: CreateTruckComponent;
  let fixture: ComponentFixture<CreateTruckComponent>;
  let mockTruckService : TruckServiceService;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [ CreateTruckComponent ],
    })
    .compileComponents();
    mockTruckService = TestBed.inject(TruckServiceService);
    spyOn(mockTruckService, 'createTruck').and.returnValue(of(truckMock));


    fixture = TestBed.createComponent(CreateTruckComponent);
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

  it('should bind the Plate to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#Plate'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '01-01-AA';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#Plate')).nativeElement.value).toBe('01-01-AA');
  });

  it('should bind the Tare to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#Tare'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '7500';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#Tare')).nativeElement.value).toBe('7500');
  });

  it('should bind the MassCapacity to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#MassCapacity'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '4300';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#MassCapacity')).nativeElement.value).toBe('4300');
  });

  it('should bind the Battery to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#Battery'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '80';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#Battery')).nativeElement.value).toBe('80');
  });

  it('should bind the Autonomy to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#Autonomy'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '100';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#Autonomy')).nativeElement.value).toBe('100');
  });

  it('should bind the Hours to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#Hours'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '1';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#Hours')).nativeElement.value).toBe('1');
  });

  it('should bind the Minutes to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#Minutes'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '30';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#Minutes')).nativeElement.value).toBe('30');
  });

  it('should bind the Seconds to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#Seconds'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '0';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#Seconds')).nativeElement.value).toBe('0');
  });

  it('should create a truck through a mocked service', () => {
    const plateList = {
        plate: '01-01-AA',
        tare: 7500,
        massCapacity: 4300,
        maximumBattery: 80,
        autonomy: 100,
        chargeTime:{
          hours: 1,
          minutes: 0,
          seconds: 0
        }};
    
        component.createTruck(plateList);
        expect(component.submitted).toBeTrue();
        expect(component.truck).toEqual(truckMock);
  });

  it('should submit the form', () => {
    const btnEl = fixture.debugElement.query(By.css('#submit'));
    const fnc = spyOn(component, 'createTruck');

    (btnEl.nativeElement as HTMLButtonElement) .click();
    fixture.detectChanges();

    expect(fnc).toHaveBeenCalled();
  });

});
