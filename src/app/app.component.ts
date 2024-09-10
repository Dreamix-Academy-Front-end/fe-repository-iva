import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreatePostFormComponent } from "./features/components/create-post-form/create-post-form.component";
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DataTableComponent, NavbarComponent, CreatePostFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'public-api-project';


}
