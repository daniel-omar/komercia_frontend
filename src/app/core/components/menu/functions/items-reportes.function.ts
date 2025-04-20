import { IMenu } from "@core/interfaces";
import { MenuRoleService } from "@core/services/menu-role.service";

export function buildConfigReportes(menuRoleService: MenuRoleService): IMenu {

    const buildConfig: IMenu = {
        text: "Reportes",
        icon: "/assets/img/menu/Barras.svg",
        visible: menuRoleService.onVisibleReportes(),
        subitems: [
            {
                text: "Ventas",
                url: "",
                visible: true,
                subitems: [
                    {
                        text: "Reporte Ventas",
                        url: "/reportes/ventas/detallado-ventas",
                        visible: true
                    }
                ]
            }

        ]
    }

    return buildConfig;

}