import { IMenu } from "@core/interfaces";
import { MenuRoleService } from "@core/services/menu-role.service";

export function buildConfigCliente(menuRoleService: MenuRoleService): IMenu {

    const buildConfig: IMenu = {
        text: "Cliente",
        icon: "/assets/img/menu/maletin.svg",
        visible: menuRoleService.onVisibleClientes(),
        subitems: [
            {
                text: "Cartera Asignada",
                url: "/clientes/consulta-clientes",
                visible: true
            }
        ]
    }

    return buildConfig;

}
