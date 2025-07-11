import { Routes } from '@angular/router';

import { LayoutComponent } from '@core/layout/layout.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { TipoUsuarioComponent } from './modules/administracion/pages/configuracion-personal/pages/tipo-usuario/tipo-usuario.component';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { AuthInterceptor, AuthInterceptorProvider } from '@auth/interceptors/auth.interceptor';

import { isAuthenticatedGuard } from '@core/guards/is-authenticated.guard';
import { AuthService } from '@auth/services/auth.service';
import { ListadoProductosComponent } from './modules/productos/pages/listado-productos/listado-productos.component';
import { ProductsInterceptor } from './modules/productos/interceptors/products.interceptor';
import { FormularioProductoComponent } from './modules/productos/pages/formulario-producto/formulario-producto.component';
import { CargaProductosComponent } from './modules/productos/pages/carga-productos/carga-productos.component';
import { ListadoVentasComponent } from './modules/ventas/pages/listado-ventas/listado-ventas.component';
import { NuevaVentaComponent } from './modules/ventas/pages/nueva-venta/nueva-venta.component';
import { DetalleVentaComponent } from './modules/ventas/pages/detalle-venta/detalle-venta.component';
import { SalesInterceptor } from './modules/ventas/interceptors/sales.interceptor';
import { AdministrationInterceptor } from './modules/administracion/interceptors/administracion.interceptor';
import { ListadoCategoriasComponent } from './modules/administracion/pages/configuracion-productos/pages/categorias/components/listado-categorias/listado-categorias.component';
import { ProductCategoryService } from './modules/administracion/pages/configuracion-productos/services/product_category.service';
import { UsuariosComponent } from './modules/administracion/pages/configuracion-personal/pages/usuarios/usuarios.component';
import { ListadoUsuariosComponent } from './modules/administracion/pages/configuracion-personal/pages/usuarios/components/listado-usuarios/listado-usuarios.component';
import { FormularioPersonalComponent } from './modules/administracion/pages/configuracion-personal/pages/usuarios/components/formulario-personal/formulario-personal.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        // canMatch: [isAuthenticatedGuard],
        children: [
            { path: '', pathMatch: 'full', canMatch: [isAuthenticatedGuard], loadComponent: () => import('@home/home.component').then(m => m.HomeComponent) },
        ]
    },
    {
        path: 'auth',
        data: { preload: true },
        providers: [
            // provideHttpClient(withInterceptorsFromDi()),
            // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
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
        data: { breadcrumb: 'Administración' },
        canMatch: [isAuthenticatedGuard],
        component: LayoutComponent,
        // providers: [
        //     provideHttpClient(withInterceptorsFromDi()),
        //     { provide: HTTP_INTERCEPTORS, useClass: AdministrationInterceptor, multi: true }
        // ],
        children: [
            {
                path: 'configuracion-personal', title: 'Configuración personal', data: { breadcrumb: 'configuración productos' }, children: [
                    { path: 'tipo-usuario', title: 'Tipo Usuario', data: { breadcrumb: 'Tipo usuario' }, component: TipoUsuarioComponent },
                    { path: 'usuarios', title: 'Usuarios', data: { breadcrumb: 'Usuarios' }, component: ListadoUsuariosComponent },
                    { path: 'formulario-usuario', title: 'Usuario', data: { breadcrumb: 'Usuario' }, component: FormularioPersonalComponent },
                ]
            },
            {
                path: 'configuracion-productos', title: 'Configuración productos', data: { breadcrumb: 'configuración productos' },
                children: [
                    { path: 'categorias', title: 'Categorias', data: { breadcrumb: 'Categorias' }, component: ListadoCategoriasComponent },
                ]
            },
            // { path: '**', redirectTo: 'auth' }
        ]
    },
    {
        path: 'productos',
        data: { breadcrumb: 'Productos' },
        canMatch: [isAuthenticatedGuard],
        component: LayoutComponent,
        // providers: [
        //     provideHttpClient(withInterceptorsFromDi()),
        //     { provide: HTTP_INTERCEPTORS, useClass: ProductsInterceptor, multi: true },
        // ],
        children: [
            { path: 'listado-productos', data: { breadcrumb: 'Listado Productos' }, title: 'Productos', component: ListadoProductosComponent },
            { path: 'nuevo-producto', data: { breadcrumb: 'Nuevo Producto' }, title: 'Productos', component: FormularioProductoComponent },
            { path: 'edicion-producto/:id', data: { breadcrumb: 'Edicion Producto' }, title: 'Productos', component: FormularioProductoComponent },
            { path: 'carga-productos', data: { breadcrumb: 'Carga Productos' }, title: 'Productos', component: CargaProductosComponent },
            // { path: '**', redirectTo: 'auth' }
        ]
    },
    {
        path: 'ventas',
        data: { breadcrumb: 'Ventas' },
        canMatch: [isAuthenticatedGuard],
        component: LayoutComponent,
        // providers: [
        //     provideHttpClient(withInterceptorsFromDi()),
        //     { provide: HTTP_INTERCEPTORS, useClass: SalesInterceptor, multi: true },
        // ],
        children: [
            { path: 'listado-ventas', data: { breadcrumb: 'Listado Ventas' }, title: 'Ventas', component: ListadoVentasComponent },
            { path: 'nueva-venta', data: { breadcrumb: 'Nueva Venta' }, title: 'Ventas', component: NuevaVentaComponent },
            { path: 'detalle-venta/:id', data: { breadcrumb: 'Detalle Venta' }, title: 'Ventas', component: DetalleVentaComponent },
            // { path: '**', redirectTo: 'auth' }
        ]
    },
    { path: '**', redirectTo: 'auth' },

];
