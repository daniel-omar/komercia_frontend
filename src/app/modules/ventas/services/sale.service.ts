import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ResponseData } from '@shared/interfaces/response-data.interface';
import { Sale } from '../interfaces/sale.interface';
import { SaleDetail } from '../interfaces/sale-detail.interface';

@Injectable()
export class SaleService {

  private readonly baseUrl: string = environment.apiBaseUrl;
  private _http = inject(HttpClient);

  getById(idVenta: number): Observable<Sale> {
    const url = `/sales/sale/find?id_venta=${idVenta}`;
    return this._http.get<ResponseData<Sale>>(url)
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

  getDetailsById(idVenta: number): Observable<SaleDetail[]> {

    const url = `/sales/sale/get_details/${idVenta}`;
    return this._http.get<ResponseData<SaleDetail[]>>(url)
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
