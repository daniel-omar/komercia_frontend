import { Component, inject } from '@angular/core';
import { FiltroVentasComponent } from "./components/filtro-ventas/filtro-ventas.component";
import { SalesService } from '../../services/sales.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SalesFilter } from '../../interfaces/sales-filter.interface';
import { Paginator } from '@shared/classes/paginator.class';
import { Router } from '@angular/router';
import { SalesResponse } from '../../interfaces/sales-response.interface';
import { Observable } from 'rxjs';
import { TablaVentasComponent } from './components/tabla-ventas/tabla-ventas.component';

@Component({
  selector: 'app-listado-ventas',
  imports: [
    CommonModule,
    FiltroVentasComponent,
    TablaVentasComponent,

    MatIconModule,
    MatButtonModule
  ],
  providers: [
    SalesService
  ],
  templateUrl: './listado-ventas.component.html',
  styleUrl: './listado-ventas.component.scss'
})
export class ListadoVentasComponent {
  private _salesService = inject(SalesService);
  public salesFilter!: SalesFilter;
  public salesResponseObservable$!: Observable<SalesResponse>;

  public paginador: Paginator = new Paginator({ per_page: 5, new_page: 1, total: 0, current_page: 0, pages: 0 });

  private readonly router = inject(Router);

  ngOnInit() {
  }

  searchByFilters(filter: SalesFilter) {
    this.salesFilter = filter;
    this.salesResponseObservable$ = this._salesService.getByFilters(this.salesFilter, this.paginador)
  }

  searchByPaginator(paginator: Paginator) {
    this.paginador = paginator;
    this.salesResponseObservable$ = this._salesService.getByFilters(this.salesFilter, this.paginador);
  }

  goCreateSale() {
    this.router.navigate(["ventas/nueva-venta"]);
  }
}
