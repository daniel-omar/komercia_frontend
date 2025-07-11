import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SalesService } from '../../services/sales.service';
import { Sale } from '../../interfaces/sale.interface';
import { SaleService } from '../../services/sale.service';
import { lastValueFrom } from 'rxjs';
import { SaleDetail } from '../../interfaces/sale-detail.interface';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'detalle-venta',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    RouterModule
  ],
  providers: [
    SalesService,
    SaleService
  ],
  templateUrl: './detalle-venta.component.html',
  styleUrl: './detalle-venta.component.scss'
})
export class DetalleVentaComponent {
  private _salesService = inject(SalesService);
  private _saleService = inject(SaleService);

  private readonly router = inject(Router)
  private readonly activatedRoute = inject(ActivatedRoute)
  private idSale!: number;
  public sale!: Sale;
  public saleDetails!: SaleDetail[];

  columnas: string[] = ['producto', 'variante', 'cantidad', 'precioUnitario', 'subtotal'];

  ngOnInit() {
    console.log("filtro")

    this.activatedRoute.paramMap.subscribe(async (params) => {
      const id = params.get('id');

      this.idSale = +(id ?? '0');
      await this.getById(this.idSale); // 👉 lógica para obtener datos
      await this.getDetailsById(this.idSale);

      console.log(this.sale)
      console.log(this.saleDetails)
    });


  }

  async getById(idVenta: number) {
    this.sale = await lastValueFrom(this._saleService.getById(idVenta));
  }

  async getDetailsById(idVenta: number) {
    this.saleDetails = await lastValueFrom(this._saleService.getDetailsById(idVenta));
  }

  goListSales() {
    this.router.navigate(["ventas/listado-ventas"]);
  }

  obtenerTotal(): number {
    return this.saleDetails.reduce((acc, item) => acc + (item.sub_total), 0);
  }
}
