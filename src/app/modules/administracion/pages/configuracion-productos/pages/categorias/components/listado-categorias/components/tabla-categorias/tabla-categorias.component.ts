import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

import { Router } from '@angular/router';
import { Paginator } from '@shared/classes/paginator.class';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { TableProperties } from '@shared/interfaces/table-properties.interface';
import { ProductCategory } from 'src/app/modules/administracion/interfaces/product-category.interface';
import { MatButtonModule } from '@angular/material/button';
import { StatusPipe } from '@shared/pipes/status.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '@shared/services/modal.service';
import { FormularioCategoriaComponent } from '../../../../dialogs/formulario-categoria/formulario-categoria.component';
import { NotifierType } from '@shared/enums';
import { lastValueFrom } from 'rxjs';
import { ProductCategoryService } from 'src/app/modules/administracion/services/product_category.service';

@Component({
  selector: 'configuracion-listado-tabla-categorias',
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatMenuModule,
    NoDataComponent,

    StatusPipe
  ],
  providers: [ProductCategoryService],
  templateUrl: './tabla-categorias.component.html',
  styleUrl: './tabla-categorias.component.scss'
})
export class TablaCategoriasComponent {
  columns: string[] = ["nombre", "descripcion", "es_activo", "accion"];
  public dataSource!: MatTableDataSource<ProductCategory>;
  private readonly router = inject(Router)
  public paginador: Paginator = new Paginator();
  private dialog = inject(MatDialog);
  private _modalService = inject(ModalService);

  private _productCategoryService = inject(ProductCategoryService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() tableProperties!: TableProperties;
  @Input() set productCategorys(productCategorys: ProductCategory[]) {
    this.initTable(productCategorys);
  }
  @Output("search")
  public search: EventEmitter<boolean> = new EventEmitter()

  ngAfterViewInit(): void {
    console.log("B")
    this.dataSource.paginator = this.paginator;
  }

  private initTable(productCategorys: ProductCategory[]) {
    console.log("A")
    this.dataSource = new MatTableDataSource(productCategorys);
  }

  async onEdit(element: ProductCategory) {
    const productCategory = await lastValueFrom(this._productCategoryService.getById(element.id_categoria_producto));

    const dialogRef = this.dialog.open(FormularioCategoriaComponent, {
      width: '20rem',
      data: productCategory,
      panelClass: 'border__rounded'
    });
    dialogRef.afterClosed().subscribe(returns => {
      if (returns == NotifierType.SUCCESS) {
        this.search.emit(true);

        const params = { data: 'Se guardaron los cambios' };
        this._modalService.openDialog(params);
      }
    })
  }

  async onDeactivate(element: ProductCategory) {
    const result = await lastValueFrom(this._productCategoryService.updateActive({ id_categoria_producto: element.id_categoria_producto, es_activo: false }));
    if (!result) return;
    this.search.emit(true);

    const params = { data: 'Se guardaron los cambios' };
    this._modalService.openDialog(params);
  }

  async onActivate(element: ProductCategory) {
    const result = await lastValueFrom(this._productCategoryService.updateActive({ id_categoria_producto: element.id_categoria_producto, es_activo: true }));
    if (!result) return;
    this.search.emit(true);

    const params = { data: 'Se guardaron los cambios' };
    this._modalService.openDialog(params);
  }

}
