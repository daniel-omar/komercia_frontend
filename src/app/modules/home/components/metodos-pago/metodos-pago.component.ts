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
  selector: 'dashboard-metodos-pago',
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './metodos-pago.component.html',
  styleUrl: './metodos-pago.component.scss'
})
export class MetodosPagoComponent {

  @Input() set paymentTypesSale(response: GraficSale[]) {
    console.log(response)
    const series = response.map(x => x.cantidad_ventas);
    const labels = response.map(x => x.etiqueta);
    // console.log({ series, labels })
    this.initGrafic(series, labels)
  }

  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.initGrafic([1], [1])
  }

  initGrafic(series: any[], labels: any[]) {
    this.chartOptions = {
      series: series,
      chart: {
        width: 380,
        // height: 350,
        type: 'pie',
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
