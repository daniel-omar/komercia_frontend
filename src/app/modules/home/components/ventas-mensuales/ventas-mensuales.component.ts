import { Component, Input } from '@angular/core';
import { GraficSale } from '@home/interfaces/grafic-sale.interface';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  title: ApexTitleSubtitle | any;
};

@Component({
  selector: 'dashboard-ventas-mensuales',
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './ventas-mensuales.component.html',
  styleUrl: './ventas-mensuales.component.scss'
})
export class VentasMensualesComponent {

  @Input() set monthlySale(response: GraficSale[]) {
    console.log(response)
    const series = response.map(x => x.total_ventas);
    const labels = response.map(x => x.etiqueta);
    // console.log({ series, labels })
    this.initGrafic(series, labels)
  }

  public chartOptions!: Partial<ChartOptions>;
  constructor() {
    this.initGrafic([1], ["-"]);
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
        height: 350,
        type: "bar"
      },
      xaxis: {
        categories: labels
      }
    };
  }
}
