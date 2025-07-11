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
import { ProductActive } from '../interfaces/product-active.interface';

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

  getById(idProducto: number): Observable<Product> {

    const url = `/products/product/find?id_producto=${idProducto}`;
    return this._http.get<ResponseData<Product>>(url)
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

  update(body: ProductForm): Observable<boolean> {

    const url = `/products/product/update`;
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

  updateActive(body: ProductActive): Observable<boolean> {

    const url = `/products/product/update_active`;
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
