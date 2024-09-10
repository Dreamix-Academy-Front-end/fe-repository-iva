import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-post-form.component.html',
  styleUrl: './create-post-form.component.scss'
})
export class CreatePostFormComponent {
  public createPostForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.createPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      body: ['', [Validators.required]],
    })
  }

  public onSubmit() {
    if (this.createPostForm.valid) {
      const postData = this.createPostForm.value;
      this.dataService.createPost(postData).subscribe({
        next: (response) => {
          console.log('Post created successfully:', response);
          this.router.navigate(['/posts']);
        },
        error: (error) => {
          console.error('Error creating post:', error);
        }
      });
    }
  }
}


