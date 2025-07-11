import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierType } from '@shared/enums';
import { RequestStatus } from '@shared/enums/request-status.enum';
import { ModalService } from '@shared/services/modal.service';
import { ValidatorsService } from '@shared/services/validators.service';
import { Observable, lastValueFrom, map, tap } from 'rxjs';
import { ProductCategoryService } from 'src/app/modules/administracion/services/product_category.service';
import { ProductCategory } from 'src/app/modules/productos/interfaces/product-category.interface';

@Component({
  selector: 'formulario-categoria-producto',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    ProductCategoryService,
    ModalService,
    ValidatorsService
  ],
  templateUrl: './formulario-categoria.component.html',
  styleUrls: ['./formulario-categoria.component.scss']
})
export class FormularioCategoriaComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  public formCategory!: FormGroup;
  public productCategory!: ProductCategory;

  private _productCategoryService = inject(ProductCategoryService);
  private _modalService = inject(ModalService);
  private _validatorsService = inject(ValidatorsService);

  public dialogRef = inject(MatDialogRef<FormularioCategoriaComponent>);

  private readonly router = inject(Router)
  private readonly activatedRoute = inject(ActivatedRoute)
  private idProductCategory?: number;
  public editMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productCategory = data;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formCategory = this.formBuilder.group({
      nombre_categoria: [this.productCategory.nombre_categoria, [Validators.required]],
      descripcion_categoria: [this.productCategory.descripcion_categoria]
    })
  }

  async submit() {
    const { nombre_categoria, descripcion_categoria } = this.formCategory.value;

    const body = {
      nombre_categoria,
      descripcion_categoria
    }

    // const result = await lastValueFrom(this._productCategoryService.create(body));
    const result = true;
    if (!result) return;

    this.dialogRef.close(NotifierType.SUCCESS);
    return result;
  }

  isInvalidField(field: string) {
    return this._validatorsService.isInvalidField(this.formCategory, field);
  }

  getFieldError(field: string) {
    return this._validatorsService.getFieldError(this.formCategory, field);
  }

  clear() {
    this.formCategory.reset();
  }
}
