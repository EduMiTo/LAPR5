import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PathServiceService } from '../../../../services/path-service.service';
import { of } from 'rxjs/internal/observable/of';
import { IPath } from 'src/app/interfaces/ipath';
import { GetPathsComponent } from './get-paths.component';
import { By } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';

describe('GetPathComponent', () => {
  let component: GetPathsComponent;
  let fixture: ComponentFixture<GetPathsComponent>;
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
        MatSidenavModule
      ],
      declarations: [ GetPathsComponent ]
    })
    .compileComponents();
    mockPathService = TestBed.inject(PathServiceService);
    spyOn(mockPathService, 'getAllPaths').and.returnValue(of([pathMock1,pathMock2]));
    spyOn(mockPathService, 'deletePath').and.returnValue(of([pathMock1]));

    fixture = TestBed.createComponent(GetPathsComponent);
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
