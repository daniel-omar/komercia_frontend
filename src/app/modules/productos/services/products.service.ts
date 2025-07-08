import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ResponseData } from '@shared/interfaces/response-data.interface';
import { Product } from '../interfaces/product.interface';
import { ProductsFilter } from '../interfaces/products-filter.interface';
import { CommonService } from '@shared/services/common.service';
import { ProductsResponse } from '../interfaces/products-response.interface';
import { Pagination } from '@shared/interfaces/pagination.interface';

@Injectable()
export class ProductsService {

  private _http = inject(HttpClient);

  getByFilters(filter: ProductsFilter, pagination: Pagination): Observable<ProductsResponse> {
    delete pagination.total;
    delete pagination.pages;

    const url = `/products/product/get_by_filter_with_pagination`;
    return this._http.post<ResponseData<ProductsResponse>>(url, { filter, pagination })
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
