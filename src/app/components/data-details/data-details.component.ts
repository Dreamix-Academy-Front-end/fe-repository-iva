import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';

@Component({
  selector: 'app-data-details',
  standalone: true,
  imports: [
    CapitalizePipe,
    CommonModule
  ],
  templateUrl: './data-details.component.html',
  styleUrl: './data-details.component.scss'
})
export class DataDetailsComponent {
  @Input() post!: Post | null;
  @Input() visible: boolean = false;

  @Output() onClose = new EventEmitter();

  public close(): void {
    this.visible = false;
    this.onClose.emit();
  }
}
