import { Component, Input } from '@angular/core';
import { GraficSale } from '@home/interfaces/grafic-sale.interface';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  AnnotationLabel,
  ApexResponsive
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  title: ApexTitleSubtitle | any;
  labels: AnnotationLabel | any;
  responsive: ApexResponsive | any;
};

@Component({
  selector: 'dashboard-ventas-vendedor',
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './ventas-vendedor.component.html',
  styleUrl: './ventas-vendedor.component.scss'
})
export class VentasVendedorComponent {

  @Input() set usersSale(response: GraficSale[]) {
    console.log(response)
    const series = response.map(x => x.cantidad_ventas);
    const labels = response.map(x => x.etiqueta);
    this.initGrafic(series, labels)
  }

  public chartOptions!: Partial<ChartOptions>;
  constructor() {
    this.initGrafic([1], [1]);
  }

  initGrafic(series: any[], labels: any[]) {
    this.chartOptions = {
      series: series,
      chart: {
        width: 380,
        // height: 350,
        type: 'donut',
      },
      labels: labels,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }

}
