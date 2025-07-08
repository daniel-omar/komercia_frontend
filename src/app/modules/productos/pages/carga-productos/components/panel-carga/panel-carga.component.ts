import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Carga } from '@shared/interfaces/carga.interface';
import { ModalService } from '@shared/services/modal.service';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';

import { tap } from 'rxjs';
import { ProductService } from 'src/app/modules/productos/services/product.service';
import { ProductsService } from 'src/app/modules/productos/services/products.service';

@Component({
  selector: 'panel-carga-productos',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgxFileDropModule
  ],
  providers: [
    ProductsService,
    ProductService
  ],
  templateUrl: './panel-carga.component.html',
  styleUrl: './panel-carga.component.scss'
})
export class PanelCargaComponent {

  private _productsService = inject(ProductsService);
  private _productService = inject(ProductService);
  private _modalService = inject(ModalService);

  public isFileAllowed: boolean = true;
  public files: any[] = [];
  public filesUpdate: any[] = []

  @Output("getDetails")
  public getDetails: EventEmitter<Carga | null> = new EventEmitter()

  onDrop(files: NgxFileDropEntry[]): void {
    const fileExtension: string = files[0].fileEntry.name;
    if (!this.onIsFileAllowed(fileExtension)) return;
    this.files = files;
  }

  private onIsFileAllowed(fileName: string): boolean {

    this.isFileAllowed = true;

    const allowedFiles: string[] = ['.xlsx', '.xls'];
    const regex: RegExp = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName)?.shift();

    if (undefined !== extension && null !== extension) {
      this.isFileAllowed = (allowedFiles.includes(extension)) ? true : false;
    }

    return this.isFileAllowed
  }

  public onSubmit(): void {
    this.files.forEach(
      (item: any) => {
        const fileEntry = item.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => this.filesUpdate.push(file));
      }
    )

    let data = {
      buttonConfirmText: 'Aceptar',
      buttonConfirmColor: 'color-primary',
      title: '¿Seguro que quieres cargar el archivo de obras?',
      hideButtonCancel: false
    }


    this._modalService.openDialogConfirmation({ data }, (response: any) => {
      this.getDetails.emit(null);

      if (!response) return;

      this._productsService.createProductsBulk(this.filesUpdate[0])
        .subscribe((responseCarga) => {

          this.clear();
          if (!responseCarga) return;

          this.getDetails.emit(responseCarga);
        })
    })
  }

  public clear(): void {
    this.files = []
    this.filesUpdate = [];
  }

  exportTemplateExcel() {
    return this._productsService.downloadTemplateObraCarga().pipe(
      tap((blob) => {
        const url: string = window.URL.createObjectURL(blob);
        const link: HTMLAnchorElement = document.createElement('a');
        link.href = url;
        link.download = 'plantilla-carga-masiva.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
      })).subscribe();
  }

}
