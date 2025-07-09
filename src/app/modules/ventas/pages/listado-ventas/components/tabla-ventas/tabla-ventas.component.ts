import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Paginator } from '@shared/classes/paginator.class';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { TableColumnDefinition } from '@shared/interfaces/table-column-definition.interface';
import { TableProperties } from '@shared/interfaces/table-properties.interface';
import { TABLE_VENTAS_DISPLAYEDCOLUMNS } from 'src/app/modules/ventas/constants/tabla-ventas.constant';
import { Sale } from 'src/app/modules/ventas/interfaces/sale.interface';
import { SalesResponse } from 'src/app/modules/ventas/interfaces/sales-response.interface';

@Component({
  selector: 'listado-tabla-ventas',
  imports: [
    CommonModule,

    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,

    NoDataComponent
  ],
  templateUrl: './tabla-ventas.component.html',
  styleUrl: './tabla-ventas.component.scss'
})
export class TablaVentasComponent {
  public displayedColumns: string[] = TABLE_VENTAS_DISPLAYEDCOLUMNS;
  public columnsDefinition: TableColumnDefinition[] = [];
  public dataSource!: MatTableDataSource<Sale>;
  public paginador: Paginator = new Paginator();
  private _liveAnnouncer = inject(LiveAnnouncer);
  private readonly router = inject(Router)

  @Input() tableProperties!: TableProperties;
  @Input() set salesResponse(salesResponse: SalesResponse) {
    this.setColumnsDefinition();
    this.initTableObra(salesResponse);
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
      if (["es_activo", "tiene_descuento", "tipo_descuento", "descuento"].indexOf(column.toLowerCase()) >= 0) show = false;

      this.columnsDefinition.push({
        id: column,
        description: column,
        show: show
      })
    })
  }

  private initTableObra(salesResponse: SalesResponse) {
    console.log(salesResponse?.ventas)
    this.dataSource = new MatTableDataSource(salesResponse?.ventas);
    this.setUpPaginador(salesResponse?.paginacion);
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

  onViewDetail(element: Sale) {
    console.log(element);
    this.router.navigate(["ventas/detalle-venta", element.id_venta]);
  }
}
