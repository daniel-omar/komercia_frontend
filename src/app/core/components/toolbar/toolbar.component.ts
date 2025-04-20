import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@auth/interfaces/user.interface';
import { AuthService } from '@auth/services/auth.service';
import { TokenService } from '@shared/services/token.service';

@Component({
  selector: 'app-toolbar',
  imports: [],
  providers: [
    AuthService
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  private _tokenService = inject(TokenService);
  private _authService = inject(AuthService);

  private router = inject(Router);

  public sessionStorage: (User | null) = this._tokenService.getUser;

  public onLogout(): void {
    this._authService.logout()
      .subscribe({
        next: (status) => {
          this._tokenService.onSignOut();
        },
        error: (message) => {
          // console.log({ message })
        }
      });
  }
}
