import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import { CreateWarehouseComponent } from './create-warehouse.component';
import { WarehouseServiceService } from '../../../../services/warehouse-service.service';
import { IWarehouse } from 'src/app/interfaces/iwarehouse';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateWarehouseComponent', () => {
  let component: CreateWarehouseComponent;
  let fixture: ComponentFixture<CreateWarehouseComponent>;
  let mockWarehouseService : WarehouseServiceService;
  let warehouseMock: IWarehouse= {
    id: 'M01',
    designation: 'Matosinhos',
    address: 'Rua 1',
    latitude: 40,
    longitude: 40,
    altitude: 20,
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
      declarations: [ CreateWarehouseComponent ]
    })
    .compileComponents();
    mockWarehouseService = TestBed.inject(WarehouseServiceService);
    spyOn(mockWarehouseService, 'addWarehouse').and.returnValue(of(warehouseMock));

    fixture = TestBed.createComponent(CreateWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate warehouse with empty attributes', () => {
    expect(component.warehouse.id).toEqual('');
    expect(component.warehouse.designation).toEqual('');
    expect(component.warehouse.address).toEqual('');
    expect(component.warehouse.latitude).toEqual(0);
    expect(component.warehouse.longitude).toEqual(0);
    expect(component.warehouse.altitude).toEqual(0);
  });

  it('should toggle sidebar', () => {
    let sidebar = component.sideBarOpen;
    component.sideBarToggler();
    expect(component.sideBarOpen).toEqual(!sidebar);
  });

  it('should have a form-control element with id', () => {
    const el = fixture.debugElement.query(By.css('#id'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with designation', () => {
    const el = fixture.debugElement.query(By.css('#designation'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with address', () => {
    const el = fixture.debugElement.query(By.css('#address'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with latitude', () => {
    const el = fixture.debugElement.query(By.css('#latitude'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with longitude', () => {
    const el = fixture.debugElement.query(By.css('#longitude'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with altitude', () => {
    const el = fixture.debugElement.query(By.css('#altitude'));
    expect (el). toBeTruthy();
  });

  it('should bind the designation to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#designation'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = 'Matosinhos';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#designation')).nativeElement.value).toBe('Matosinhos');
  });

  it('should bind the address to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#address'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = 'Rua 1';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#address')).nativeElement.value).toBe('Rua 1');
  });

  it('should bind the latitude to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#latitude'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = 40;
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#latitude')).nativeElement.value).toBe('40');
  });

  it('should bind the longitude to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#longitude'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = 40;
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#longitude')).nativeElement.value).toBe('40');
  });

  it('should bind the altitude to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#altitude'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = 20;
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#altitude')).nativeElement.value).toBe('20');
  });

  it('should create a warehouse through a mocked service', () => {
    const plateList = {
      id: 'M01',
      designation: 'Matosinhos',
      address: 'Rua 1',
      latitude: 40,
      longitude: 40,
      altitude: 20
    };
    component.createWarehouse(plateList);
    expect(component.submitted).toBeTrue();
    expect(component.warehouse).toEqual(warehouseMock);
    expect(component.error).toBeFalse();
  });

  it('should submit the form', () => {
    const btnEl = fixture.debugElement.query(By.css('#submit'));
    const fnc = spyOn(component, 'createWarehouse');

    (btnEl.nativeElement as HTMLButtonElement) .click();
    fixture.detectChanges();

    expect(fnc).toHaveBeenCalled();
  });
});
