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
import { Router } from '@angular/router';

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
    MatSelectModule
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
  private readonly router = inject(Router)


  ngOnInit() {
    console.log("filtro")
    this.initFormElements();
    this.initFormFilters();

  }

  private initFormFilters(): void {
    this.formProduct = this.formBuilder.group({
      nombre_producto: ['', [Validators.required]],
      descripcion_producto: ['', [Validators.required]],
      precio_compra: [0, [Validators.required, Validators.min(1)]],
      precio_venta: [0, [Validators.required, Validators.min(1)]],
      id_categoria_producto: [0, [Validators.required, Validators.min(1)]]
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


  async submit() {
    if (!this.formProduct.valid) return;

    const { nombre_producto, descripcion_producto, precio_compra, precio_venta, id_categoria_producto } = this.formProduct.value;

    await lastValueFrom(this._productService.create({ nombre_producto, descripcion_producto, precio_compra, precio_venta, id_categoria_producto }));

    this._modalService.openDialog({ data: 'Se guardo el producto' }, (resultDlg) => {
      this.router.navigate(["productos/listado-productos"]);
    });

  }

}
