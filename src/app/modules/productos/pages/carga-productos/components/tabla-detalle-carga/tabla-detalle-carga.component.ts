import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Paginator } from '@shared/classes/paginator.class';
import { Carga, CargaResponse } from '@shared/interfaces/carga.interface';
import { TableColumnDefinition } from '@shared/interfaces/table-column-definition.interface';
import { TableProperties } from '@shared/interfaces/table-properties.interface';
import { TABLE_DETALLE_CARGA_PRODUCTOS_DISPLAYEDCOLUMNS } from 'src/app/modules/productos/constants/tabla-detalle-carga-producto.constant';

@Component({
  selector: 'tabla-detalle-carga-productos',
  imports: [
    CommonModule,

    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule
  ],
  templateUrl: './tabla-detalle-carga.component.html',
  styleUrl: './tabla-detalle-carga.component.scss'
})
export class TablaDetalleCargaComponent {
  public displayedColumns: string[] = TABLE_DETALLE_CARGA_PRODUCTOS_DISPLAYEDCOLUMNS;
  public columnsDefinition: TableColumnDefinition[] = [];
  public dataSource!: MatTableDataSource<Carga>;
  public paginador: Paginator = new Paginator();
  private _liveAnnouncer = inject(LiveAnnouncer);

  @Input() tableProperties!: TableProperties;
  @Input() set cargaResponse(cargaResponse: CargaResponse) {
    // this._loader.hide()
    // console.log("productsResponse", productsResponse)
    this.setColumnsDefinition();
    this.initTableObra(cargaResponse);
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
      if (["accion"].indexOf(column.toLowerCase()) >= 0) show = false;

      this.columnsDefinition.push({
        id: column,
        description: column,
        show: show
      })
    })
  }

  private initTableObra(cargaResponse: CargaResponse) {
    this.dataSource = new MatTableDataSource(cargaResponse?.cargas);
  }

  // private setUpPaginador(pagination: any): void {
  //   this.paginador = this.paginador.onSetUpPaginador(pagination);
  // }

  // public onChangePage(event: PageEvent): void {
  //   this.paginador = this.paginador.onChangePage(event);
  //   this.changePage.emit(this.paginador)
  // }

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
}
