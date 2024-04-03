import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShippingManagementComponent } from './shipping-management.component';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShippingManagementComponent', () => {
  let component: ShippingManagementComponent;
  let fixture: ComponentFixture<ShippingManagementComponent>;
  class RouterStub{
    navigateByUrl(url:string){return url;}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [ ShippingManagementComponent ],
      providers: [
        {provide: Router, useClass: RouterStub  }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingManagementComponent);
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

  it('should navigate to create truck component', inject([Router],(router:Router)=>{
    const spy = spyOn(router, 'navigateByUrl');
    component.createTruck();
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/create-truck');
  }));

  it('should navigate to get trucks component', inject([Router],(router:Router)=>{
    const spy = spyOn(router, 'navigateByUrl');
    component.getTrucks();
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/get-trucks');
  }));

  it('should navigate to update truck component', inject([Router],(router:Router)=>{
    const spy = spyOn(router, 'navigateByUrl');
    component.updateTruck();
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/update-truck');
  }));
});
