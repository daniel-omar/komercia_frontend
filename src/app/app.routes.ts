import { Routes } from '@angular/router';

import { LayoutComponent } from '@core/layout/layout.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { TipoUsuarioComponent } from './modules/administracion/datosGenerales/tipo-usuario/tipo-usuario.component';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { AuthInterceptor, AuthInterceptorProvider } from '@auth/interceptors/auth.interceptor';

import { isAuthenticatedGuard } from '@core/guards/is-authenticated.guard';
import { AuthService } from '@auth/services/auth.service';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', pathMatch: 'full', loadComponent: () => import('@home/home.component').then(m => m.HomeComponent) },
        ]
    },
    {
        path: 'auth',
        providers: [
            provideHttpClient(withInterceptorsFromDi()),
            { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
            AuthService
        ],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', title: 'Login', loadComponent: () => import('@auth/login/login.component').then(m => m.LoginComponent) },
            { path: '**', redirectTo: 'login' }
        ],

    },
    {
        path: 'administracion',
        canMatch: [isAuthenticatedGuard],
        component: LayoutComponent,
        children: [
            {
                path: 'datos-generales', title: 'Datos generales', children: [
                    { path: 'tipo-usuario', title: 'Tipo Usuario', component: TipoUsuarioComponent },
                ]
            },
            // { path: '**', redirectTo: 'auth' }
        ]
    },
    { path: '**', redirectTo: 'auth' },

];
