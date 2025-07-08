import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { take } from 'rxjs';
import { map } from 'rxjs/operators';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

// import { PopUpResultComponent } from '@shared/components/pop-up-result/pop-up-result.component';
// import { PopUpConfirmationComponent } from '@shared/components/pop-up-confirmation/pop-up-confirmation.component';
// import { PopUpConfirmationInputComponent } from '@shared/components/pop-up-confirmation-input/pop-up-confirmation-input.component';
// import { PopUpConfirmationInputTextComponent } from '@shared/components/pop-up-confirmation-input-text/pop-up-confirmation-input-text.component';
// import { PopUpHandleManyErrorsComponent } from '@shared/components/pop-up-handle-many-errors/pop-up-handle-many-errors.component';

import { createDialogConfig, defaultDialogConfig, defaultDialogConfirmConfig, defaultDialogConfirmInputConfig, defaultDialogManyErrorsConfig, IDialogConfigConfirm, IDialogConfigConfirmInput, IDialogDefaultConfig } from '@shared/interfaces/dialog.interface';

@Injectable({ providedIn: 'root' })
export class ModalService {

  constructor(
    private dialog: MatDialog) {
  }

  public openDialog(dialogConfig: IDialogDefaultConfig, callback?: (result: boolean) => void): void {

    const config = createDialogConfig(defaultDialogConfig, dialogConfig);
    //this.openDialogGeneric(PopUpResultComponent, config, callback);

  }

  public openDialogConfirmation(dialogConfig: IDialogConfigConfirm, callback: (result: boolean) => void): void {

    const config = createDialogConfig(defaultDialogConfirmConfig, dialogConfig);
    //this.openDialogGeneric(PopUpConfirmationComponent, config, callback);

  }

  public openDialogConfirmationInput(dialogConfig: IDialogConfigConfirmInput, callback: (result: boolean) => void): void {

    const config = createDialogConfig(defaultDialogConfirmInputConfig, dialogConfig);
    //this.openDialogGeneric(PopUpConfirmationInputComponent, config, callback);

  }

  public openDialogHandleManyErrors(message: string[]): void {

    // this.dialog.open(PopUpHandleManyErrorsComponent, {
    //   ...defaultDialogManyErrorsConfig,
    //   data: message
    // });
  }

  private openDialogGeneric<T>(component: ComponentType<T>, config: MatDialogConfig, callback?: (state: boolean) => void): void {

    const dialogRef = this.dialog.open(component, config);

    if (callback)
      dialogRef.afterClosed().pipe(take(1), map((state) => callback(state))).subscribe();

  }

  public openDialogConfirmationInputText(dialogConfig: any, callback: (result: boolean) => void): void {

    const config = createDialogConfig(defaultDialogConfirmInputConfig, dialogConfig);
    //this.openDialogGeneric(PopUpConfirmationInputTextComponent, config, callback);

  }


}