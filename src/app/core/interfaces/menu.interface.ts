export interface IMenu {
    text: string;
    icon: string;
    subitems: IMenuSubitem[];
    visible: boolean;
    url: string;
}

export interface IMenuSubitem {
    text: string;
    url: string;
    visible: boolean;
    subitems?: IMenuSubitem[];
}
