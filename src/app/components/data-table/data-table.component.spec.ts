import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, RouterModule } from '@angular/router';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let authService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const isLoggedInSubject = new BehaviorSubject<boolean>(false);

    dataService = jasmine.createSpyObj('DataService', ['getData', 'deletePost', 'updatePost']);
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn$', 'logout']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    // authServiceSpy.isLoggedIn$.and.returnValue(isLoggedInSubject.asObservable());
    // dataServiceSpy.getData.and.returnValue(of([]));
    // dataServiceSpy.deletePost.and.returnValue(of(null));
    // dataServiceSpy.updatePost.and.returnValue(of(null));


    await TestBed.configureTestingModule({
      imports: [
        DataTableComponent
      ],
      providers: [
        { provide: DataService, useValue: dataService },
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;

    dataService.getData.and.returnValue(of([]));
    authService.isLoggedIn$ = of(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
