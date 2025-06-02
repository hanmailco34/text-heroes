import type { PurchasableItem } from "@/types/itemTypes";
import type { MenuItem } from "@/types/menuTypes";

export const transformItemToMenuItem = (
    item: PurchasableItem,
    playerGold: number,
    playerLevel: number
): MenuItem => {
    let nameWithDetails = `${item.name}`;
    const detailsParts: string[] = [];

    if (item.type === "weapon" || item.type === "armor") {
        const stats = [];
        if (item.baseStats.papk) stats.push(`물공+${item.baseStats.papk}`);
        if (item.baseStats.mapk) stats.push(`마공+${item.baseStats.mapk}`);
        if (item.baseStats.def) stats.push(`방어+${item.baseStats.def}`);
        if (stats.length > 0) detailsParts.push(stats.join(", "));
        if (item.requiredLevel > 0)
            detailsParts.push(`요구Lv.${item.requiredLevel}`);
    } else if (item.type === "consumable") {
        detailsParts.push(`효과: ${item.consumableType} ${item.amount}`);
    } else if (item.type === "material") {
        detailsParts.push(`재료 (티어 ${item.tier})`);
    }

    if (detailsParts.length > 0) {
        nameWithDetails += ` (${detailsParts.join(" | ")})`;
    }
    nameWithDetails += ` - ${item.value}G`;

    let isDisabled = false;

    if (playerGold < item.value) {
        isDisabled = true;
    }

    if (!isDisabled && (item.type === "weapon" || item.type === "armor")) {
        if (playerLevel < item.requiredLevel) {
            isDisabled = true;
        }
    }

    return {
        name: nameWithDetails,
        actionType: "purchaseItem",
        actionValue: item.id,
        disabled: isDisabled,
    };
};
