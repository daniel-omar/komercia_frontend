import { IMenu } from "@core/interfaces";
import { MenuRoleService } from "@core/services/menu-role.service";

export function buildConfigProductos(menuRoleService: MenuRoleService): IMenu {

    const buildConfig: IMenu = {
        text: "Productos",
        icon: "/assets/img/menu/productos.svg",
        visible: menuRoleService.onVisibleProductos(),
        subitems: [
            {
                text: "Creación de códigos de productos",
                url: "/productos/codigo-materiales",
                visible: true
            }
        ]
    }

    return buildConfig;

}
