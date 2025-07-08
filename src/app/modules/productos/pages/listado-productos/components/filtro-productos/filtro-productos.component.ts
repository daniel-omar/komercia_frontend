import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatOption, MatSelect, MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { debounceTime, lastValueFrom, Subject, Subscription } from 'rxjs';
import { ProductCategory } from 'src/app/modules/productos/interfaces/product-category.interface';
import { DebouncerSelect } from '@shared/interfaces/debouncer-select.interface';

import { ProductCategoryService } from 'src/app/modules/productos/services/product_category.service';
import { ProductsFilter } from 'src/app/modules/productos/interfaces/products-filter.interface';

@Component({
  selector: 'listado-filtro-productos',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    ProductCategoryService
  ],
  templateUrl: './filtro-productos.component.html',
  styleUrl: './filtro-productos.component.scss'
})
export class FiltroProductosComponent {
  private formBuilder = inject(FormBuilder);
  public formSearch!: FormGroup;
  public categorysProduct: ProductCategory[] = [];
  @ViewChildren('select') selects!: QueryList<MatSelect>;
  @ViewChildren('allSelectOption') allSelectOption!: QueryList<MatOption>;
  private debouncerSelect: Subject<DebouncerSelect> = new Subject<DebouncerSelect>()
  private debouncerSelectSuscription?: Subscription;

  private _productCategoryService = inject(ProductCategoryService);

  @Output("search")
  public search: EventEmitter<ProductsFilter> = new EventEmitter()

  ngOnInit() {
    console.log("filtro")
    this.initFormElements();
    this.initFormFilters();

  }

  private initFormFilters(): void {
    this.formSearch = this.formBuilder.group({
      nombre: [''],
      ids_categoria_producto: [[]]
    })
  }

  async initFormElements() {
    await Promise.all([
      this.getCategorysProduct(),
    ])
  }

  submit() {
    if (!this.formSearch.valid) return;

    const { nombre, ids_categoria_producto } = this.formSearch.value;

    this.onSearch({ nombre_producto: nombre, ids_categoria: ids_categoria_producto, es_activo: true });
  }

  private onSearch(params: ProductsFilter): void {
    this.search.emit(params);
  }

  async getCategorysProduct() {
    this.categorysProduct = await lastValueFrom(this._productCategoryService.getAll());
    // console.log(this.categorias_producto);
  }

  onSelectCategoryProduct(): void {
    const ids_categoria = this.formSearch.get('ids_categoria')?.value;
    let debouncerSelect: DebouncerSelect = {
      nombre: "categoria",
      valoresNumber: ids_categoria
    }
    this.debouncerSelect.next(debouncerSelect);
  }

  performSelectCategoryProduct(ids_categoria: number[]): void {
  }


  toggleAllSelection(element: string) {
    let select = this.selects.toArray().filter(x => x.ngControl.name == element)[0];
    let values: number[] = select.value;

    if (values.indexOf(0) > -1) select.options.forEach((item: MatOption) => item.select());
    else select.options.forEach((item: MatOption) => item.deselect());
  }

  optionClick(element: string) {
    let newStatus = true;
    let select = this.selects.toArray().filter(x => x.ngControl.name == element)[0];
    console.log(select)
    select.options.forEach((item: MatOption) => {
      if (!item.selected && item.value != 0) {
        newStatus = false;
      }
    });

    if (newStatus) select.options.first.select()
    else select.options.first.deselect()

  }
}
