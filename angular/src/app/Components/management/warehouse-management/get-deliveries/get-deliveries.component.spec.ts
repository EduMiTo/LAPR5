import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeliveryServiceService } from 'src/app/services/delivery-service.service';
import { of } from 'rxjs/internal/observable/of';
import { IDelivery } from 'src/app/interfaces/idelivery';
import { GetDeliveriesComponent } from './get-deliveries.component';
import { By } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';

describe('GetDeliveriesComponent', () => {
  let component: GetDeliveriesComponent;
  let fixture: ComponentFixture<GetDeliveriesComponent>;
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
        RouterTestingModule,
        HttpClientTestingModule,
        MatSidenavModule
      ],
      declarations: [ GetDeliveriesComponent ]
    })
    .compileComponents();
    mockDeliveryService = TestBed.inject(DeliveryServiceService);
    spyOn(mockDeliveryService, 'getAllDeliveries').and.returnValue(of([deliveryMock1,deliveryMock2]));
    spyOn(mockDeliveryService, 'deleteDelivery').and.returnValue(of(deliveryMock1));

    fixture = TestBed.createComponent(GetDeliveriesComponent);
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
