import { IMenu } from "@core/interfaces";
import { MenuRoleService } from "@core/services/menu-role.service";

export function buildConfigAdministracion(menuRoleService: MenuRoleService): IMenu {

    const buildConfig: IMenu = {

        text: "ADMINISTRACIÓN",
        icon: "/assets/img/menu/engranaje.svg",
        visible: menuRoleService.onVisibleAdministracion(),
        url: "administracion",
        subitems: [
            {
                text: "Config. Productos",
                url: "/administracion/configuracion-productos/categorias",
                visible: true,
                subitems: [
                    {
                        text: "Categoria Productos",
                        url: "/administracion/configuracion-productos/categorias",
                        visible: true
                    }
                ]
            },
            {
                text: "Personal",
                url: "/administracion/configuracion-personal/usuarios",
                visible: true,
                subitems: [
                    {
                        text: "Usuarios",
                        url: "/administracion/configuracion-personal/usuarios",
                        visible: true
                    }

                ]
            }

        ]
    }

    return buildConfig;

}
