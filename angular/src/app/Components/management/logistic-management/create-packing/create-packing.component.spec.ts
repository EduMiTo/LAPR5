import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreatePackingComponent } from './create-packing.component';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PackingServiceService } from '../../../../services/packing-service.service';
import { of } from 'rxjs/internal/observable/of';
import { IPacking } from 'src/app/interfaces/ipacking';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDialogModule} from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreatePackingComponent', () => {
  let component: CreatePackingComponent;
  let fixture: ComponentFixture<CreatePackingComponent>;
  let mockPackingService : PackingServiceService;
  let packingMock: IPacking= {
    id:'1',
    truckPlate: '01-01-AA',
    deliveryId: '1',
    position:{
        positionX: 0,
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
        MatSidenavModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [ CreatePackingComponent ]
    })
    .compileComponents();
    mockPackingService = TestBed.inject(PackingServiceService);
    spyOn(mockPackingService, 'createPacking').and.returnValue(of(packingMock));

    fixture = TestBed.createComponent(CreatePackingComponent);
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

  it('should toggle sidebar', () => {
    let sidebar = component.sideBarOpen;
    component.sideBarToggler();
    expect(component.sideBarOpen).toEqual(!sidebar);
  });

  it('should have a form-control element with id truckPlate', () => {
    const el = fixture.debugElement.query(By.css('#truckPlate'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id deliveryId', () => {
    const el = fixture.debugElement.query(By.css('#deliveryId'));
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

  it('should bind the positionX to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#positionX'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '1';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#positionX')).nativeElement.value).toBe('1');
  });

  it('should bind the positionY to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#positionY'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '1';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#positionY')).nativeElement.value).toBe('1');
  });

  it('should bind the positionZ to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#positionZ'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '1';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#positionZ')).nativeElement.value).toBe('1');
  });

  it('should create a packing through a mocked service', () => {
    const packingList = {
      id:'1',
      truckPlate: '01-01-AA',
      deliveryId: '1',
      position:{
          positionX: 0,
          positionY: 0,
          positionZ: 0
      }
    };
    
        component.createPacking(packingList);
        expect(component.submitted).toBeTrue();
        expect(component.packing).toEqual(packingMock);
  });

  it('should submit the form', () => {
    const btnEl = fixture.debugElement.query(By.css('#submit'));
    const fnc = spyOn(component, 'createPacking');

    (btnEl.nativeElement as HTMLButtonElement) .click();
    fixture.detectChanges();

    expect(fnc).toHaveBeenCalled();
  });
  
});
