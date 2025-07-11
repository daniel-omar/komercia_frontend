import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ProfileService } from '../../../../services/profile.service';
import { DocumentTypeService } from '../../../../services/document_type.service';
import { DocumentType } from '../../../../interfaces/document-type.interface';
import { Profile } from '../../../../interfaces/profile.interface';
import { UserService } from '../../../../services/user.service';
import { ModalService } from '@shared/services/modal.service';
import { ValidatorsService } from '@shared/services/validators.service';
import { User } from '../../../../interfaces/user.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-formulario-personal',
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
    ProfileService,
    DocumentTypeService,
    UserService
  ],
  templateUrl: './formulario-personal.component.html',
  styleUrl: './formulario-personal.component.scss'
})
export class FormularioPersonalComponent {
  private formBuilder = inject(FormBuilder);
  public formUser!: FormGroup;

  public documentTypes: DocumentType[] = [];
  public profiles: Profile[] = [];

  private _profileService = inject(ProfileService);
  private _documentTypeService = inject(DocumentTypeService);
  private _userService = inject(UserService);
  private _modalService = inject(ModalService);
  private _validatorsService = inject(ValidatorsService);

  private readonly router = inject(Router)
  private readonly activatedRoute = inject(ActivatedRoute)
  private idUser?: number;
  public editMode: boolean = false;
  private user!: User;

  ngOnInit() {
    console.log("filtro")
    this.initFormElements();
    this.initFormFilters();

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.idUser = +id;
        this.editMode = true;
        this.getById(this.idUser); // 👉 lógica para obtener datos
      } else {
        this.editMode = false;
      }
    });

  }

  private initFormFilters(): void {
    this.formUser = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      id_tipo_documento: [0, [Validators.required, Validators.min(1)]],
      numero_documento: ['', [Validators.required, Validators.minLength(8)]],
      apellido_paterno: ['', [Validators.required, Validators.minLength(4)]],
      apellido_materno: ['', [Validators.required, Validators.minLength(4)]],
      id_perfil: [0, [Validators.required, Validators.min(1)]],
      correo: ['', [Validators.required, Validators.email]],
      numero_telefono: ['']
    })
  }

  async initFormElements() {
    await Promise.all([
      this.getDocumentTypes(),
      this.getProfiles()
    ])
  }

  async getDocumentTypes() {
    this.documentTypes = await lastValueFrom(this._documentTypeService.getAll());
    // console.log(this.categorias_producto);
  }
  async getProfiles() {
    this.profiles = await lastValueFrom(this._profileService.getAll());
    // console.log(this.categorias_producto);
  }

  async getById(idUsuario: number) {
    this.user = await lastValueFrom(this._userService.getById(idUsuario));
    console.log(this.user)
    this.formUser.patchValue(this.user);
  }


  async submit() {
    if (!this.formUser.valid) return;

    const { nombre, id_tipo_documento, numero_documento, apellido_paterno, apellido_materno, id_perfil, correo, numero_telefono } = this.formUser.value;

    const body = {
      nombre: nombre.trim(),
      id_tipo_documento,
      numero_documento,
      apellido_paterno: apellido_paterno.trim(),
      apellido_materno: apellido_materno.trim(),
      id_perfil,
      correo,
      numero_telefono
    }

    let result: boolean = false;
    if (this.editMode) result = await lastValueFrom(this._userService.update({ id_usuario: this.idUser!, ...body }));
    else result = await lastValueFrom(this._userService.create(body));

    if (!result) return;

    this._modalService.openDialog({ data: 'Se guardo el producto' }, (resultDlg) => {
      this.router.navigate(["administracion/configuracion-personal/usuarios"]);
    });

  }

  isInvalidField(field: string) {
    return this._validatorsService.isInvalidField(this.formUser, field);
  }

  getFieldError(field: string) {
    return this._validatorsService.getFieldError(this.formUser, field);
  }

  goListUsers() {
    this.router.navigate(["administracion/configuracion-personal/usuarios"]);
  }

  clear() {
    this.formUser.reset();
  }
}
