import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss'
})
export class DeleteConfirmationComponent {
  @Input() selectedPost!: Post | null;
  @Input() showDeleteModal = false;
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();

  public onConfirm(): void {
    this.confirmDelete.emit();
  }

  public onCancel(): void {
    this.cancelDelete.emit();
  }
}
