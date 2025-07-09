import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { TableProperties } from '@shared/interfaces/table-properties.interface';
import { ProductCategory } from 'src/app/modules/administracion/interfaces/product-category.interface';

@Component({
  selector: 'configuracion-listado-tabla-categorias',
  imports: [
    CommonModule,

    MatIconModule,
    MatTableModule,
    MatTooltipModule,

    NoDataComponent
  ],
  templateUrl: './tabla-categorias.component.html',
  styleUrl: './tabla-categorias.component.scss'
})
export class TablaCategoriasComponent {
  columns: string[] = ["nombre", "descripcion", "es_activo", "accion"];
  public dataSource!: MatTableDataSource<ProductCategory>;
  private readonly router = inject(Router)

  @Input() tableProperties!: TableProperties;
  @Input() set productCategorys(productCategorys: ProductCategory[]) {
    this.initTable(productCategorys);
  }

  private initTable(productCategorys: ProductCategory[]) {
    this.dataSource = new MatTableDataSource(productCategorys);
  }

  onEditProductCategory(element: ProductCategory) {
    console.log(element);
    this.router.navigate(["/administracion/configuracion-productos/categoria", element.id_categoria_producto]);
  }
}
