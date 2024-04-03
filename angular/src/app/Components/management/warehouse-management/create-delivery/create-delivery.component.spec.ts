import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import { CreateDeliveryComponent } from './create-delivery.component';
import { DeliveryServiceService } from '../../../../services/delivery-service.service';
import { IDelivery } from 'src/app/interfaces/idelivery';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';

describe('CreateDeliveryComponent', () => {
  let component: CreateDeliveryComponent;
  let fixture: ComponentFixture<CreateDeliveryComponent>;
  let mockTruckService : DeliveryServiceService;
  let deliveryMock: IDelivery= {
    id: '1',
    weight: 200,
    unloadTime: 7,
    loadTime: 9,
    limitDate: '10/10/2022',
    warehouse: 'M01'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        MatSidenavModule
      ],
      declarations: [ CreateDeliveryComponent ]
    })
    .compileComponents();
    mockTruckService = TestBed.inject(DeliveryServiceService);
    spyOn(mockTruckService, 'createDelivery').and.returnValue(of(deliveryMock));

    fixture = TestBed.createComponent(CreateDeliveryComponent);
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

  it('should have a form-control element with id LimitDate', () => {
    const el = fixture.debugElement.query(By.css('#LimitDate'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id Warehouse', () => {
    const el = fixture.debugElement.query(By.css('#WarehouseId'));
    expect (el). toBeTruthy();
  });

  it('should bind the Weight to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#Weight'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = 250;
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#Weight')).nativeElement.value).toBe('250');
  });

  it('should bind the UnloadTime to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#UnloadTime'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '7';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#UnloadTime')).nativeElement.value).toBe('7');
  });

  it('should bind the LoadTime to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#LoadTime'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '12';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#LoadTime')).nativeElement.value).toBe('12');
  });

  it('should render correct number of warehouse options', () => {
    const warehouseList = [
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
        altitude: 21,
        active:false

      },
      {
        id: 'G01',
        designation: 'Gondomar',
        address: 'Rua 3',
        latitude: 39,
        longitude: 41,
        altitude: 19,
        active:false

      }
    ];
    
    // Act
    component.warehouses = warehouseList;
    fixture.detectChanges();
    
    const optionEl = fixture.debugElement .queryAll(By.css('#option'));
    expect (optionEl.length) .toEqual(warehouseList.length);
    
  });

  it('should display correct text on the dropdown options', () => {
    const warehouseList = [
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
        altitude: 21,
        active:false

      },
      {
        id: 'G01',
        designation: 'Gondomar',
        address: 'Rua 3',
        latitude: 39,
        longitude: 41,
        altitude: 19,
        active:false

      }
    ];
    
    // Act
    component.warehouses = warehouseList;
    fixture.detectChanges();
    
    const optionEls = fixture.debugElement .queryAll(By.css('#option'));
    optionEls.forEach((el, index) => {
      if (index !== 0) {
        expect((el.nativeElement as HTMLOptionElement) .innerText).toEqual(warehouseList[index]['designation']);
      }
    });
  });

  it('should submit the form', () => {
    const btnEl = fixture.debugElement.query(By.css('#submit'));
    const fnc = spyOn(component, 'createDelivery');

    (btnEl.nativeElement as HTMLButtonElement) .click();
    fixture.detectChanges();

    expect(fnc).toHaveBeenCalled();
  });
});
