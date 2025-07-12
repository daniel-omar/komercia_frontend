import { Component, inject, ViewChild } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { VentasMensualesComponent } from "./components/ventas-mensuales/ventas-mensuales.component";
import { ProductosVendidosComponent } from "./components/productos-vendidos/productos-vendidos.component";
import { MetodosPagoComponent } from "./components/metodos-pago/metodos-pago.component";
import { VentasDiariasComponent } from "./components/ventas-diarias/ventas-diarias.component";
import { VentasVendedorComponent } from "./components/ventas-vendedor/ventas-vendedor.component";
import { DashboardService } from './services/dashboard.service';
import { GraficSaleFilter } from './interfaces/grafic-sale-filter.interface';
import { GraficSale } from './interfaces/grafic-sale.interface';
import { lastValueFrom, Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon';

import { Period } from './interfaces/period.interface';
import { TotalResponse } from './interfaces/total-response.interface';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatChipsModule,
    MatListModule,
    FormsModule,

    VentasMensualesComponent,
    ProductosVendidosComponent,
    MetodosPagoComponent,
    VentasDiariasComponent,
    VentasVendedorComponent
  ],
  providers: [
    DashboardService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private _dashboardService = inject(DashboardService);
  public graficSaleFilter!: GraficSaleFilter;

  public monthlySaleObservable$!: Observable<GraficSale[]>;
  public dailySaleObservable$!: Observable<GraficSale[]>;
  public productsSaleObservable$!: Observable<GraficSale[]>;
  public paymentTypesSaleObservable$!: Observable<GraficSale[]>;
  public usersSaleObservable$!: Observable<GraficSale[]>;
  public totalObservable$!: Observable<TotalResponse>;

  public meses!: Period[];
  public anios!: Period[];

  selectedAnios: string[] = []; // si es multiselección
  selectedAnio: string = '';
  selectedMeses: string[] = []; // si es multiselección
  selectedMes: string = '';

  async ngOnInit() {
    const currentAnio = DateTime.now().toFormat('yyyy');
    const currentMonth = DateTime.now().toFormat('MM');

    this.graficSaleFilter = {
      anios: [currentAnio],
      meses: [currentMonth]
    }
    this.selectedAnio = currentAnio;
    this.selectedMeses = [currentMonth];

    await this.getFilters();
    await this.initGrafics();
  }

  async initGrafics() {
    await Promise.all([
      this.getMonthlySales(this.graficSaleFilter),
      this.getDailySales(this.graficSaleFilter),
      this.getProductsSales(this.graficSaleFilter),
      this.getUsersSales(this.graficSaleFilter),
      this.getPaymentTypesSales(this.graficSaleFilter),
      this.getTotalSales(this.graficSaleFilter)
    ])
  }

  getMonthlySales(filter: GraficSaleFilter) {
    // this.graficSaleFilter = filter;
    this.monthlySaleObservable$ = this._dashboardService.getMonthlySales(filter);
  }

  getDailySales(filter: GraficSaleFilter) {
    // this.graficSaleFilter = filter;
    this.dailySaleObservable$ = this._dashboardService.getDailySales(filter);
  }

  getProductsSales(filter: GraficSaleFilter) {
    // this.graficSaleFilter = filter;
    this.productsSaleObservable$ = this._dashboardService.getProductsSales(filter);
  }

  getPaymentTypesSales(filter: GraficSaleFilter) {
    // this.graficSaleFilter = filter;
    this.paymentTypesSaleObservable$ = this._dashboardService.getPaymentTypesSales(filter);
  }

  getUsersSales(filter: GraficSaleFilter) {
    // this.graficSaleFilter = filter;
    this.usersSaleObservable$ = this._dashboardService.getUsersSales(filter);
  }

  getTotalSales(filter: GraficSaleFilter) {
    // this.graficSaleFilter = filter;
    this.totalObservable$ = this._dashboardService.getTotalSales(filter);
  }

  async getFilters() {
    // this.graficSaleFilter = filter;
    const result = await lastValueFrom(this._dashboardService.getFilters());
    this.meses = result.meses;
    this.anios = result.anios;

  }

  async onMesesChange(element: any) {
    this.graficSaleFilter = {
      anios: [this.selectedAnio],
      meses: this.selectedMeses
    }
    await this.initGrafics();

  }

  async onAnioChange(element: any) {
    this.graficSaleFilter = {
      anios: [this.selectedAnio],
      meses: this.selectedMeses
    }
    await this.initGrafics();
  }
}
