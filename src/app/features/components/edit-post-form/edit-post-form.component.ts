import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-edit-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-post-form.component.html',
  styleUrl: './edit-post-form.component.scss'
})
export class EditPostFormComponent {
  @Input() selectedPost!: Post;
  @Output() postUpdated = new EventEmitter<Post>();
  @Output() cancelEdit = new EventEmitter<void>();
  editPostForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editPostForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.selectedPost) {
      this.editPostForm.patchValue({
        title: this.selectedPost.title,
        body: this.selectedPost.body
      });
    }
  }

  onSubmit() {
    if (this.editPostForm.valid) {
      this.postUpdated.emit({
        ...this.selectedPost,
        ...this.editPostForm.value
      });
    }
  }

  cancel() {
    this.cancelEdit.emit();
  }
}
