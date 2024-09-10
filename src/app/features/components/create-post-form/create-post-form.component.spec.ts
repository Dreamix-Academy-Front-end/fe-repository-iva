import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreatePostFormComponent } from './create-post-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('CreatePostFormComponent', () => {
  let component: CreatePostFormComponent;
  let fixture: ComponentFixture<CreatePostFormComponent>;
  let dataService: DataService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreatePostFormComponent, 
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [FormBuilder, DataService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePostFormComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values and validation', () => {
    expect(component.createPostForm).toBeDefined();
    expect(component.createPostForm.controls['title'].value).toBe('');
    expect(component.createPostForm.controls['body'].value).toBe('');
    expect(component.createPostForm.controls['title'].valid).toBeFalsy();
    expect(component.createPostForm.controls['body'].valid).toBeFalsy();
  });
});
