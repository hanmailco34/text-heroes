import {
    MENU_TYPES,
    META_MENU_TYPES,
    SHOP_MENU_TYPES,
    type MenuType,
    type MetaMenuType,
    type ShopMenuType,
} from "@/types/menuTypes";

export const MENU_LABELS: Record<MenuType, string> = {
    [MENU_TYPES.SHOP]: "상점",
    [MENU_TYPES.HUNT]: "사냥터로 이동",
    [MENU_TYPES.MOVEVILLAGE]: "다른 마을로 이동",
};

export const META_MENU_LABELS: Record<MetaMenuType, string> = {
    [META_MENU_TYPES.INVENTORY]: "인벤토리",
    [META_MENU_TYPES.STATUS]: "상태",
    [META_MENU_TYPES.SAVE]: "저장",
    [META_MENU_TYPES.SETTINGS]: "설정",
};

export const SHOP_MENU_LABELS: Record<ShopMenuType, string> = {
    [SHOP_MENU_TYPES.WEAPON]: "무기 상점",
    [SHOP_MENU_TYPES.ARMOR]: "방어구 상점",
    [SHOP_MENU_TYPES.CONSUMABLE]: "물약 상점",
    [SHOP_MENU_TYPES.MATERIAL]: "재료 상점",
    [SHOP_MENU_TYPES.BLACKSMITH]: "대장간",
};

export const MENU_ICON = {
    [MENU_TYPES.SHOP]: "🏪",
    [MENU_TYPES.HUNT]: "🗺️",
    moveVillage: "🚶‍♂️",
    inventory: "🎒",
    status: "📊",
    settings: "⚙️",
    save: "💾",
    logout: "🚪",
    weapon: "⚔️",
    armor: "🛡️",
    con: "🧪",
    material: "🪵",
    blacksmith: "🛠️",
};
