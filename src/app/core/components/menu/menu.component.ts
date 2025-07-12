import { Component, inject } from '@angular/core';

import { environment } from 'src/environments/environment';
import { IMenu, IMenuSubitem } from '@core/interfaces';
import { MenuService } from '@core/services/menu.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [
    RouterModule,
    NgOptimizedImage,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  protected menuItems: IMenu[] = [];
  private readonly _menuService = inject(MenuService);
  private readonly router = inject(Router)

  ngOnInit(): void {
    this.getMenu();
    console.log(this.menuItems)
  }

  public irA(ruta: string, codNsf: string = ''): void {

    // const load: HTMLElement | null = document.getElementById('load');
    // load!.style.display = '';
    this.router.navigate([""]);
  }

  public isScroleableSub(items: IMenuSubitem[] | undefined): boolean {
    if (!items?.length) return false;

    return items.length > 5;

  }


  public isScroleable(items: any[] | undefined): boolean {

    //console.log('### items: ',items)
    if (items) {
      for (let ite of items) {
        if (ite.url == '') return false;

      }
    }

    if (!items?.length) return false;

    return items.length > 5;

  }

  private async getMenu(): Promise<void> {
    this.menuItems = await this._menuService.getMenu();
  }

}
