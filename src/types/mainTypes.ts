export const MENU_TYPES = {
    VILLAGE: "village",
    SHOP: "shop",
    HUNT: "hunt",
};

export type MenuType = (typeof MENU_TYPES)[keyof typeof MENU_TYPES];

export const META_MENU_TYPES = {
    INVENTORY: "inventory",
    STATUS: "status",
    SAVE: "save",
    SETTINGS: "setting",
};

export type MetaMenuType =
    (typeof META_MENU_TYPES)[keyof typeof META_MENU_TYPES];

export interface MenuItem {
    key: string;
    label: string;
}
