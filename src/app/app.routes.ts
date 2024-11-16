import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', component:LoginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UserListComponent}
];
