import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: any;
  let isLoggedInSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    isLoggedInSubject = new BehaviorSubject<boolean>(false);

    authService = jasmine.createSpyObj('AuthService', ['logout']);
    Object.defineProperty(authService, 'isLoggedIn$', {value: isLoggedInSubject.asObservable()});

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to isLoggedIn$ and set isLoggedIn accordingly', () => {
    isLoggedInSubject.next(true);
    fixture.detectChanges();

    expect(component.isLoggedIn).toBeTrue();
  });

  it('should call logout on AuthService when logout is called', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
