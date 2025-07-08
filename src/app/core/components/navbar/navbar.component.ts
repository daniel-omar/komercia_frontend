import { Component, EventEmitter, inject, Output } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import { AuthService } from '@auth/services/auth.service';
import { TokenService } from '@shared/services/token.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private _tokenService = inject(TokenService);
  public currentUser: (User | null) = this._tokenService.currentUser();
  private _authService = inject(AuthService);

  public isSidebarOpen = true;

  @Output("sidebarOpen")
  public sidebarOpen: EventEmitter<boolean> = new EventEmitter()

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarOpen.emit(this.isSidebarOpen);
  }

  public onLogout(): void {
    this._authService.logout()
      .subscribe({
        next: (status) => {
          console.log("gaa")
          this._tokenService.onSignOut();
        },
        error: (message) => {
          console.log(message)
        }
      });
  }
}
