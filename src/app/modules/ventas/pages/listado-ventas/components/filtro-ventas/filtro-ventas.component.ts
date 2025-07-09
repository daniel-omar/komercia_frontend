import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { lastValueFrom } from 'rxjs';
import { PaymentType } from 'src/app/modules/ventas/interfaces/payment_type.interface';
import { SalesFilter } from 'src/app/modules/ventas/interfaces/sales-filter.interface';
import { PaymentTypeService } from 'src/app/modules/ventas/services/payment_type.service';
import { DateTime } from 'luxon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from '@shared/constants/custom_date.constant'; // ruta correcta
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';
import { SalesService } from 'src/app/modules/ventas/services/sales.service';
import { User } from 'src/app/modules/ventas/interfaces/user.interface';
import { Roles } from '@shared/enums';

@Component({
  selector: 'listado-filtro-ventas',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [
    PaymentTypeService,
    // SalesService,
    provideMomentDateAdapter(CUSTOM_DATE_FORMATS)
  ],
  templateUrl: './filtro-ventas.component.html',
  styleUrl: './filtro-ventas.component.scss'
})
export class FiltroVentasComponent {
  private formBuilder = inject(FormBuilder);
  public formSearch!: FormGroup;

  @ViewChildren('select') selects!: QueryList<MatSelect>;
  @ViewChildren('allSelectOption') allSelectOption!: QueryList<MatOption>;

  @Output("search")
  public search: EventEmitter<SalesFilter> = new EventEmitter();

  private _paymentTypeService = inject(PaymentTypeService);
  private _salesService = inject(SalesService);

  public paymentTypes: PaymentType[] = [];
  public users: User[] = [];

  ngOnInit() {
    const dateInitDate = DateTime.now().minus({ weeks: 2 }).toFormat('yyyy-MM-dd');
    const dateEndDate = DateTime.now().toFormat('yyyy-MM-dd');

    this.initFormElements();
    this.initFormFilters();
    this.formSearch.patchValue({
      fecha_inicio: dateInitDate,
      fecha_fin: dateEndDate
    });

    this.submit();

  }

  private initFormFilters(): void {
    this.formSearch = this.formBuilder.group({
      fecha_inicio: [''],
      fecha_fin: [''],
      ids_tipo_pago: [[]],
      ids_usuario_registro: [[]]
    })
  }

  async initFormElements() {
    await Promise.all([
      this.getPaymentTypes(),
      this.getUsers()
    ])
  }

  async getPaymentTypes() {
    this.paymentTypes = await lastValueFrom(this._paymentTypeService.getAll());
    // console.log(this.categorias_producto);
  }

  async getUsers() {
    this.users = await lastValueFrom(this._salesService.getUsersByProfile(Roles.VENDEDOR));
    // console.log(this.categorias_producto);
  }

  submit() {

    let { fecha_inicio, fecha_fin, ids_tipo_pago, ids_usuario_registro } = this.formSearch.value;
    fecha_inicio = moment.isMoment(fecha_inicio)
      ? fecha_inicio.format('YYYY-MM-DD') // si es moment, formatea
      : fecha_inicio;
    fecha_fin = moment.isMoment(fecha_fin)
      ? fecha_fin.format('YYYY-MM-DD') // si es moment, formatea
      : fecha_fin;
    this.onSearch({ fecha_inicio, fecha_fin, ids_tipo_pago, ids_usuario_registro });
  }

  private onSearch(params: SalesFilter): void {
    this.search.emit(params);
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

}
