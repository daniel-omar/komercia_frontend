import { Component } from '@angular/core';
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { LoaderComponent } from '@shared/components/loader/loader.component';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [LoginFormComponent, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
