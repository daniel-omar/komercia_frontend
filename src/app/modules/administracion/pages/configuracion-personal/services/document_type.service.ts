import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ResponseData } from '@shared/interfaces/response-data.interface';
import { DocumentType } from '../interfaces/document-type.interface';

@Injectable()
export class DocumentTypeService {

  private readonly baseUrl: string = environment.apiBaseUrl;
  private _http = inject(HttpClient);

  getAll(): Observable<DocumentType[]> {
    const url = `/users/document_type/get_all`;
    return this._http.get<ResponseData<DocumentType[]>>(url)
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
