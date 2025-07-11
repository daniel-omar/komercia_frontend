import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { AdministrationInterceptor } from 'src/app/modules/administracion/interceptors/administracion.interceptor';
import { ProductCategoryService } from 'src/app/modules/administracion/pages/configuracion-productos/services/product_category.service';
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
    ValidatorsService,

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
    @Inject(MAT_DIALOG_DATA) public data: ProductCategory | null
  ) {
    if (data) {
      this.idProductCategory = data.id_categoria_producto;
      this.productCategory = data;
      this.editMode = true;
    }
  }

  ngOnInit(): void {
    this.initForm();
    if (this.editMode) {
      this.formCategory.patchValue(this.productCategory);
      // this.get();
    }
  }

  private initForm(): void {
    this.formCategory = this.formBuilder.group({
      nombre_categoria: ["", [Validators.required]],
      descripcion_categoria: [""]
    })
  }

  async get() {
    const productCategory = await lastValueFrom(this._productCategoryService.getById(this.idProductCategory!));
  }

  async submit() {
    if (!this.formCategory.valid) return;

    const { nombre_categoria, descripcion_categoria } = this.formCategory.value;

    const body = {
      nombre_categoria,
      descripcion_categoria
    }

    let result: boolean = false;
    console.log(body)
    if (this.editMode) result = await lastValueFrom(this._productCategoryService.update({ id_categoria_producto: this.idProductCategory, ...body }));
    else result = await lastValueFrom(this._productCategoryService.create(body));

    // const result = true;
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
