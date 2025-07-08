import { IMenu } from "@core/interfaces";
import { MenuRoleService } from "@core/services/menu-role.service";

export function buildConfigVentas(menuRoleService: MenuRoleService): IMenu {

    const buildConfig: IMenu = {
        text: "Ventas",
        icon: "/assets/img/menu/barras.svg",
        visible: menuRoleService.onVisibleReportes(),
        subitems: [
            {
                text: "Nueva Venta",
                url: "",
                visible: true,
            },
            {
                text: "Registro de ventas",
                url: "",
                visible: true,
            }
        ]
    }

    return buildConfig;

}