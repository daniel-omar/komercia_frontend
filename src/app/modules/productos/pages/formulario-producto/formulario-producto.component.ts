import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductCategoryService } from '../../services/product_category.service';
import { ProductCategory } from '../../interfaces/product-category.interface';
import { lastValueFrom } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../services/product.service';
import { ModalService } from '@shared/services/modal.service';
import { Router, RouterModule } from '@angular/router';
import { ValidatorsService } from '@shared/services/validators.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-formulario-producto',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    RouterModule
  ],
  providers: [
    ProductCategoryService,
    ProductService
  ],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.scss'
})
export class FormularioProductoComponent {
  private formBuilder = inject(FormBuilder);
  public formProduct!: FormGroup;

  public categorysProduct: ProductCategory[] = [];

  private _productCategoryService = inject(ProductCategoryService);
  private _productService = inject(ProductService);
  private _modalService = inject(ModalService);
  private _validatorsService = inject(ValidatorsService);
  private readonly router = inject(Router)
  private readonly activatedRoute = inject(ActivatedRoute)
  private idProduct?: number;
  public editMode: boolean = false;
  private product!: Product;

  ngOnInit() {
    console.log("filtro")
    this.initFormElements();
    this.initFormFilters();

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.idProduct = +id;
        this.editMode = true;
        this.getById(this.idProduct); // 👉 lógica para obtener datos
      } else {
        this.editMode = false;
      }
    });

  }

  private initFormFilters(): void {
    this.formProduct = this.formBuilder.group({
      nombre_producto: ['', [Validators.required, Validators.minLength(4)]],
      descripcion_producto: [''],
      precio_compra: [0, [Validators.required, Validators.min(1)]],
      precio_venta: [0, [Validators.required, Validators.min(1)]],
      id_categoria_producto: [0, [Validators.required, Validators.min(1)]]
    }, {
      validators: [
        this._validatorsService.isFieldOneGreaterFieldTwo('precio_compra', 'precio_venta')
      ]
    })
  }

  async initFormElements() {
    await Promise.all([
      this.getCategorysProduct(),
    ])
  }

  async getCategorysProduct() {
    this.categorysProduct = await lastValueFrom(this._productCategoryService.getAll());
    // console.log(this.categorias_producto);
  }

  async getById(idProducto: number) {
    this.product = await lastValueFrom(this._productService.getById(idProducto));
    this.formProduct.patchValue(this.product);
  }


  async submit() {
    if (!this.formProduct.valid) return;

    const { nombre_producto, descripcion_producto, precio_compra, precio_venta, id_categoria_producto } = this.formProduct.value;

    const result = await lastValueFrom(this._productService.create({ nombre_producto: nombre_producto.trim(), descripcion_producto: descripcion_producto.trim(), precio_compra, precio_venta, id_categoria_producto }));

    if (!result) return;

    this._modalService.openDialog({ data: 'Se guardo el producto' }, (resultDlg) => {
      this.router.navigate(["productos/listado-productos"]);
    });

  }

  isInvalidField(field: string) {
    return this._validatorsService.isInvalidField(this.formProduct, field);
  }

  getFieldError(field: string) {
    return this._validatorsService.getFieldError(this.formProduct, field);
  }

  goListProducts() {
    this.router.navigate(["productos/listado-productos"]);
  }
}
