import { Component, OnInit, Inject } from '@angular/core'
  ;
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IDataDialogConfirm } from '@shared/interfaces';
import { Icons } from '@shared/enums';

@Component({
  selector: 'app-pop-up-confirmation',
  templateUrl: './pop-up-confirmation.component.html',
  styleUrls: ['./pop-up-confirmation.component.scss']
})

export class PopUpConfirmationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDataDialogConfirm) { }

  ngOnInit() {

    this.getIcon(Icons);

  }

  private getIcon(icons: any): void {

    const icon = this.data.icon;

    if (icon) 
    this.data.icon = `/assets/img/${icons[icon]}.svg`;
    
  }


}
