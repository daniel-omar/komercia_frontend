import { Component, inject } from '@angular/core';
import { UsersFilter } from '../../../../interfaces/users-filter.interface';
import { UsersResponse } from '../../../../interfaces/users-response.interface';
import { Observable } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { Paginator } from '@shared/classes/paginator.class';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FiltroUsuariosComponent } from './components/filtro-usuarios/filtro-usuarios.component';
import { TablaUsuariosComponent } from './components/tabla-usuarios/tabla-usuarios.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listado-usuarios',
  imports: [
    CommonModule,
    FiltroUsuariosComponent,
    TablaUsuariosComponent,

    MatIconModule,
    MatButtonModule
  ],
  providers: [
    UserService
  ],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.scss'
})
export class ListadoUsuariosComponent {
  private _userService = inject(UserService);
  public usersFilter!: UsersFilter;
  public usersResponseObservable$!: Observable<UsersResponse>;

  public paginador: Paginator = new Paginator({ per_page: 10, new_page: 1, total: 0, current_page: 0, pages: 0 });

  private readonly router = inject(Router);

  ngOnInit() {
  }

  searchByFilters(filter: UsersFilter) {
    this.usersFilter = filter;
    this.usersResponseObservable$ = this._userService.getByFilters(this.usersFilter, this.paginador)
  }

  searchByPaginator(paginator: Paginator) {
    this.paginador = paginator;
    this.usersResponseObservable$ = this._userService.getByFilters(this.usersFilter, this.paginador);
  }

  goCreate() {
    this.router.navigate(["administracion/configuracion-personal/formulario-usuario"]);
  }
}
