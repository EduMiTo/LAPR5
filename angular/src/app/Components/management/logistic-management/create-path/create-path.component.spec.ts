import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreatePathComponent } from './create-path.component';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PathServiceService } from '../../../../services/path-service.service';
import { WarehouseServiceService } from '../../../../services/warehouse-service.service';
import { of } from 'rxjs/internal/observable/of';
import { IPath } from 'src/app/interfaces/ipath';
import { IWarehouse } from 'src/app/interfaces/iwarehouse';
import { MatSidenavModule } from '@angular/material/sidenav';

describe('CreatePathComponent', () => {
  let component: CreatePathComponent;
  let fixture: ComponentFixture<CreatePathComponent>;
  let mockPathService : PathServiceService;
  let pathMock: IPath= {
    id:'1',
    idWarehouseStart: 'M01',
    idWarehouseEnd: 'M02',
    distance: 50,
    time: {
      hours: 1,
      minutes: 25,
      seconds: 0
    },
    energy: 30,
    extraTime: {
      hours: 0,
      minutes: 15,
      seconds: 0
    }
  };
  let mockWarehouseService : WarehouseServiceService;
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
    latitude: 39,
    longitude: 41,
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
      declarations: [ CreatePathComponent ]
    })
    .compileComponents();
    mockPathService = TestBed.inject(PathServiceService);
    spyOn(mockPathService, 'createPath').and.returnValue(of(pathMock));
    mockWarehouseService = TestBed.inject(WarehouseServiceService);
    spyOn(mockWarehouseService, 'getWarehouses').and.returnValue(of([warehouseMock1,warehouseMock2]));

    fixture = TestBed.createComponent(CreatePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate path with empty attributes', () => {
    expect(component.path.id).toEqual('');
    expect(component.path.idWarehouseStart).toEqual('');
    expect(component.path.idWarehouseEnd).toEqual('');
    expect(component.path.distance).toEqual(0);
    expect(component.path.energy).toEqual(0);
    expect(component.path.time.hours).toEqual(0);
    expect(component.path.time.minutes).toEqual(0);
    expect(component.path.time.seconds).toEqual(0);
    expect(component.path.extraTime.hours).toEqual(0);
    expect(component.path.extraTime.minutes).toEqual(0);
    expect(component.path.extraTime.seconds).toEqual(0);
  });

  it('should toggle sidebar', () => {
    let sidebar = component.sideBarOpen;
    component.sideBarToggler();
    expect(component.sideBarOpen).toEqual(!sidebar);
  });

  it('should have a form-control element with id idWarehouseStart', () => {
    const el = fixture.debugElement.query(By.css('#idWarehouseStart'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id idWarehouseEnd', () => {
    const el = fixture.debugElement.query(By.css('#idWarehouseEnd'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id distance', () => {
    const el = fixture.debugElement.query(By.css('#distance'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id energy', () => {
    const el = fixture.debugElement.query(By.css('#energy'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id hours', () => {
    const el = fixture.debugElement.query(By.css('#hours'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id minutes', () => {
    const el = fixture.debugElement.query(By.css('#minutes'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id seconds', () => {
    const el = fixture.debugElement.query(By.css('#seconds'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id et_Hours', () => {
    const el = fixture.debugElement.query(By.css('#et_Hours'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id et_Minutes', () => {
    const el = fixture.debugElement.query(By.css('#et_Minutes'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id et_Seconds', () => {
    const el = fixture.debugElement.query(By.css('#et_Seconds'));
    expect (el). toBeTruthy();
  });

  it('should bind the distance to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#distance'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '35';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#distance')).nativeElement.value).toBe('35');
  });

  it('should bind the energy to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#energy'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '27';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#energy')).nativeElement.value).toBe('27');
  });

  it('should bind the hours to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#hours'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '1';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#hours')).nativeElement.value).toBe('1');
  });

  it('should bind the minutes to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#minutes'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '34';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#minutes')).nativeElement.value).toBe('34');
  });

  it('should bind the seconds to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#seconds'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '0';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#seconds')).nativeElement.value).toBe('0');
  });

  it('should bind the et_Hours to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#et_Hours'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '1';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#et_Hours')).nativeElement.value).toBe('1');
  });

  it('should bind the et_Minutes to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#et_Minutes'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '34';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#et_Minutes')).nativeElement.value).toBe('34');
  });

  it('should bind the et_Seconds to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#et_Seconds'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = '0';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#et_Seconds')).nativeElement.value).toBe('0');
  });

  it('should create a path through a mocked service', () => {
    const pathList = {
      id:'1',
      idWarehouseStart: 'M01',
      idWarehouseEnd: 'M02',
      distance: 50,
      time: {
        hours: 1,
        minutes: 25,
        seconds: 0
      },
      energy: 30,
      extraTime: {
        hours: 0,
        minutes: 15,
        seconds: 0
      }
    };
    
        component.createPath(pathList);
        expect(component.submitted).toBeTrue();
        expect(component.path).toEqual(pathMock);
  });

  it('should get a warehouse by id', () => {
    component.ngOnInit();
    component.getWarehouseById('M01');
    expect(component.selectedWarehouse).toEqual(warehouseMock1);
});

  it('should submit the form', () => {
    const btnEl = fixture.debugElement.query(By.css('#submit'));
    const fnc = spyOn(component, 'createPath');

    (btnEl.nativeElement as HTMLButtonElement) .click();
    fixture.detectChanges();

    expect(fnc).toHaveBeenCalled();
  });
  
});
