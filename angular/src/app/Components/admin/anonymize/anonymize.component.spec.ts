import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AnonymizeComponent } from './anonymize.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AnonymizeComponent', () => {
  let component: AnonymizeComponent;
  let fixture: ComponentFixture<AnonymizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ],
      declarations: [ AnonymizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonymizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
