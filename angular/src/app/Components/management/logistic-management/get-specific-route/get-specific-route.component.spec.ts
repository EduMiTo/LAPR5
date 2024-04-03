import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetSpecificRouteComponent } from './get-specific-route.component';
import {FormsModule} from '@angular/forms';
import { RoutePlanningService } from '../../../../services/route-planning.service';
import { Iroute } from 'src/app/interfaces/iroute';
import { of } from 'rxjs/internal/observable/of';
import { MatSidenavModule } from '@angular/material/sidenav';

describe('GetSpecificRouteComponent', () => {
  let component: GetSpecificRouteComponent;
  let fixture: ComponentFixture<GetSpecificRouteComponent>;
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
  let routes1: Iroute[] = [{
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
  },
  {
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
  }];

  let routes2: Iroute = {
    id: '1',
    truckPlate: '01-01-AA',
    planningDate: '15/05/2012',
    path: 'M01',
    planningTime: 200,
    heuristic: 'best-time',
    generations: 0,
    population: 0,
    crossover: 0,
    mutation: 0
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        MatSidenavModule
      ],
      declarations: [ GetSpecificRouteComponent ]
    })
    .compileComponents();
    mockPlanningService = TestBed.inject(RoutePlanningService);
    spyOn(mockPlanningService, 'getPlanByPlateAndDate').and.returnValue(of(planningMock1));
    spyOn(mockPlanningService, 'getAllRoutes').and.returnValue(of([planningMock1, planningMock2]));

    fixture = TestBed.createComponent(GetSpecificRouteComponent);
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

  //it('should get all plates with planning', () => {
  //  component.ngOnInit();
//
  //  expect(component.plateList).toEqual(routes1);
  //});

  it('should get a plan from a truck and a date', () => {
    component.ngOnInit();
    component.getPlan('01-01-AA','15052012');
    expect(component.routes).toEqual(routes2);
    expect(component.submitted).toBeTrue();
  });
});
