import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ResponseData } from '@shared/interfaces/response-data.interface';
import { SalesFilter } from '../interfaces/sales-filter.interface';
import { Pagination } from '@shared/interfaces/pagination.interface';
import { SalesResponse } from '../interfaces/sales-response.interface';

@Injectable()
export class SalesService {

  private readonly baseUrl: string = environment.apiBaseUrl;
  private _http = inject(HttpClient);

  getByFilters(filter: SalesFilter, pagination: Pagination): Observable<SalesResponse> {
    delete pagination.total;
    delete pagination.pages;

    const url = `/sales/sale/get_by_filter_with_pagination`;
    return this._http.post<ResponseData<SalesResponse>>(url, { filter, pagination })
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

}
