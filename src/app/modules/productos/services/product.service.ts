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
import { ProductForm } from '../interfaces/product-form.interface';

@Injectable()
export class ProductService {

  private _http = inject(HttpClient);

  create(body: ProductForm): Observable<boolean> {

    const url = `/products/product/save`;
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

}
