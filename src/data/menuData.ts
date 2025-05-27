import type { MenuItem } from "@/types/menuTypes";

export const MAIN_MENU_CONFIG: MenuItem[] = [
    {
        name: "탐험하기",
        actionType: "setGameStage",
        actionValue: "exploring",
    },
    {
        name: "상점",
        actionType: "setGameStage",
        actionValue: "shop_active",
    },
    {
        name: "여관",
        actionType: "setGameStage",
        actionValue: "inn",
    },
    {
        name: "마을 이동",
        actionType: "setGameStage",
        actionValue: "traveling",
    },
    {
        name: "저장하기",
        actionType: "runFunction",
        actionValue: () => console.log("게임 저장 로직 실행!"),
    },
    {
        name: "게임 종료",
        actionType: "runFunction",
        actionValue: () => {
            if (window.confirm("게임을 종료하시겠습니까?")) {
                console.log("게임 종료!");
            }
        },
    },
];

export const SHOP_MAIN_MENU_CONFIG: MenuItem[] = [
    {
        name: "무기 상점",
        actionType: "setGameStage",
        actionValue: "weapon_list",
    },
    {
        name: "방어구 상점",
        actionType: "setGameStage",
        actionValue: "armor_list",
    },
    {
        name: "소모품 상점",
        actionType: "setGameStage",
        actionValue: "consumable_list",
    },
    {
        name: "재료 상점",
        actionType: "setGameStage",
        actionValue: "material_list",
    },
    {
        name: "대장간",
        actionType: "setGameStage",
        actionValue: "blacksmith_list",
        disabled: true,
    },
    {
        name: "나가기 (마을로)",
        actionType: "setGameStage",
        actionValue: "main_menu",
    },
];

// import {
//     MENU_TYPES,
//     META_MENU_TYPES,
//     SHOP_MENU_TYPES,
//     type MenuType,
//     type MetaMenuType,
//     type ShopMenuType,
// } from "@/types/menuTypes";

// export const MENU_LABELS: Record<MenuType, string> = {
//     [MENU_TYPES.SHOP]: "상점",
//     [MENU_TYPES.HUNT]: "사냥터로 이동",
//     [MENU_TYPES.MOVEVILLAGE]: "마을 이동",
// };

// export const META_MENU_LABELS: Record<MetaMenuType, string> = {
//     [META_MENU_TYPES.INVENTORY]: "인벤토리",
//     [META_MENU_TYPES.STATUS]: "상태",
//     [META_MENU_TYPES.SAVE]: "저장",
//     [META_MENU_TYPES.SETTINGS]: "설정",
// };

// export const SHOP_MENU_LABELS: Record<ShopMenuType, string> = {
//     [SHOP_MENU_TYPES.WEAPON]: "무기 상점",
//     [SHOP_MENU_TYPES.ARMOR]: "방어구 상점",
//     [SHOP_MENU_TYPES.CONSUMABLE]: "물약 상점",
//     [SHOP_MENU_TYPES.MATERIAL]: "재료 상점",
//     [SHOP_MENU_TYPES.BLACKSMITH]: "대장간",
// };

// export const MENU_ICON = {
//     [MENU_TYPES.SHOP]: "🏪",
//     [MENU_TYPES.HUNT]: "🗺️",
//     moveVillage: "🚶‍♂️",
//     inventory: "🎒",
//     status: "📊",
//     settings: "⚙️",
//     save: "💾",
//     logout: "🚪",
//     weapon: "⚔️",
//     armor: "🛡️",
//     con: "🧪",
//     material: "🪵",
//     blacksmith: "🛠️",
// };
