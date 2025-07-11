import { IMenu } from "@core/interfaces";
import { MenuRoleService } from "@core/services/menu-role.service";

export function buildConfigAdministracion(menuRoleService: MenuRoleService): IMenu {

    const buildConfig: IMenu = {

        text: "ADMINISTRACIÓN",
        icon: "/assets/img/menu/engranaje.svg",
        visible: menuRoleService.onVisibleAdministracion(),
        subitems: [
            {
                text: "Config. Productos",
                url: "",
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
                url: "",
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
