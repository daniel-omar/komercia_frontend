import { Component, inject } from '@angular/core';
import { FiltroProductosComponent } from "./components/filtro-productos/filtro-productos.component";
import { TablaProductosComponent } from "./components/tabla-productos/tabla-productos.component";
import { ProductsService } from '../../services/products.service';
import { Paginator } from '@shared/classes/paginator.class';
import { ProductsFilter } from '../../interfaces/products-filter.interface';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../../interfaces/products-response.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-productos',
  imports: [
    CommonModule,
    FiltroProductosComponent,
    TablaProductosComponent,

    MatIconModule,
    MatButtonModule
  ],
  providers: [ProductsService],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.scss'
})
export class ListadoProductosComponent {
  private _productsService = inject(ProductsService);
  public productsFilter!: ProductsFilter;
  public productsResponseObservable$!: Observable<ProductsResponse>;

  public paginador: Paginator = new Paginator({ per_page: 5, new_page: 1, total: 0, current_page: 0, pages: 0 });

  private readonly router = inject(Router);

  ngOnInit() {
  }

  searchByFilters(filter: ProductsFilter) {
    this.productsFilter = filter;
    this.productsResponseObservable$ = this._productsService.getByFilters(this.productsFilter, this.paginador)
  }

  searchByPaginator(paginator: Paginator) {
    this.paginador = paginator;
    this.productsResponseObservable$ = this._productsService.getByFilters(this.productsFilter, this.paginador);
  }

  goCreateProduct() {
    this.router.navigate(["productos/nuevo-producto"]);
  }
}
