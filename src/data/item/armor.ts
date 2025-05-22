import type { Armor } from "@/types/itemTypes";
import { assertNonNegative } from "@/types/nonNegative";
import { calculateUpgradeCost, DEFAULT_UPGRADE_RATE } from "./upgrade";

export const clothArmor: Armor = {
    id: "arm_cloth_armor",
    name: "천 갑옷",
    type: "armor",
    armorType: "chest",
    rarity: "common",
    description:
        "천으로 제작된 가벼운 방어구. 기본적인 보호 기능을 제공합니다.",
    value: assertNonNegative(45),
    maxUpgradeLevel: assertNonNegative(2),
    currentUpgradeLevel: assertNonNegative(0),
    baseStats: { def: assertNonNegative(3) },
    growthStats: { def: assertNonNegative(2), hp: assertNonNegative(2) },
    requiredLevel: assertNonNegative(1),
    upgradeCost: calculateUpgradeCost(50, "mat_cloth", 1),
    upgradeRate: DEFAULT_UPGRADE_RATE.common,
};
