import { SHOP_TITLES } from "@/constants/shop";
import type { ShopStage } from "@/types/menuTypes";

export const getShopTitle = (currentInternalStage: ShopStage): string => {
    switch (currentInternalStage) {
        case "shop_menu":
            return SHOP_TITLES.MAIN;
        case "weapon_list":
            return SHOP_TITLES.WEAPON;
        case "armor_list":
            return SHOP_TITLES.ARMOR;
        case "consumable_list":
            return SHOP_TITLES.CONSUMABLE;
        case "material_list":
            return SHOP_TITLES.MATERIAL;
        default:
            return SHOP_TITLES.MAIN;
    }
};
