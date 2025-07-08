import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductCategory } from '../interfaces/product-category.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ResponseData } from '@shared/interfaces/response-data.interface';

@Injectable()
export class ProductCategoryService {

  private readonly baseUrl: string = environment.apiBaseUrl;
  private _http = inject(HttpClient);

  getAll(): Observable<ProductCategory[]> {
    const url = `/products/product_category/get_all`;
    return this._http.get<ResponseData<ProductCategory[]>>(url)
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
