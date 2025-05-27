import { SHOP_MAIN_MENU_CONFIG } from "@/data/menuData";
import type { PurchasableItem } from "@/types/itemTypes";
import type { MenuItem, ShopStage } from "@/types/menuTypes";
import { useCallback, useState } from "react";
import type { VillageShop } from "@/types/villageTypes";

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
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const getDisplayableData = useCallback(():
        | MenuItem[]
        | PurchasableItem[] => {
        if (!currentShopData && currentInternalStage !== "shop_menu") {
            return [];
        }

        switch (currentInternalStage) {
            case "shop_menu":
                return SHOP_MAIN_MENU_CONFIG.map((item) => ({
                    ...item,
                    disabled:
                        item.actionValue !== "main_menu" &&
                        currentShopData &&
                        item.actionValue &&
                        !currentShopData[
                            item.actionValue
                                .toString()
                                .replace("_list", "") as keyof VillageShop
                        ],
                })).filter((item) => !item.disabled);
            case "weapon_list":
                return currentShopData?.weapon || [];
            case "armor_list":
                return currentShopData?.armor || [];
            case "consumable_list":
                return currentShopData?.consumable || [];
            case "material_list":
                return currentShopData?.material || [];
            default:
                return [];
        }
    }, [currentInternalStage, currentShopData]);

    const getShopTitle = (): string => {
        switch (currentInternalStage) {
            case "shop_menu":
                return `[상점]`;
            case "weapon_list":
                return `[무기 상점]`;
            case "armor_list":
                return `[방어구 상점]`;
            // TODO: 다른 상점 타이틀
            default:
                return "[상점]";
        }
    };

    const getItemDisplayString = (itemData: PurchasableItem): string => {
        let details = "";
        if (itemData.type === "weapon" || itemData.type === "armor") {
            const stats = [];
            if (itemData.baseStats.papk)
                stats.push(`물리공격 +${itemData.baseStats.papk}`);
            if (itemData.baseStats.mapk)
                stats.push(`마법공격 +${itemData.baseStats.mapk}`);
            if (itemData.baseStats.def)
                stats.push(`방어력 +${itemData.baseStats.def}`);
            details = stats.join(", ");
            if (itemData.requiredLevel > 0) {
                details += ` (요구 Lv.${itemData.requiredLevel})`;
            }
        } else if (itemData.type === "consumable") {
            details = `효과: ${itemData.consumableType} ${itemData.amount}`;
        } else if (itemData.type === "material") {
            details = `재료 (티어 ${itemData.tier})`;
        }
        return `${itemData.name} (${details}) - ${itemData.value}G`;
    };

    const displayData = getDisplayableData();

    const renderDisplayItem = (
        data: MenuItem | PurchasableItem,
        idx: number
    ) => {
        let itemText: string;
        let isMenuItemDisabled = false;
        let canAfford = true;
        let meetsLevelReq = true;

        if ("actionType" in data) {
            itemText = data.name;
            isMenuItemDisabled = !!data.disabled;
        } else {
            itemText = getItemDisplayString(data);
            canAfford = playerGold >= data.value;
            if (data.type === "weapon" || data.type === "armor")
                meetsLevelReq = playerLevel >= data.requiredLevel;
        }

        const finalIsDisabled =
            isMenuItemDisabled ||
            (!("actionType" in data) && (!canAfford || !meetsLevelReq));

        const itemClasses = [
            "cursor-pointer px-2 py-1.5 text-sm sm:text-base rounded hover:bg-[var(--color-brand-green-darker)] transition-colors duration-150",
            selectedItemIndex === idx && !finalIsDisabled
                ? "bg-[var(--color-brand-green-medium)] text-black font-bold animate-flicker-fast"
                : "text-[var(--color-brand-green-light)]",
            finalIsDisabled ? "opacity-50 cursor-not-allowed" : "",
            !("actionType" in data) && !isMenuItemDisabled && !canAfford
                ? "text-red-400"
                : "",
            !("actionType" in data) && !isMenuItemDisabled && !meetsLevelReq
                ? "text-yellow-400"
                : "",
        ]
            .filter(Boolean)
            .join(" ");

        const handleSelect = (index: number) => {
            const selectedData = displayData[index];
            if (!selectedData) return;

            setSelectedItemIndex(0);

            if (currentInternalStage === "shop_menu") {
                const menuItem = selectedData as MenuItem;
                if (menuItem.disabled) {
                    addLog(
                        `현재 마을에서는 ${menuItem.name}을(를) 이용할 수 없습니다.`
                    );
                    return;
                }
                if (
                    menuItem.actionType === "setGameStage" &&
                    menuItem.actionValue
                ) {
                    if (menuItem.actionValue === "main_menu") {
                        onExitToMainGame();
                    } else {
                        const category = menuItem.actionValue
                            .toString()
                            .replace("_list", "") as keyof VillageShop;
                        if (
                            currentShopData &&
                            currentShopData[category] &&
                            (currentShopData[category] as PurchasableItem[])
                                .length > 0
                        ) {
                            setCurrentInternalStage(
                                menuItem.actionValue as ShopStage
                            );
                        }
                    }
                }
            } else if (
                [
                    "weapon_list",
                    "armor_list",
                    "consumable_list",
                    "material_list",
                ].includes(currentInternalStage)
            ) {
                const item = selectedData as PurchasableItem;
                onAttemptPurchase(item);
            }
        };

        return (
            <div
                key={`${currentInternalStage}-${
                    "id" in data ? data.id : data.name
                }-${idx}`}
                className={itemClasses}
                onClick={() => {
                    if (!finalIsDisabled) {
                        setSelectedItemIndex(idx);
                        handleSelect(idx);
                    }
                }}
                onMouseEnter={() => {
                    if (!finalIsDisabled) setSelectedItemIndex(idx);
                }}
            >
                {selectedItemIndex === idx && !finalIsDisabled ? "▶" : "  "}{" "}
                {itemText}
            </div>
        );
    };

    return (
        <div>
            <h3 className="font-bold text-sm sm:text-base mb-1 text-[var(--color-brand-green-light)]">
                {getShopTitle()}
                {!currentShopData && currentInternalStage === "shop_menu" ? (
                    <p className="text-sm text-[var(--color-brand-green-medium)]">
                        이 마을에는 이용 가능한 상점이 없습니다.
                    </p>
                ) : displayData.length > 0 ? (
                    displayData.map(renderDisplayItem)
                ) : (
                    <p className="text-sm text-[var(--color-brand-green-medium)]">
                        {currentInternalStage === "shop_menu" && currentShopData
                            ? "이용 가능한 상점이 없습니다."
                            : "판매하는 물품이 없습니다."}
                    </p>
                )}
            </h3>
        </div>
    );
};
export default ShopScreen;
