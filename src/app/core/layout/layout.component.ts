import { Component } from '@angular/core';
import { MenuComponent } from "../components/menu/menu.component";
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";
import { LoaderComponent } from "@shared/components/loader/loader.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [MenuComponent, BreadcrumbComponent, LoaderComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
