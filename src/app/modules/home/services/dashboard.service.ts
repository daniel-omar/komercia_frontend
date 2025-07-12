import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ResponseData } from '@shared/interfaces/response-data.interface';
import { GraficSaleFilter } from '../interfaces/grafic-sale-filter.interface';
import { CommonService } from '@shared/services/common.service';
import { Pagination } from '@shared/interfaces/pagination.interface';
import { CargaResponse, Carga } from '@shared/interfaces/carga.interface';
import { GraficSale } from '@home/interfaces/grafic-sale.interface';
import { PeriodsResponse } from '@home/interfaces/periods-response.interface';
import { TotalResponse } from '@home/interfaces/total-response.interface';

@Injectable()
export class DashboardService {

    private _http = inject(HttpClient);

    getQueryParam(filter: any) {
        let paramsList: { key: string; value: string }[] = [];

        if (filter.anios != null) {
            paramsList.push({ key: 'anios', value: filter.anios.join(',') });
        }
        if (filter.meses != null) {
            paramsList.push({ key: 'meses', value: filter.meses.join(',') });
        }

        const queryString = paramsList
            .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
            .join('&');

        return queryString;
    }

    getFilters(): Observable<PeriodsResponse> {
        const url = `/general/period/get_to_filters_dashborad`;
        return this._http.get<ResponseData<PeriodsResponse>>(url)
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

    getMonthlySales(filter: GraficSaleFilter): Observable<GraficSale[]> {
        const queryParams = this.getQueryParam(filter);
        const url = `/sales/sale/get_monthly_sales?${queryParams}`;
        return this._http.get<ResponseData<GraficSale[]>>(url)
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

    getDailySales(filter: GraficSaleFilter): Observable<GraficSale[]> {
        const queryParams = this.getQueryParam(filter);
        const url = `/sales/sale/get_daily_sales?${queryParams}`;
        return this._http.get<ResponseData<GraficSale[]>>(url)
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

    getProductsSales(filter: GraficSaleFilter): Observable<GraficSale[]> {
        const queryParams = this.getQueryParam(filter);
        const url = `/sales/sale/get_products_sales?${queryParams}`;
        return this._http.get<ResponseData<GraficSale[]>>(url)
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

    getPaymentTypesSales(filter: GraficSaleFilter): Observable<GraficSale[]> {
        const queryParams = this.getQueryParam(filter);
        const url = `/sales/sale/get_payment_types_sales?${queryParams}`;
        return this._http.get<ResponseData<GraficSale[]>>(url)
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

    getUsersSales(filter: GraficSaleFilter): Observable<GraficSale[]> {
        const queryParams = this.getQueryParam(filter);
        const url = `/sales/sale/get_users_sales?${queryParams}`;
        return this._http.get<ResponseData<GraficSale[]>>(url)
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

    getTotalSales(filter: GraficSaleFilter): Observable<TotalResponse> {
        const queryParams = this.getQueryParam(filter);
        const url = `/sales/sale/get_total_sales?${queryParams}`;
        return this._http.get<ResponseData<TotalResponse>>(url)
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