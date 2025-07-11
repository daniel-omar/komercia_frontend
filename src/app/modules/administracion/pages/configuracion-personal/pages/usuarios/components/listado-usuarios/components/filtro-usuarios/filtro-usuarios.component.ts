import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatOption, MatSelect, MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, lastValueFrom, Subject, Subscription } from 'rxjs';
import { DebouncerSelect } from '@shared/interfaces/debouncer-select.interface';

import { DocumentTypeService } from 'src/app/modules/administracion/pages/configuracion-personal/services/document_type.service';
import { ProfileService } from 'src/app/modules/administracion/pages/configuracion-personal/services/profile.service';
import { DocumentType } from 'src/app/modules/administracion/pages/configuracion-personal/interfaces/document-type.interface';
import { Profile } from 'src/app/modules/administracion/pages/configuracion-personal/interfaces/profile.interface';
import { ProductsFilter } from 'src/app/modules/productos/interfaces/products-filter.interface';
import { UsersFilter } from 'src/app/modules/administracion/pages/configuracion-personal/interfaces/users-filter.interface';

@Component({
  selector: 'listado-filtro-usuarios',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    ProfileService
  ],
  templateUrl: './filtro-usuarios.component.html',
  styleUrl: './filtro-usuarios.component.scss'
})
export class FiltroUsuariosComponent {
  private formBuilder = inject(FormBuilder);
  public formSearch!: FormGroup;
  @ViewChildren('select') selects!: QueryList<MatSelect>;
  @ViewChildren('allSelectOption') allSelectOption!: QueryList<MatOption>;
  private debouncerSelect: Subject<DebouncerSelect> = new Subject<DebouncerSelect>()
  private debouncerSelectSuscription?: Subscription;

  private _profileService = inject(ProfileService);

  public profiles: Profile[] = [];

  @Output("search")
  public search: EventEmitter<ProductsFilter> = new EventEmitter()

  ngOnInit() {
    console.log("filtro")
    this.initFormElements();
    this.initFormFilters();
    this.submit();
  }

  private initFormFilters(): void {
    this.formSearch = this.formBuilder.group({
      numero_documento: [''],
      nombre: [''],
      correo: [''],
      ids_perfil: [[]]
    })
  }

  async initFormElements() {
    await Promise.all([
      this.getProfiles()
    ])
  }

  submit() {

    const { numero_documento, nombre, correo, ids_perfil } = this.formSearch.value;
    this.onSearch({ numero_documento, nombre: nombre.trim(), correo, ids_perfil });
  }

  private onSearch(params: UsersFilter): void {
    this.search.emit(params);
  }

  async getProfiles() {
    this.profiles = await lastValueFrom(this._profileService.getAll());
  }

  toggleAllSelection(element: string) {
    let select = this.selects.toArray().filter(x => x.ngControl.name == element)[0];
    let values: number[] = select.value;

    if (values.indexOf(0) > -1) select.options.forEach((item: MatOption) => item.select());
    else select.options.forEach((item: MatOption) => item.deselect());
  }

  optionClick(element: string) {
    let newStatus = true;
    let select = this.selects.toArray().filter(x => x.ngControl.name == element)[0];
    console.log(select)
    select.options.forEach((item: MatOption) => {
      if (!item.selected && item.value != 0) {
        newStatus = false;
      }
    });

    if (newStatus) select.options.first.select()
    else select.options.first.deselect()

  }

  clearField(field: string) {
    this.formSearch.get(field)?.reset();
  }
}
