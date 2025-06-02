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

export const GO_BACK_MENU_ITEM: MenuItem = {
    name: "뒤로 가기 (상점 메뉴)",
    actionType: "setShopStage",
    actionValue: "shop_menu",
};

export const SHOP_MAIN_MENU_CONFIG: MenuItem[] = [
    {
        name: "무기 상점",
        actionType: "setShopStage",
        actionValue: "weapon_list",
    },
    {
        name: "방어구 상점",
        actionType: "setShopStage",
        actionValue: "armor_list",
    },
    {
        name: "소모품 상점",
        actionType: "setShopStage",
        actionValue: "consumable_list",
    },
    {
        name: "재료 상점",
        actionType: "setShopStage",
        actionValue: "material_list",
    },
    {
        name: "대장간",
        actionType: "setShopStage",
        actionValue: "blacksmith_list",
        disabled: true,
    },
    {
        name: "나가기 (마을로)",
        actionType: "setGameStage",
        actionValue: "main_menu",
    },
];
