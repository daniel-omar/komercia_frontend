import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

import { RequestStatus } from '@shared/enums';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private enumRequestStatus: typeof RequestStatus = RequestStatus;

  constructor(private _logger: NGXLogger) { }

  public debug(message: string | string[]): void {
    this._logger.debug(message);
  }

  public info(message: string | string[]): void {
    this._logger.info(message);
  }

  public warn(message: string | string[]): void {
    this._logger.warn(message);
  }

  public error(message: string | string[]): void {
    this._logger.error(message);
  }

  public logByStatus(status: number, message: string | string[]): void {

    const { GENERAL_ERROR, LOGIC_ERROR } = this.enumRequestStatus;

    if (status === LOGIC_ERROR) this.warn(message);

    if (status === GENERAL_ERROR) this.error(message);

  }

}