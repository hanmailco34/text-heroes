import type { PurchasableItem } from "./itemTypes";

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

// MenuItem의 actionType에 따라 actionValue의 타입을 구체화하기 위한 기본 구조들
interface BaseMenuAction {
    name: string;
    disabled?: boolean;
    requiresCharacter?: boolean; // 이 메뉴를 보거나 사용하기 위해 캐릭터가 필요한지 여부
    icon?: string; // 메뉴 아이콘 (선택적)
    description?: string; // 메뉴 설명 (선택적)
}

// GameStage를 변경하는 액션
interface SetGameStageAction extends BaseMenuAction {
    actionType: "setGameStage";
    actionValue: GameStage; // GameStage 중 하나로 설정
    // payload?: any; // 스테이지 변경 시 전달할 추가 데이터 (선택적)
}

// ShopStage를 변경하는 액션 (주로 ShopScreen 내부에서 사용)
interface SetShopStageAction extends BaseMenuAction {
    actionType: "setShopStage";
    actionValue: ShopStage; // ShopStage 중 하나로 설정
}

// 특정 함수를 실행하는 액션
interface RunFunctionAction extends BaseMenuAction {
    actionType: "runFunction";
    actionValue: ActionHandler; // 실행할 함수
}

// 아이템 구매를 시도하는 액션 (주로 ShopScreen의 아이템 리스트에서 사용)
interface PurchaseItemAction extends BaseMenuAction {
    actionType: "purchaseItem";
    actionValue: string; // 구매할 아이템의 ID
    originalItem?: PurchasableItem;
}

// 아이템 상세 정보를 보여주는 액션 (예시)
interface ShowItemDetailAction extends BaseMenuAction {
    actionType: "showItemDetail";
    actionValue: string; // 상세 정보를 보여줄 아이템 ID
}

// 메뉴 아이템 타입 (위의 구체적인 액션 타입들의 유니온)
export type MenuItem =
    | SetGameStageAction
    | SetShopStageAction
    | RunFunctionAction
    | PurchaseItemAction
    | ShowItemDetailAction; // 필요에 따라 더 많은 액션 타입 추가 가능
