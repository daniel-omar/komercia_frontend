import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotifierComponent } from '@shared/components/notifier/notifier.component';
import { NotifierType } from '@shared/enums';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private readonly closeButton: string = 'X';

  constructor(private _snackBar: MatSnackBar) {
  }

  private showNotification(displayMessage: string[], buttonText: string, messageType: typeof NotifierType.SUCCESS | NotifierType.ERROR): void {
    this._snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType
      },
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: messageType
    })
  }

  public showSnackBar(message: string[], typeMessage: boolean = true): void {

    const { ERROR, SUCCESS } = NotifierType;

    const addClass: NotifierType = (typeMessage) ? SUCCESS : ERROR;

    this.showNotification(message, this.closeButton, addClass);

  }

}
