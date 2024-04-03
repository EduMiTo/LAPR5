import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WarehouseServiceService } from 'src/app/services/warehouse-service.service';
import { of } from 'rxjs/internal/observable/of';
import { IWarehouse } from 'src/app/interfaces/iwarehouse';
import { GetWarehousesComponent } from './get-warehouses.component';
import { By } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GetWarehousesComponent', () => {
  let component: GetWarehousesComponent;
  let fixture: ComponentFixture<GetWarehousesComponent>;
  let mockWarehouseService : WarehouseServiceService;
  let warehouseMock1: IWarehouse= {
    id: 'M01',
    designation: 'Matosinhos',
    address: 'Rua 1',
    latitude: 40,
    longitude: 40,
    altitude: 20,
    active: true
  };
  let warehouseMock2: IWarehouse= {
    id: 'M02',
    designation: 'Maia',
    address: 'Rua 2',
    latitude: 41,
    longitude: 39,
    altitude: 19,
    active: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [ GetWarehousesComponent ]
    })
    .compileComponents();
    mockWarehouseService = TestBed.inject(WarehouseServiceService);
    spyOn(mockWarehouseService, 'getWarehouses').and.returnValue(of([warehouseMock1,warehouseMock2]));
    spyOn(mockWarehouseService, 'deleteWarehouse').and.returnValue(of(warehouseMock1));

    fixture = TestBed.createComponent(GetWarehousesComponent);
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
});
