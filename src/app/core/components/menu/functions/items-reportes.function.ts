import { IMenu } from "@core/interfaces";
import { MenuRoleService } from "@core/services/menu-role.service";

export function buildConfigReportes(menuRoleService: MenuRoleService): IMenu {

    const buildConfig: IMenu = {
        text: "Reportes",
        icon: "/assets/img/menu/barras.svg",
        visible: menuRoleService.onVisibleReportes(),
        subitems: [
            {
                text: "Reporte Ventas",
                url: "/reportes/reporte-ventas",
                visible: true
            }

        ]
    }

    return buildConfig;

}