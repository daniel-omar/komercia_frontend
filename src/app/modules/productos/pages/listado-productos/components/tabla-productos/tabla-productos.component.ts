import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

import { Pagination } from '@shared/interfaces/pagination.interface';
import { TableColumnDefinition } from '@shared/interfaces/table-column-definition.interface';
import { TableProperties } from '@shared/interfaces/table-properties.interface';
import { Product } from 'src/app/modules/productos/interfaces/product.interface';
import { ProductsResponse } from 'src/app/modules/productos/interfaces/products-response.interface';

import { Paginator } from '@shared/classes/paginator.class';

import { TABLE_PRODUCTOS_DISPLAYEDCOLUMNS } from 'src/app/modules/productos/constants/tabla-productos.constant';

import { ProductsService } from 'src/app/modules/productos/services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'listado-tabla-productos',
  imports: [
    CommonModule,

    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule

  ],
  templateUrl: './tabla-productos.component.html',
  styleUrl: './tabla-productos.component.scss'
})
export class TablaProductosComponent {

  public displayedColumns: string[] = TABLE_PRODUCTOS_DISPLAYEDCOLUMNS;
  public columnsDefinition: TableColumnDefinition[] = [];
  public dataSource!: MatTableDataSource<Product>;
  public paginador: Paginator = new Paginator();

  @Input() tableProperties!: TableProperties;
  @Input() set productosResponse(productsResponse: ProductsResponse) {
    // this._loader.hide()
    // console.log("productsResponse", productsResponse)
    this.setColumnsDefinition();
    this.initTableObra(productsResponse);
  }

  @Output("changePage")
  public changePage: EventEmitter<Paginator> = new EventEmitter()

  ngOnInit() {
  }

  setColumnsDefinition(): void {
    this.displayedColumns.forEach((column) => {
      let show: boolean = true;
      if (["cemento"].indexOf(column.toLowerCase()) >= 0) show = false;

      this.columnsDefinition.push({
        id: column,
        description: column,
        show: show
      })
    })
  }

  private initTableObra(productsResponse: ProductsResponse) {
    this.dataSource = new MatTableDataSource(productsResponse?.productos);
    this.setUpPaginador(productsResponse?.paginacion);
  }

  private setUpPaginador(pagination: any): void {
    this.paginador = this.paginador.onSetUpPaginador(pagination);
  }

  public onChangePage(event: PageEvent): void {
    this.paginador = this.paginador.onChangePage(event);
    this.changePage.emit(this.paginador)
  }

  getDisplayedColumns(): string[] {
    return this.columnsDefinition.filter((item) => item.show).map(x => x.id);
  }

  public onHideDisplayedPaginator(paginador: Paginator): boolean {
    return this.paginador.onHideDisplayedPaginator(paginador);
  }

}
