import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import {FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserServiceService } from 'src/app/services/user-service.service';
import { of } from 'rxjs/internal/observable/of';
import { IRole } from 'src/app/interfaces/irole';
import { ILoginUser } from 'src/app/interfaces/iloginuser';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDialogModule} from "@angular/material/dialog";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockUserService : UserServiceService;
  let userMock: ILoginUser= {
    firstName: 'First',
    lastName: 'Last',
    email: 'abc@gmail.com',
    password: 'ola123',
    role: '1',
    domainId: ''
  };
  let roleMock1: IRole= {
    name: 'logistic manager',
    id: '1'
  };
  let roleMock2: IRole= {
    name: 'shipping manager',
    id: '2'
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
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
    mockUserService = TestBed.inject(UserServiceService);
    spyOn(mockUserService, 'registerUser').and.returnValue(of(userMock));
    spyOn(mockUserService, 'getRoleByName').and.returnValue(of(roleMock1));
    spyOn(mockUserService, 'getRoles').and.returnValue(of([roleMock1,roleMock2]));

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate user with empty attributes', () => {
    expect(component.user.firstName).toEqual('');
    expect(component.user.lastName).toEqual('');
    expect(component.user.email).toEqual('');
    expect(component.user.password).toEqual('');
    expect(component.user.role).toEqual('');
  });

  it('should instantiate role with empty attributes', () => {
    expect(component.role.name).toEqual('');
    expect(component.role.id).toEqual('');
  });

  it('should toggle sidebar', () => {
    let sidebar = component.sideBarOpen;
    component.sideBarToggler();
    expect(component.sideBarOpen).toEqual(!sidebar);
  });

  it('should have a form-control element with id firstName', () => {
    const el = fixture.debugElement.query(By.css('#firstName'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id lastName', () => {
    const el = fixture.debugElement.query(By.css('#lastName'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id email', () => {
    const el = fixture.debugElement.query(By.css('#email'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id password', () => {
    const el = fixture.debugElement.query(By.css('#password'));
    expect (el). toBeTruthy();
  });

  it('should have a form-control element with id name', () => {
    const el = fixture.debugElement.query(By.css('#name'));
    expect (el). toBeTruthy();
  });

  it('should bind the firstName to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#firstName'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = 'First';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#firstName')).nativeElement.value).toBe('First');
  });

  it('should bind the lastName to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#lastName'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = 'Last';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#lastName')).nativeElement.value).toBe('Last');
  });

  it('should bind the email to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#email'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = 'ola@gmail.com';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#email')).nativeElement.value).toBe('ola@gmail.com');
  });

  it('should bind the password to the value assigned', () => {
    let input = fixture.debugElement.query(By.css('#password'));
    let el = input.nativeElement;

    expect(el.value).toBe('');

    el.value = 'ola123';
    el.dispatchEvent(new Event('input'));

    expect(fixture.debugElement.query(By.css('#password')).nativeElement.value).toBe('ola123');
  });

  it('should render correct number of plate options', () => {
    const roleList = [
      {
        name: 'logistic manager',
        id: '1'
      },
      {
        name: 'shipping manager',
        id: '2'
      },
      {
        name: 'warehouse manager',
        id: '3'
      }
    ];
    
    // Act
    component.roles = roleList;
    fixture.detectChanges();
    
    const optionEl = fixture.debugElement .queryAll(By.css('#option'));
    expect (optionEl.length) .toEqual(roleList.length);
    
  });

  it('should display correct text on the dropdown options', () => {
    const roleList = [
      {
        name: 'logistic manager',
        id: '1'
      },
      {
        name: 'shipping manager',
        id: '2'
      },
      {
        name: 'warehouse manager',
        id: '3'
      }
    ];
    
    // Act
    component.roles = roleList;
    fixture.detectChanges();
    
    const optionEls = fixture.debugElement .queryAll(By.css('#option'));
    optionEls.forEach((el, index) => {
      if (index !== 0) {
        expect((el.nativeElement as HTMLOptionElement) .innerText).toEqual(roleList[index]['name']);
      }
    });
    
  });
});
