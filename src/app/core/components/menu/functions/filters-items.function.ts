import { IMenu, IMenuSubitem } from "@core/interfaces";

function filterVisibleSubitems(subitems: IMenuSubitem[]): IMenuSubitem[] {
    return subitems
        .filter(subitem => subitem.visible)
        .map(subitem => {
            if (subitem.subitems) {
                subitem.subitems = filterVisibleSubitems(subitem.subitems);
            }
            return subitem;
        });
}

export function getVisibleMenuItems(menuItems: IMenu[]): IMenu[] {
    return menuItems
        .filter(item => item.visible)
        .map(item => {
            item.subitems = filterVisibleSubitems(item.subitems);
            return item;
        });
}