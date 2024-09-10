import { Routes } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CreatePostFormComponent } from './features/components/create-post-form/create-post-form.component';
import { EditPostFormComponent } from './features/components/edit-post-form/edit-post-form.component';
import { DeleteConfirmationComponent } from './features/components/delete-confirmation/delete-confirmation.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/posts', pathMatch: 'full'},
    {path: 'posts', component: DataTableComponent},
    {path: 'create', component: CreatePostFormComponent, canActivate: [authGuard]},
    {path: 'edit', component: EditPostFormComponent, canActivate: [authGuard]},
    {path: 'delete', component: DeleteConfirmationComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent}
];
