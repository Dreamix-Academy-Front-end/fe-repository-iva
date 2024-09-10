import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { LoadingService } from '../../services/loading.service';
import { DataDetailsComponent } from '../data-details/data-details.component';
import { Post } from '../../models/post';
import { Router, RouterLink } from '@angular/router';
import { EditPostFormComponent } from "../../features/components/edit-post-form/edit-post-form.component";
import { DeleteConfirmationComponent } from '../../features/components/delete-confirmation/delete-confirmation.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CapitalizePipe,
    DataDetailsComponent,
    RouterLink,
    EditPostFormComponent,
    DeleteConfirmationComponent,
    ErrorModalComponent
],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit {
  public data: Post[] = [];
  public searchTerm: string = '';
  public isLoading = true;
  public showModal: boolean = false;
  public showEditForm: boolean = false;
  public showDeleteModal: boolean = false;
  public error: string | null = null;
  public selectedPost!: Post | null;

  public postsPerPage: number = 10;
  public currentPage: number = 1;

  public isLoggedIn$!: Observable<boolean>;

  constructor(public dataService: DataService, private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.dataService.getData().subscribe({
      next: (data) => {
        this.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load data. \n Please try again later.';
        this.isLoading = false;
      }
    });
  }

  public dismissError() {
    this.error = null;
  }

  public openPost(post: Post): void {
    this.selectedPost = post;
    this.showModal = true;
  }

  public closeModal(): void {
    this.showModal = false;
  }

  public openEditForm(post: Post): void {
    this.selectedPost = post;
    this.showEditForm = true;
  }

  public closeEditForm(): void {
    this.showEditForm = false;
    this.selectedPost = null;
  }

  public confirmDelete(post: Post): void {
    this.selectedPost = post;
    this.showDeleteModal = true;
  }

  public handleDelete(): void {
    if (this.selectedPost) {
      this.dataService.deletePost(this.selectedPost.id).subscribe({
        next: () => {
          this.data = this.data.filter((p) => p.id !== this.selectedPost!.id);
          this.showDeleteModal = false;
        },
        error: (err) => console.error('Error deleting post', err)
      })
    }
  }

  public closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedPost = null;
  }
  
  public filteredPosts() {
    if (!this.searchTerm) {
      return this.data;
    }

    return this.data.filter(post =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  public paginatedPosts() {
    const postsToPaginate = this.filteredPosts();

    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;

    return postsToPaginate.slice(startIndex, endIndex);
  }

  public totalPages(): number {
    return Math.ceil(this.filteredPosts().length / this.postsPerPage);
  }

  
  public totalPagesArray(): number[] {
    return Array(this.totalPages())
      .fill(0).map((_, i) => i + 1);
  }

  public goToPage(page: number) {
    this.currentPage = page;
  }

  public goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  public goToNextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  public updatePost(updatedPost: Post): void {
    if (this.selectedPost) {
      const index = this.data.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        this.data[index] = updatedPost;
      }

      this.dataService.updatePost(updatedPost).subscribe({
        next: () => {
          this.closeEditForm();
        },
        error: () => {
          this.error = 'Failed to update post.'
        }
      });
    }
  } 
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/posts']);
  }

}
