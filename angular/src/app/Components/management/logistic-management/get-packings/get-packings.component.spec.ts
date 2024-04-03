import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PackingServiceService } from '../../../../services/packing-service.service';
import { of } from 'rxjs/internal/observable/of';
import { IPacking } from 'src/app/interfaces/ipacking';
import { GetPackingsComponent } from './get-packings.component';
import { MatSidenavModule } from '@angular/material/sidenav';

describe('GetPackingsComponent', () => {
  let component: GetPackingsComponent;
  let fixture: ComponentFixture<GetPackingsComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSidenavModule
      ],
      declarations: [ GetPackingsComponent ]
    })
    .compileComponents();
    mockPackingService = TestBed.inject(PackingServiceService);
    spyOn(mockPackingService, 'getAllPackings').and.returnValue(of([packingMock1,packingMock2]));

    fixture = TestBed.createComponent(GetPackingsComponent);
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
