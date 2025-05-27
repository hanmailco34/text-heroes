export type GameStage =
    | "main_menu"
    | "exploring"
    | "inn"
    | "traveling"
    | "shop_active"
    | "saving_game"
    | "exiting_game";

type ActionHandler = () => void;

export type ShopStage =
    | "shop_menu"
    | "weapon_list"
    | "armor_list"
    | "consumable_list"
    | "material_list"
    | "blacksmith_list";

export interface MenuItem {
    name: string;
    actionType: "setGameStage" | "runFunction";
    actionValue?: GameStage | ShopStage | ActionHandler;
    disabled?: boolean;
    requiresCharacter?: boolean;
}

// export const MENU_TYPES = {
//     VILLAGE: "village",
//     SHOP: "shop",
//     HUNT: "hunt",
//     MOVEVILLAGE: "movevillage",
// };

// export type MenuType = (typeof MENU_TYPES)[keyof typeof MENU_TYPES];

// export const META_MENU_TYPES = {
//     INVENTORY: "inventory",
//     STATUS: "status",
//     SAVE: "save",
//     SETTINGS: "setting",
// };

// export type MetaMenuType =
//     (typeof META_MENU_TYPES)[keyof typeof META_MENU_TYPES];

// export interface MenuItem {
//     key: string;
//     label: string;
// }

// export const SHOP_MENU_TYPES = {
//     WEAPON: "weapon",
//     ARMOR: "armor",
//     CONSUMABLE: "consumable",
//     MATERIAL: "material",
//     BLACKSMITH: "blacksmith",
// };

// export type ShopMenuType =
//     (typeof SHOP_MENU_TYPES)[keyof typeof SHOP_MENU_TYPES];
