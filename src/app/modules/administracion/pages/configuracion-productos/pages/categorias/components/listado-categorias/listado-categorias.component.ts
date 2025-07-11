import { Component, inject } from '@angular/core';
import { TablaCategoriasComponent } from './components/tabla-categorias/tabla-categorias.component';
import { ProductCategoryService } from 'src/app/modules/administracion/pages/configuracion-productos/services/product_category.service';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/modules/administracion/pages/configuracion-productos/interfaces/product-category.interface';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '@shared/services/modal.service';
import { FormularioCategoriaComponent } from '../../dialogs/formulario-categoria/formulario-categoria.component';
import { NotifierType } from '@shared/enums';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'listado-categorias-producto',
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    TablaCategoriasComponent
  ],
  providers: [ProductCategoryService],
  templateUrl: './listado-categorias.component.html',
  styleUrl: './listado-categorias.component.scss'
})
export class ListadoCategoriasComponent {
  private _productCategoryService = inject(ProductCategoryService);
  public productCategorysObservable$!: Observable<ProductCategory[]>;
  private dialog = inject(MatDialog);
  private _modalService = inject(ModalService);

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.productCategorysObservable$ = this._productCategoryService.getAll()
  }

  async onCreate() {
    const dialogRef = this.dialog.open(FormularioCategoriaComponent, {
      width: '20rem',
      data: null,
      panelClass: 'border__rounded'
    });
    dialogRef.afterClosed().subscribe(returns => {
      if (returns == NotifierType.SUCCESS) {
        this.getAll();
        const params = { data: 'Se guardaron los cambios' };
        this._modalService.openDialog(params);
      }
    })
  }

}
