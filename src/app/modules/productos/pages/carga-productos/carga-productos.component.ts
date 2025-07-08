import { Component, inject } from '@angular/core';
import { PanelCargaComponent } from "./components/panel-carga/panel-carga.component";
import { CommonModule } from '@angular/common';
import { TablaDetalleCargaComponent } from "./components/tabla-detalle-carga/tabla-detalle-carga.component";
import { ProductsService } from '../../services/products.service';
import { Observable, of } from 'rxjs';
import { Carga, CargaResponse } from '@shared/interfaces/carga.interface';

@Component({
  selector: 'app-carga-productos',
  imports: [CommonModule, PanelCargaComponent, TablaDetalleCargaComponent],
  providers: [ProductsService],
  templateUrl: './carga-productos.component.html',
  styleUrl: './carga-productos.component.scss'
})
export class CargaProductosComponent {
  private _productsService = inject(ProductsService);
  public cargaResponseObservable$!: Observable<CargaResponse | null>

  getDetailsObraCarga(carga: Carga | null) {
    if (!carga) {
      this.cargaResponseObservable$ = of();
      return;
    }

    this.cargaResponseObservable$ = this._productsService.getCarga(carga.id_carga);
  }
}
