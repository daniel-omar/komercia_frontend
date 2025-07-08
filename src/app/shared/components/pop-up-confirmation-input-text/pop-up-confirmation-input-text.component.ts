import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IDataDialogConfirmInput } from '@shared/interfaces';

@Component({
  selector: 'app-pop-up-confirmation-input-text',
  templateUrl: './pop-up-confirmation-input-text.component.html',
  styleUrls: ['./pop-up-confirmation-input-text.component.scss']
})
export class PopUpConfirmationInputTextComponent implements OnInit {

  public formTemplate: FormGroup;


  get form(): { [key: string]: AbstractControl } {
    return this.formTemplate.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDataDialogConfirmInput,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.initForm();

  }

  private initForm(): void {
    const descriptionValue = this.data.description || ''; 
    this.formTemplate = this.formBuilder.group({ description: [descriptionValue, [Validators.required]]});
  }

}
