import { Component, inject } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'nueva-venta',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    RouterModule
  ],
  providers: [
    SalesService
  ],
  templateUrl: './nueva-venta.component.html',
  styleUrl: './nueva-venta.component.scss'
})
export class NuevaVentaComponent {
  private _salesService = inject(SalesService);
  private readonly router = inject(Router)
  private readonly activatedRoute = inject(ActivatedRoute)

  goListSales() {
    this.router.navigate(["ventas/listado-ventas"]);
  }

}
