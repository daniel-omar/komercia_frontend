import { IMenu } from "@core/interfaces";
import { MenuRoleService } from "@core/services/menu-role.service";

export function buildConfigProductos(menuRoleService: MenuRoleService): IMenu {

    const buildConfig: IMenu = {
        text: "Productos",
        icon: "/assets/img/menu/productos.svg",
        visible: menuRoleService.onVisibleProductos(),
        url: "productos",
        subitems: [
            {
                text: "Creación de producto",
                url: "/productos/nuevo-producto",
                visible: true
            },
            {
                text: "Listado de productos",
                url: "/productos/listado-productos",
                visible: true
            },
            {
                text: "Creación masiva de productos",
                url: "/productos/carga-productos",
                visible: true
            }
        ]
    }

    return buildConfig;

}
