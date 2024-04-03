import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdateWarehouseComponent } from './update-warehouse.component';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { WarehouseServiceService } from '../../../../services/warehouse-service.service';
import { of } from 'rxjs/internal/observable/of';
import { IWarehouse } from 'src/app/interfaces/iwarehouse';
import { MatSidenavModule } from '@angular/material/sidenav';

describe('UpdateWarehouseComponent', () => {
  let component: UpdateWarehouseComponent;
  let fixture: ComponentFixture<UpdateWarehouseComponent>;
  let mockTruckService : WarehouseServiceService;
  let warehouseMock1: IWarehouse= {
    id: 'M01',
    designation: 'Matosinhos',
    address: 'Rua 1',
    latitude: 40,
    longitude: 40,
    altitude: 20,
    active: false
  };
  let warehouseMock2: IWarehouse= {
    id: 'M02',
    designation: 'Maia',
    address: 'Rua 2',
    latitude: 41,
    longitude: 39,
    altitude: 19,
    active: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        MatSidenavModule
      ],
      declarations: [ UpdateWarehouseComponent ]
    })
    .compileComponents();
    mockTruckService = TestBed.inject(WarehouseServiceService);
    spyOn(mockTruckService, 'updateWarehouse').and.returnValue(of(warehouseMock1));
    spyOn(mockTruckService, 'getWarehouses').and.returnValue(of([warehouseMock1,warehouseMock2]));

    fixture = TestBed.createComponent(UpdateWarehouseComponent);
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

  it('should instantiate selected warehouse with empty attributes', () => {
    expect(component.selectedWarehouse.id).toEqual('');
    expect(component.selectedWarehouse.designation).toEqual('');
    expect(component.selectedWarehouse.address).toEqual('');
    expect(component.selectedWarehouse.latitude).toEqual(0);
    expect(component.selectedWarehouse.longitude).toEqual(0);
    expect(component.selectedWarehouse.altitude).toEqual(0);
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

  it('should render correct number of id options', () => {
    const idList = [
      {
        id: 'M01',
        designation: 'Matosinhos',
        address: 'Rua 1',
        latitude: 40,
        longitude: 40,
        altitude: 20,
        active:false
      },
      {
        id: 'M02',
        designation: 'Maia',
        address: 'Rua 2',
        latitude: 41,
        longitude: 39,
        altitude: 19,
        active:false

      },
      {
        id: 'G01',
        designation: 'Gondomar',
        address: 'Rua 3',
        latitude: 39,
        longitude: 41,
        altitude: 21,
        active:false

      }
    ];
    
    // Act
    component.warehouses = idList;
    fixture.detectChanges();
    
    const optionEl = fixture.debugElement .queryAll(By.css('#option'));
    expect (optionEl.length) .toEqual(idList.length);
    
  });

  it('should display correct text on the dropdown options', () => {
    const idList = [
      {
        id: 'M01',
        designation: 'Matosinhos',
        address: 'Rua 1',
        latitude: 40,
        longitude: 40,
        altitude: 20,
        active:false

      },
      {
        id: 'M02',
        designation: 'Maia',
        address: 'Rua 2',
        latitude: 41,
        longitude: 39,
        altitude: 19,
        active:false

      },
      {
        id: 'G01',
        designation: 'Gondomar',
        address: 'Rua 3',
        latitude: 39,
        longitude: 41,
        altitude: 21,
        active:false

      }
    ];
    
    // Act
    component.warehouses = idList;
    fixture.detectChanges();
    
    const optionEls = fixture.debugElement .queryAll(By.css('#option'));
    optionEls.forEach((el, index) => {
      if (index !== 0) {
        expect((el.nativeElement as HTMLOptionElement) .innerText).toEqual(idList[index]['id'] + " - " + idList[index]['designation']);
      }
    });
    
  });

  it('should update a warehouse through a mocked service', () => {
    const warehouseList = {
      id: 'M01',
      designation: 'Matosinhos',
      address: 'Rua 1',
      latitude: 40,
      longitude: 40,
      altitude: 20
    };
    
        component.updateWarehouse(warehouseList);
        expect(component.submitted).toBeTrue();
        expect(component.warehouse).toEqual(warehouseMock1);
  });

  it('should get a warehouse by id', () => {
      component.ngOnInit();
      component.getWarehouseById('M01');
      expect(component.selectedWarehouse).toEqual(warehouseMock1);
  });

  it('should submit the form', () => {
    const btnEl = fixture.debugElement.query(By.css('#submit'));
    const fnc = spyOn(component, 'updateWarehouse');

    (btnEl.nativeElement as HTMLButtonElement) .click();
    fixture.detectChanges();

    expect(fnc).toHaveBeenCalled();
  });
});
