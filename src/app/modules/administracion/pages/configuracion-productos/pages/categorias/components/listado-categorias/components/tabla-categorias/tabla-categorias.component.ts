import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() tableProperties!: TableProperties;
  @Input() set productCategorys(productCategorys: ProductCategory[]) {
    this.initTable(productCategorys);
  }

  ngAfterViewInit(): void {
    console.log("B")
    this.dataSource.paginator = this.paginator;
  }

  private initTable(productCategorys: ProductCategory[]) {
    console.log("A")
    this.dataSource = new MatTableDataSource(productCategorys);
  }

  onEditProductCategory(element: ProductCategory) {
    console.log(element);
    this.router.navigate(["/administracion/configuracion-productos/categoria", element.id_categoria_producto]);
  }

  onEdit(element: any) {
    const dialogRef = this.dialog.open(FormularioCategoriaComponent, {
      width: '20rem',
      data: element,
      panelClass: 'border__rounded'
    });
    dialogRef.afterClosed().subscribe(returns => {
      if (returns == NotifierType.SUCCESS) {
        const params = { data: 'Se guardaron los cambios' };
        this._modalService.openDialog(params);
      }
    })
  }

  onDeactivate(element: any) {

  }

  onActivate(element: any) {

  }
}
