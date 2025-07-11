import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductCategory } from '../../configuracion-productos/interfaces/product-category.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ResponseData } from '@shared/interfaces/response-data.interface';
import { ProductCategoryForm } from '../../configuracion-productos/pages/categorias/interfaces/product-category-form.interface';
import { Pagination } from '@shared/interfaces/pagination.interface';
import { UsersFilter } from '../interfaces/users-filter.interface';
import { UsersResponse } from '../interfaces/users-response.interface';
import { User } from '../interfaces/user.interface';
import { UserForm } from '../pages/usuarios/interfaces/user-form.interface';
import { UserActive } from '../pages/usuarios/interfaces/user-active.interface';

@Injectable()
export class UserService {

  private readonly baseUrl: string = environment.apiBaseUrl;
  private _http = inject(HttpClient);

  getByFilters(filter: UsersFilter, pagination: Pagination): Observable<UsersResponse> {
    delete pagination.total;
    delete pagination.pages;

    const url = `/users/user/get_by_filter_with_pagination`;
    return this._http.post<ResponseData<UsersResponse>>(url, { filter, pagination })
      .pipe(
        map(({ data }) => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return throwError(() => error.error.message)
        })
      );
  }


  getById(idUsuario: number): Observable<User> {

    const url = `/users/user/get_by_id/${idUsuario}`;
    return this._http.get<ResponseData<User>>(url)
      .pipe(
        map(({ data }) => {
          console.log(data)
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return throwError(() => error.error.message)
        })
      );
  }

  create(body: UserForm): Observable<boolean> {

    const url = `/users/user/create`;
    return this._http.post<ResponseData<boolean>>(url, body)
      .pipe(
        map(({ data }) => {
          console.log(data)
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return throwError(() => error.error.message)
        })
      );
  }

  update(body: UserForm): Observable<boolean> {

    const url = `/users/user/update`;
    return this._http.put<ResponseData<boolean>>(url, body)
      .pipe(
        map(({ data }) => {
          console.log(data)
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return throwError(() => error.error.message)
        })
      );
  }

  updateActive(body: UserActive): Observable<boolean> {
    const url = `/users/user/update_active`;
    return this._http.put<ResponseData<boolean>>(url, body)
      .pipe(
        map(({ data }) => {
          console.log(data)
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return throwError(() => error.error.message)
        })
      );
  }
}
