import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdateDeliveryComponent } from './update-delivery.component';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DeliveryServiceService } from '../../../../services/delivery-service.service';
import { of } from 'rxjs/internal/observable/of';
import { IDelivery } from 'src/app/interfaces/idelivery';
import { MatSidenavModule } from '@angular/material/sidenav';

describe('UpdateDeliveryComponent', () => {
  let component: UpdateDeliveryComponent;
  let fixture: ComponentFixture<UpdateDeliveryComponent>;
  let mockTruckService : DeliveryServiceService;
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
    unloadTime: 5,
    loadTime: 7,
    limitDate: '10/10/2022',
    warehouse: 'M02'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        MatSidenavModule
      ],
      declarations: [ UpdateDeliveryComponent ]
    })
    .compileComponents();
    mockTruckService = TestBed.inject(DeliveryServiceService);
    spyOn(mockTruckService, 'updateDelivery').and.returnValue(of(deliveryMock1));
    spyOn(mockTruckService, 'getAllDeliveries').and.returnValue(of([deliveryMock1,deliveryMock2]));

    fixture = TestBed.createComponent(UpdateDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate delivery with empty attributes', () => {
    expect(component.delivery.id).toEqual('');
    expect(component.delivery.weight).toEqual(0);
    expect(component.delivery.unloadTime).toEqual(0);
    expect(component.delivery.loadTime).toEqual(0);
    expect(component.delivery.limitDate).toEqual('');
    expect(component.delivery.warehouse).toEqual('');
  });

  it('should instantiate selected delivery with empty attributes', () => {
    expect(component.selectedDelivery.id).toEqual('');
    expect(component.selectedDelivery.weight).toEqual(0);
    expect(component.selectedDelivery.unloadTime).toEqual(0);
    expect(component.selectedDelivery.loadTime).toEqual(0);
    expect(component.selectedDelivery.limitDate).toEqual('');
    expect(component.selectedDelivery.warehouse).toEqual('');
  });

  it('should toggle sidebar', () => {
    let sidebar = component.sideBarOpen;
    component.sideBarToggler();
    expect(component.sideBarOpen).toEqual(!sidebar);
  });

  it('should have a form-control element with id Weight', () => {
    const el = fixture.debugElement.query(By.css('#Weight'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id UnloadTime', () => {
    const el = fixture.debugElement.query(By.css('#UnloadTime'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id LoadTime', () => {
    const el = fixture.debugElement.query(By.css('#LoadTime'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id Warehouse', () => {
    const el = fixture.debugElement.query(By.css('#WarehouseId'));
    expect (el). toBeTruthy();
  });
    
    
  it('should have a select element for the deliveryId field', () => {
    const el = fixture.debugElement.query(By.css('#id'));
    expect (el) .toBeTruthy();
  });

  it('should render correct number of id options', () => {
    const idList = [
      {
        id: '1',
        weight: 200,
        unloadTime: 7,
        loadTime: 9,
        limitDate: '10/10/2022',
        warehouse: 'M01'
      },
      {
        id: '2',
        weight: 220,
        unloadTime: 6,
        loadTime: 7,
        limitDate: '10/10/2022',
        warehouse: 'M02'
      },
      {
        id: '3',
        weight: 150,
        unloadTime: 8,
        loadTime: 12,
        limitDate: '10/10/2022',
        warehouse: 'G01'
      }
    ];
    
    // Act
    component.deliveries = idList;
    fixture.detectChanges();
    
    const optionEl = fixture.debugElement .queryAll(By.css('#option'));
    expect (optionEl.length) .toEqual(idList.length);
    
  });

  it('should display correct text on the dropdown options', () => {
    const idList = [
      {
        id: '1',
        weight: 200,
        unloadTime: 7,
        loadTime: 9,
        limitDate: '10/10/2022',
        warehouse: 'M01'
      },
      {
        id: '2',
        weight: 220,
        unloadTime: 6,
        loadTime: 7,
        limitDate: '10/10/2022',
        warehouse: 'M02'
      },
      {
        id: '3',
        weight: 150,
        unloadTime: 8,
        loadTime: 12,
        limitDate: '10/10/2022',
        warehouse: 'G01'
      }
    ];
    
    // Act
    component.deliveries = idList;
    fixture.detectChanges();
    
    const optionEls = fixture.debugElement .queryAll(By.css('#option'));
    optionEls.forEach((el, index) => {
      if (index !== 0) {
        expect((el.nativeElement as HTMLOptionElement) .innerText).toEqual(idList[index]['id']);
      }
    });
    
  });

  it('should get a delivery by id', () => {
      component.ngOnInit();
      component.getDeliveryById('1');
      expect(component.selectedDelivery).toEqual(deliveryMock1);
  });

  it('should submit the form', () => {
    const btnEl = fixture.debugElement.query(By.css('#submit'));
    const fnc = spyOn(component, 'updateDelivery');

    (btnEl.nativeElement as HTMLButtonElement) .click();
    fixture.detectChanges();

    expect(fnc).toHaveBeenCalled();
  });
});
