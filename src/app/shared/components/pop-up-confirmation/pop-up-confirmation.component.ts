import { Component, OnInit, Inject } from '@angular/core'
  ;
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { IDataDialogConfirm } from '@shared/interfaces/dialog.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pop-up-confirmation',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './pop-up-confirmation.component.html',
  styleUrls: ['./pop-up-confirmation.component.scss']
})

export class PopUpConfirmationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDataDialogConfirm) { }

  ngOnInit() {

  }

}
