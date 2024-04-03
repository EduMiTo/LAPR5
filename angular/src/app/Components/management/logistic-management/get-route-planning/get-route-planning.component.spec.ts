import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetRoutePlanningComponent } from './get-route-planning.component';
import {FormsModule} from '@angular/forms';
import { RoutePlanningService } from '../../../../services/route-planning.service';
import { Iroute } from 'src/app/interfaces/iroute';
import { of } from 'rxjs/internal/observable/of';
import { MatSidenavModule } from '@angular/material/sidenav';

describe('GetRoutePlanningComponent', () => {
  let component: GetRoutePlanningComponent;
  let fixture: ComponentFixture<GetRoutePlanningComponent>;
  let mockPlanningService : RoutePlanningService;
  let planningMock1: Iroute= {
    id: '1',
    truckPlate: '01-01-AA',
    planningDate: '15052012',
    path: 'M01',
    planningTime: 200,
    heuristic: 'best-time',
    generations: 0,
    population: 0,
    crossover: 0,
    mutation: 0
  };
  let planningMock2: Iroute= {
    id: '2',
    truckPlate: '01-01-AB',
    planningDate: '15052012',
    path: 'M02',
    planningTime: 220,
    heuristic: 'best-time',
    generations: 0,
    population: 0,
    crossover: 0,
    mutation: 0
  };
  let routes: Iroute[] = [{
    id: '1',
    truckPlate: '01-01-AA',
    planningDate: '15//0/5/20',
    path: 'M01',
    planningTime: 200,
    heuristic: 'best-time',
    generations: 0,
    population: 0,
    crossover: 0,
    mutation: 0
    
  },
  {
    id: '2',
    truckPlate: '01-01-AB',
    planningDate: '15//0/5/20',
    path: 'M02',
    planningTime: 220,
    heuristic: 'best-time',
    generations: 0,
    population: 0,
    crossover: 0,
    mutation: 0 
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        MatSidenavModule
      ],
      declarations: [ GetRoutePlanningComponent ]
    })
    .compileComponents();
    mockPlanningService = TestBed.inject(RoutePlanningService);
    spyOn(mockPlanningService, 'getAllRoutes').and.returnValue(of([planningMock1,planningMock2]));

    fixture = TestBed.createComponent(GetRoutePlanningComponent);
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
