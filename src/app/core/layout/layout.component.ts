import { Component } from '@angular/core';
import { MenuComponent } from "../components/menu/menu.component";
import { LoaderComponent } from "@shared/components/loader/loader.component";
import { RouterOutlet } from '@angular/router';
import { MenuService } from '@core/services/menu.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { SidebarComponent } from "@core/components/sidebar/sidebar.component";
import { BreadcrumbComponent } from "@core/components/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    // MenuComponent,
    // BreadcrumbComponent,
    NavbarComponent,
    SidebarComponent,
    LoaderComponent,
    RouterOutlet,
    SidebarComponent,
    BreadcrumbComponent
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public isSidebarOpen: boolean = true;

  public sidebarOpened(isSidebarOpen: boolean) {
    console.log(isSidebarOpen);
    this.isSidebarOpen = isSidebarOpen;
  }

}
