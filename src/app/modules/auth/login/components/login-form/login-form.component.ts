import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from '@auth/interceptors/auth.interceptor';

import { ValidatorsService } from '@shared/services/validators.service';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  standalone: true,
  selector: 'app-login-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  // providers: [
  //   AuthService
  // ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  private _validatorsService = inject(ValidatorsService);
  private _authService = inject(AuthService);
  private router = inject(Router)

  private formBuilder = inject(FormBuilder);
  public formLogin!: FormGroup;


  ngOnInit() {
    this.initFormFilters();
  }

  private initFormFilters(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  submit() {
    if (!this.formLogin.valid) return;

    const { email: correo, password: clave } = this.formLogin.value;

    this.onAuthentication({ correo, clave });
  }

  private onAuthentication(params: Object): void {
    console.log('Valores Login: ', params)
    this._authService.login(params)
      .subscribe({
        next: (status) => {
          console.log("logeado")
          this.router.navigateByUrl('/')
        },
        error: (message) => {
          // console.log({ message })
        }
      });
  }
}
