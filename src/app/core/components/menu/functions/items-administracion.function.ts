import { IMenu } from "@core/interfaces";
import { MenuRoleService } from "@core/services/menu-role.service";

export function buildConfigAdministracion(menuRoleService: MenuRoleService): IMenu {

    const buildConfig: IMenu = {

        text: "ADMINISTRACIÓN",
        icon: "/assets/img/menu/Gears.svg",
        visible: menuRoleService.onVisibleAdministracion(),
        subitems: [
            {
                text: "Config. Productos",
                url: "",
                visible: true,
                subitems: [
                    {
                        text: "Categoria Productos",
                        url: "/administracion/productos/categoria",
                        visible: false
                    }
                ]
            },
            {
                text: "Datos Generales",
                url: "",
                visible: true,
                subitems: [
                    {
                        text: "Configuración",
                        url: "/administracion/datos-generales/tipo-usuario",
                        visible: true
                    }

                ]
            }

        ]
    }

    return buildConfig;

}
