import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Icons } from '@shared/enums';

@Component({
  selector: 'app-pop-up-handle-many-errors',
  templateUrl: './pop-up-handle-many-errors.component.html',
  styleUrls: ['./pop-up-handle-many-errors.component.scss']
})
export class PopUpHandleManyErrorsComponent {

  protected imgUrl: string = `/assets/img/${Icons.pop_up_handle_danger_error}.svg`;
  protected errorsMessages: string[] = inject(MAT_DIALOG_DATA);

}
