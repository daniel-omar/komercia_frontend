import { Component, inject } from '@angular/core';
import { TablaCategoriasComponent } from './components/tabla-categorias/tabla-categorias.component';
import { ProductCategoryService } from 'src/app/modules/administracion/services/product_category.service';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/modules/administracion/interfaces/product-category.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'listado-categorias-producto',
  imports: [
    CommonModule,
    TablaCategoriasComponent
  ],
  providers: [ProductCategoryService],
  templateUrl: './listado-categorias.component.html',
  styleUrl: './listado-categorias.component.scss'
})
export class ListadoCategoriasComponent {
  private _productCategoryService = inject(ProductCategoryService);
  public productCategorysObservable$!: Observable<ProductCategory[]>;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.productCategorysObservable$ = this._productCategoryService.getAll()
  }

}
