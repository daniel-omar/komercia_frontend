import { Injectable, inject } from '@angular/core';

import { IMenu } from '@core/interfaces/menu.interface';
import {
    buildConfigAdministracion,
    buildConfigCliente,
    buildConfigReportes,
    buildConfigProductos,
    getVisibleMenuItems,
    buildConfigVentas
} from '@core/components/menu/functions';

import { MenuRoleService } from '@core/services/menu-role.service';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private readonly _menuRoleService = inject(MenuRoleService);

    public async getMenu(): Promise<IMenu[]> {

        const menu: IMenu[] = [
            buildConfigAdministracion(this._menuRoleService),
            buildConfigReportes(this._menuRoleService),
            // buildConfigCliente(this._menuRoleService),
            buildConfigProductos(this._menuRoleService),
            buildConfigVentas(this._menuRoleService)
        ];

        return getVisibleMenuItems(menu);
    }


}