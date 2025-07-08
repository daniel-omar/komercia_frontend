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
import { CargaResponse, Carga } from '@shared/interfaces/carga.interface';

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

  createProductsBulk(file: File): Observable<Carga | null> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const endpoint = `/products/product/save_bulk`;
    return this._http.post<ResponseData<CargaResponse>>(endpoint, formData)
      .pipe(
        map(({ data }) => {
          return data.carga;
        }),
        catchError((error) => {
          console.log(error)
          return of(null);
        })
      )
  }

  downloadTemplateObraCarga(): Observable<Blob> {
    const endpoint = `/products/product/download_template_products`;
    return this._http.get(endpoint, { responseType: 'blob' });
  }

  getCarga(idCarga: number): Observable<CargaResponse> {
    const url = `/products/product/get_carga?id_carga=${idCarga}`;
    return this._http.get<ResponseData<CargaResponse>>(url)
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
