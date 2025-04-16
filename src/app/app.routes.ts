import { Routes } from '@angular/router';
import { LayoutComponent } from '@core/layout/layout.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth/login'
    },
    {
        path: 'auth',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', title: 'Login', component: LoginComponent },
            // { path: '**', redirectTo: 'auth' }
        ]
    },
    { path: '**', redirectTo: 'auth' },

];
