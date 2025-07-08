import { IMenu } from "@core/interfaces";
import { MenuRoleService } from "@core/services/menu-role.service";

export function buildConfigVentas(menuRoleService: MenuRoleService): IMenu {

    const buildConfig: IMenu = {
        text: "Ventas",
        icon: "/assets/img/menu/barras.svg",
        visible: menuRoleService.onVisibleReportes(),
        subitems: [
            {
                text: "Nueva venta",
                url: "/ventas/nueva-venta",
                visible: true
            },
            {
                text: "Listado de ventas",
                url: "/ventas/listado-ventas",
                visible: true
            }
        ]
    }

    return buildConfig;

}