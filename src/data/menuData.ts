import {
    MENU_TYPES,
    META_MENU_TYPES,
    type MenuType,
    type MetaMenuType,
} from "@/types/mainTypes";

export const MENU_LABELS: Record<MenuType, string> = {
    [MENU_TYPES.SHOP]: "상점",
    [MENU_TYPES.HUNT]: "사냥터로 이동",
};

export const META_MENU_LABELS: Record<MetaMenuType, string> = {
    [META_MENU_TYPES.INVENTORY]: "인벤토리",
    [META_MENU_TYPES.STATUS]: "상태",
    [META_MENU_TYPES.SAVE]: "저장",
    [META_MENU_TYPES.SETTINGS]: "설정",
};
