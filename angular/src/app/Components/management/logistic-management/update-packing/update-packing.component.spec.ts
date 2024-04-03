import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdatePackingComponent } from './update-packing.component';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PackingServiceService } from '../../../../services/packing-service.service';
import { of } from 'rxjs/internal/observable/of';
import { IPacking } from 'src/app/interfaces/ipacking';
import { MatSidenavModule } from '@angular/material/sidenav';

describe('UpdatePackingComponent', () => {
  let component: UpdatePackingComponent;
  let fixture: ComponentFixture<UpdatePackingComponent>;
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
    deliveryId: '1',
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
        FormsModule,
        MatSidenavModule
      ],
      declarations: [ UpdatePackingComponent ]
    })
    .compileComponents();
    mockPackingService = TestBed.inject(PackingServiceService);
    spyOn(mockPackingService, 'updatePacking').and.returnValue(of(packingMock1));
    spyOn(mockPackingService, 'getAllPackings').and.returnValue(of([packingMock1,packingMock2]));

    fixture = TestBed.createComponent(UpdatePackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate packing with empty attributes', () => {
    expect(component.packing.id).toEqual('');
    expect(component.packing.truckPlate).toEqual('');
    expect(component.packing.deliveryId).toEqual('');
    expect(component.packing.position.positionX).toEqual(0);
    expect(component.packing.position.positionY).toEqual(0);
    expect(component.packing.position.positionZ).toEqual(0);
  });

  it('should instantiate packing with empty attributes', () => {
    expect(component.selectedPacking.id).toEqual('');
    expect(component.selectedPacking.truckPlate).toEqual('');
    expect(component.selectedPacking.deliveryId).toEqual('');
    expect(component.selectedPacking.position.positionX).toEqual(0);
    expect(component.selectedPacking.position.positionY).toEqual(0);
    expect(component.selectedPacking.position.positionZ).toEqual(0);
  });

  it('should toggle sidebar', () => {
    let sidebar = component.sideBarOpen;
    component.sideBarToggler();
    expect(component.sideBarOpen).toEqual(!sidebar);
  });

  it('should have a form-control element with id id', () => {
    const el = fixture.debugElement.query(By.css('#id'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id positionX', () => {
    const el = fixture.debugElement.query(By.css('#positionX'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id positionY', () => {
    const el = fixture.debugElement.query(By.css('#positionY'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id positionZ', () => {
    const el = fixture.debugElement.query(By.css('#positionZ'));
    expect (el). toBeTruthy();
  });
    
  it('should have a label for the packing id field', () => {
    const el = fixture.debugElement.query(By.css('#label'));
    expect (el) .toBeTruthy();
  });

  it('should render correct number of plate options', () => {
    const packingList = [
      {
        id:'1',
        truckPlate: '01-01-AA',
        deliveryId: '1',
        position:{
            positionX: 0,
            positionY: 0,
            positionZ: 0
        }
      },
      {
        id:'2',
        truckPlate: '01-01-AA',
        deliveryId: '1',
        position:{
            positionX: 1,
            positionY: 0,
            positionZ: 0
        }
      },
      {
        id:'3',
        truckPlate: '01-01-AA',
        deliveryId: '1',
        position:{
            positionX: 0,
            positionY: 1,
            positionZ: 0
        }
      }
    ];
    
    // Act
    component.packings = packingList;
    fixture.detectChanges();
    
    const optionEl = fixture.debugElement .queryAll(By.css('#option'));
    expect (optionEl.length) .toEqual(packingList.length);
    
  });

  it('should display correct text on the dropdown options', () => {
    const packingList = [
      {
        id:'1',
        truckPlate: '01-01-AA',
        deliveryId: '1',
        position:{
            positionX: 0,
            positionY: 0,
            positionZ: 0
        }
      },
      {
        id:'2',
        truckPlate: '01-01-AA',
        deliveryId: '1',
        position:{
            positionX: 1,
            positionY: 0,
            positionZ: 0
        }
      },
      {
        id:'3',
        truckPlate: '01-01-AA',
        deliveryId: '1',
        position:{
            positionX: 0,
            positionY: 1,
            positionZ: 0
        }
      }
    ];
    
    // Act
    component.packings = packingList;
    fixture.detectChanges();
    
    const optionEls = fixture.debugElement .queryAll(By.css('#option'));
    optionEls.forEach((el, index) => {
      if (index !== 0) {
        expect((el.nativeElement as HTMLOptionElement) .innerText).toEqual(packingList[index]['truckPlate'] + " - " + packingList[index]['deliveryId']);
      }
    });
    
  });

  it('should update a packing through a mocked service', () => {
    const packingList = {
      id:'1',
      truckPlate: '01-01-AA',
      deliveryId: '1',
      position:{
          positionX: 0,
          positionY: 1,
          positionZ: 0
      }
    };
    
        component.updatePacking(packingList);
        expect(component.submitted).toBeTrue();
        expect(component.packing).toEqual(packingMock1);
  });

  it('should get a packing by id', () => {
      component.ngOnInit();
      component.getPackingById('1');
      expect(component.selectedPacking).toEqual(packingMock1);
  });

  it('should submit the form', () => {
    const btnEl = fixture.debugElement.query(By.css('#submit'));
    const fnc = spyOn(component, 'updatePacking');

    (btnEl.nativeElement as HTMLButtonElement) .click();
    fixture.detectChanges();

    expect(fnc).toHaveBeenCalled();
  });
});
