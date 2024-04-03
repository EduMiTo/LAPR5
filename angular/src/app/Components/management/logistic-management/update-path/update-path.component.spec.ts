import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdatePathComponent } from './update-path.component';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PathServiceService } from '../../../../services/path-service.service';
import { of } from 'rxjs/internal/observable/of';
import { IPath } from 'src/app/interfaces/ipath';
import { MatSidenavModule } from '@angular/material/sidenav';

describe('UpdatePathComponent', () => {
  let component: UpdatePathComponent;
  let fixture: ComponentFixture<UpdatePathComponent>;
  let mockPathService : PathServiceService;
  let pathMock1: IPath= {
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
  let pathMock2: IPath= {
    id:'2',
    idWarehouseStart: 'M01',
    idWarehouseEnd: 'G01',
    distance: 30,
    time: {
      hours: 1,
      minutes: 15,
      seconds: 0
    },
    energy: 18,
    extraTime: {
      hours: 0,
      minutes: 0,
      seconds: 0
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
      declarations: [ UpdatePathComponent ]
    })
    .compileComponents();
    mockPathService = TestBed.inject(PathServiceService);
    spyOn(mockPathService, 'updatePath').and.returnValue(of(pathMock1));
    spyOn(mockPathService, 'getAllPaths').and.returnValue(of([pathMock1,pathMock2]));

    fixture = TestBed.createComponent(UpdatePathComponent);
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

  it('should instantiate path with empty attributes', () => {
    expect(component.selectedPath.id).toEqual('');
    expect(component.selectedPath.idWarehouseStart).toEqual('');
    expect(component.selectedPath.idWarehouseEnd).toEqual('');
    expect(component.selectedPath.distance).toEqual(0);
    expect(component.selectedPath.energy).toEqual(0);
    expect(component.selectedPath.time.hours).toEqual(0);
    expect(component.selectedPath.time.minutes).toEqual(0);
    expect(component.selectedPath.time.seconds).toEqual(0);
    expect(component.selectedPath.extraTime.hours).toEqual(0);
    expect(component.selectedPath.extraTime.minutes).toEqual(0);
    expect(component.selectedPath.extraTime.seconds).toEqual(0);
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

  it('should have a form-control element with id et_hours', () => {
    const el = fixture.debugElement.query(By.css('#et_hours'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id et_minutes', () => {
    const el = fixture.debugElement.query(By.css('#et_minutes'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id et_seconds', () => {
    const el = fixture.debugElement.query(By.css('#et_seconds'));
    expect (el). toBeTruthy();
  });
    
  it('should have a label for the packing id field', () => {
    const el = fixture.debugElement.query(By.css('#label'));
    expect (el) .toBeTruthy();
  });

  it('should render correct number of plate options', () => {
    const pathList = [
      {
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
      },
      {
        id:'2',
        idWarehouseStart: 'M01',
        idWarehouseEnd: 'G01',
        distance: 30,
        time: {
          hours: 1,
          minutes: 15,
          seconds: 0
        },
        energy: 18,
        extraTime: {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      },
      {
        id:'3',
        idWarehouseStart: 'M02',
        idWarehouseEnd: 'G01',
        distance: 55,
        time: {
          hours: 1,
          minutes: 37,
          seconds: 0
        },
        energy: 33,
        extraTime: {
          hours: 0,
          minutes: 10,
          seconds: 0
        }
      }
    ];
    
    // Act
    component.paths = pathList;
    fixture.detectChanges();
    
    const optionEl = fixture.debugElement .queryAll(By.css('#option'));
    expect (optionEl.length) .toEqual(pathList.length);
    
  });

  it('should display correct text on the dropdown options', () => {
    const pathList = [
      {
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
      },
      {
        id:'2',
        idWarehouseStart: 'M01',
        idWarehouseEnd: 'G01',
        distance: 30,
        time: {
          hours: 1,
          minutes: 15,
          seconds: 0
        },
        energy: 18,
        extraTime: {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      },
      {
        id:'3',
        idWarehouseStart: 'M02',
        idWarehouseEnd: 'G01',
        distance: 55,
        time: {
          hours: 1,
          minutes: 37,
          seconds: 0
        },
        energy: 33,
        extraTime: {
          hours: 0,
          minutes: 10,
          seconds: 0
        }
      }
    ];
    
    // Act
    component.paths = pathList;
    fixture.detectChanges();
    
    const optionEls = fixture.debugElement .queryAll(By.css('#option'));
    optionEls.forEach((el, index) => {
      if (index !== 0) {
        expect((el.nativeElement as HTMLOptionElement) .innerText).toEqual(pathList[index]['idWarehouseStart'] + ' - ' + pathList[index]['idWarehouseEnd']);
      }
    });
    
  });

  it('should update a path through a mocked service', () => {
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
    
        component.updatePath(pathList);
        expect(component.submitted).toBeTrue();
        expect(component.path).toEqual(pathMock1);
  });

  it('should get a path by id', () => {
      component.ngOnInit();
      component.getPathById('1');
      expect(component.selectedPath).toEqual(pathMock1);
  });

  it('should submit the form', () => {
    const btnEl = fixture.debugElement.query(By.css('#submit'));
    const fnc = spyOn(component, 'updatePath');

    (btnEl.nativeElement as HTMLButtonElement) .click();
    fixture.detectChanges();

    expect(fnc).toHaveBeenCalled();
  });
});
