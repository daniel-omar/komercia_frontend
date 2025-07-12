import { Component, Input } from '@angular/core';
import { GraficSale } from '@home/interfaces/grafic-sale.interface';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexOptions,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  title: ApexTitleSubtitle | any;
  plotOptions: ApexPlotOptions | any;
  dataLabels: ApexDataLabels | any;
  stroke: ApexStroke | any;
  tooltip: ApexTooltip | any;
};

@Component({
  selector: 'dashboard-productos-vendidos',
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './productos-vendidos.component.html',
  styleUrl: './productos-vendidos.component.scss'
})
export class ProductosVendidosComponent {

  @Input() set productsSale(response: GraficSale[]) {
    console.log(response);
    const series = response.map(x => x.cantidad_ventas);
    const labels = response.map(x => x.etiqueta);
    // console.log({ series, labels })+

    this.initGrafic(series, labels)
  }

  public chartOptions!: Partial<ChartOptions>;

  constructor() {
    this.initGrafic([1], ["-"])
  }

  initGrafic(series: any[], labels: any[]) {
    this.chartOptions = {
      series: [{
        name: "Cant.",
        data: series
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -10,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      xaxis: {
        categories: labels,
      },
    };
  }
}
