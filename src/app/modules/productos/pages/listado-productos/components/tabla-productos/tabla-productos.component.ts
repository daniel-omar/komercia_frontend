import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';

import { Pagination } from '@shared/interfaces/pagination.interface';
import { TableColumnDefinition } from '@shared/interfaces/table-column-definition.interface';
import { TableProperties } from '@shared/interfaces/table-properties.interface';
import { Product } from 'src/app/modules/productos/interfaces/product.interface';
import { ProductsResponse } from 'src/app/modules/productos/interfaces/products-response.interface';

import { Paginator } from '@shared/classes/paginator.class';

import { TABLE_PRODUCTOS_DISPLAYEDCOLUMNS } from 'src/app/modules/productos/constants/tabla-productos.constant';

import { ProductsService } from 'src/app/modules/productos/services/products.service';
import { CommonModule } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { StatusPipe } from '@shared/pipes/status.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { lastValueFrom } from 'rxjs';
import { ProductService } from 'src/app/modules/productos/services/product.service';
import { ModalService } from '@shared/services/modal.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'listado-tabla-productos',
  imports: [
    CommonModule,

    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatMenuModule,

    NoDataComponent,
    StatusPipe
  ],
  providers: [
    ProductService
  ],
  templateUrl: './tabla-productos.component.html',
  styleUrl: './tabla-productos.component.scss'
})
export class TablaProductosComponent {

  public displayedColumns: string[] = TABLE_PRODUCTOS_DISPLAYEDCOLUMNS;
  public columnsDefinition: TableColumnDefinition[] = [];
  public dataSource!: MatTableDataSource<Product>;
  public paginador: Paginator = new Paginator();
  private _liveAnnouncer = inject(LiveAnnouncer);
  private readonly router = inject(Router)

  private _productService = inject(ProductService);
  private _modalService = inject(ModalService);

  @Input() tableProperties!: TableProperties;
  @Input() set productosResponse(productsResponse: ProductsResponse) {
    // this._loader.hide()
    // console.log("productsResponse", productsResponse)
    this.setColumnsDefinition();
    this.initTableObra(productsResponse);
  }

  @Output("changePage")
  public changePage: EventEmitter<Paginator> = new EventEmitter()

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  setColumnsDefinition(): void {
    this.displayedColumns.forEach((column) => {
      let show: boolean = true;
      if (["x"].indexOf(column.toLowerCase()) >= 0) show = false;

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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onEditProduct(element: Product) {
    console.log(element);
    this.router.navigate(["productos/edicion-producto", element.id_producto]);
  }

  async onDeactivate(element: Product) {
    const result = await lastValueFrom(this._productService.updateActive({ id_producto: element.id_producto, es_activo: false }));
    if (!result) return;
    this.changePage.emit(this.paginador);

    const params = { data: 'Se guardaron los cambios' };
    this._modalService.openDialog(params);
  }

  async onActivate(element: Product) {
    const result = await lastValueFrom(this._productService.updateActive({ id_producto: element.id_producto, es_activo: true }));
    if (!result) return;
    this.changePage.emit(this.paginador);

    const params = { data: 'Se guardaron los cambios' };
    this._modalService.openDialog(params);
  }


}
