import {
    GO_BACK_MENU_ITEM,
    SHOP_MAIN_MENU_CONFIG,
} from "@/data/menu/menuConfig";
import type { PurchasableItem } from "@/types/itemTypes";
import type { MenuItem, ShopStage } from "@/types/menuTypes";
import { useCallback, useMemo, useState } from "react";
import type { VillageShop } from "@/types/villageTypes";
import { getShopTitle } from "@/utils/shopUtils";
import { transformItemToMenuItem } from "@/utils";
import MenuDisplay from "@/components/ui/MenuDisplay";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

interface ShopScreenProps {
    playerGold: number;
    playerLevel: number;
    currentShopData?: VillageShop;
    onAttemptPurchase: (item: PurchasableItem) => void;
    onExitToMainGame: () => void;
    addLog: (message: string) => void;
}

const ShopScreen: React.FC<ShopScreenProps> = ({
    playerGold,
    playerLevel,
    currentShopData,
    onAttemptPurchase,
    onExitToMainGame,
    addLog,
}) => {
    const [currentInternalStage, setCurrentInternalStage] =
        useState<ShopStage>("shop_menu");

    const displayMenuItems = useMemo((): MenuItem[] => {
        let itemsToConvert: (MenuItem | PurchasableItem)[] = [];
        if (!currentShopData && currentInternalStage !== "shop_menu") {
            itemsToConvert = [GO_BACK_MENU_ITEM];
        } else {
            switch (currentInternalStage) {
                case "shop_menu":
                    itemsToConvert = SHOP_MAIN_MENU_CONFIG.map((menuItem) => {
                        if (menuItem.name === "나가기 (마을로)") {
                            return {
                                ...menuItem,
                                actionType: "runFunction",
                                actionValue: onExitToMainGame,
                            };
                        }
                        let isDisabled = !!menuItem.disabled;
                        if (
                            menuItem.actionType === "setShopStage" &&
                            currentShopData &&
                            typeof menuItem.actionValue === "string" &&
                            menuItem.actionValue !== "shop_menu"
                        ) {
                            const categoryKey = menuItem.actionValue.replace(
                                "_list",
                                ""
                            ) as keyof VillageShop;

                            if (!currentShopData[categoryKey]) {
                                isDisabled = true;
                            }
                        }
                        return { ...menuItem, disabled: isDisabled };
                    });
                    break;
                case "weapon_list":
                    itemsToConvert = [...(currentShopData?.weapon || [])];
                    break;
                case "armor_list":
                    itemsToConvert = [...(currentShopData?.armor || [])];
                    break;
                case "consumable_list":
                    itemsToConvert = [...(currentShopData?.consumable || [])];
                    break;
                case "material_list":
                    itemsToConvert = [...(currentShopData?.material || [])];
                    break;
                default:
                    itemsToConvert = [];
            }

            if (currentInternalStage !== "shop_menu") {
                itemsToConvert.push(GO_BACK_MENU_ITEM);
            }
        }

        return itemsToConvert.map((itemOrMenu) =>
            "actionType" in itemOrMenu
                ? itemOrMenu
                : transformItemToMenuItem(
                      itemOrMenu as PurchasableItem,
                      playerGold,
                      playerLevel
                  )
        );
    }, [
        currentInternalStage,
        currentShopData,
        playerGold,
        playerLevel,
        onExitToMainGame,
    ]);

    const handleMenuItemActivated = useCallback(
        (selectedMenuItem: MenuItem) => {
            addLog(`선택: ${selectedMenuItem.name}`);

            if (selectedMenuItem.actionType === "setShopStage") {
                setCurrentInternalStage(
                    selectedMenuItem.actionValue as ShopStage
                );
            } else if (
                selectedMenuItem.actionType === "runFunction" &&
                typeof selectedMenuItem.actionValue === "function"
            ) {
                selectedMenuItem.actionValue();
            } else if (
                selectedMenuItem.actionType === "purchaseItem" &&
                selectedMenuItem.originalItem
            ) {
                onAttemptPurchase(
                    selectedMenuItem.originalItem as PurchasableItem
                );
            }
        },
        [addLog, onAttemptPurchase]
    );

    const { selectedIndex, handleHover } = useKeyboardNavigation({
        items: displayMenuItems,
        onSelect: handleMenuItemActivated,
        onEscape: () =>
            currentInternalStage === "shop_menu"
                ? onExitToMainGame()
                : handleMenuItemActivated(GO_BACK_MENU_ITEM),
        initialIndex: 0,
    });

    return (
        <div>
            {!currentShopData &&
            currentInternalStage === "shop_menu" &&
            displayMenuItems.length === 0 ? (
                <div className="p-2 text-sm text-[var(--color-brand-green-medium)]">
                    이 마을에는 이용 가능한 상점이 없습니다.
                </div>
            ) : (
                <MenuDisplay
                    title={getShopTitle(currentInternalStage)}
                    items={displayMenuItems}
                    selectedIndex={selectedIndex}
                    onSelectItem={handleMenuItemActivated}
                    onHoverItem={handleHover}
                />
            )}
            {currentInternalStage !== "shop_menu" &&
                displayMenuItems.length === 1 && // "뒤로 가기"만 있는 경우
                displayMenuItems[0].name === GO_BACK_MENU_ITEM.name && (
                    <div className="p-2 text-sm text-[var(--color-brand-green-medium)]">
                        판매하는 물품이 없습니다.
                    </div>
                )}
        </div>
    );
};
export default ShopScreen;
