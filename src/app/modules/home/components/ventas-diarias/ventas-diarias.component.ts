import { Component, Input } from '@angular/core';
import { GraficSale } from '@home/interfaces/grafic-sale.interface';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,

} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  colors: string[] | any;
};

@Component({
  selector: 'dashboard-ventas-diarias',
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './ventas-diarias.component.html',
  styleUrl: './ventas-diarias.component.scss'
})
export class VentasDiariasComponent {

  @Input() set dailySale(response: GraficSale[]) {
    console.log(response)
    const series = response.map(x => x.total_ventas);
    const labels = response.map(x => x.etiqueta);
    // console.log({ series, labels })
    this.initGrafic(series, labels)
  }

  public chartOptions!: Partial<ChartOptions>;
  constructor() {
    this.initGrafic([1], ["-"])
  }

  initGrafic(series: any[], labels: any[]) {
    this.chartOptions = {
      series: [
        {
          name: "S/",
          data: series
        }
      ],
      chart: {
        type: 'area',
        height: 160
      },
      colors: ['#00E396'],
      xaxis: {
        categories: labels
      }
    };
  }
}
