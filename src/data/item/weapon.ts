import type { Weapon } from "@/types/itemTypes";
import { assertNonNegative } from "@/types/nonNegative";
import { calculateUpgradeCost, DEFAULT_UPGRADE_RATE } from "./upgrade";

export const woodSword: Weapon = {
    id: "wpn_black_wood_sword",
    name: "나무검",
    type: "weapon",
    weaponType: "sword",
    rarity: "common",
    description: "나무로 만들어진 초보자용 검. 가볍고 다루기 쉽습니다.",
    value: assertNonNegative(35),
    maxUpgradeLevel: assertNonNegative(3),
    currentUpgradeLevel: assertNonNegative(0),
    baseStats: { papk: assertNonNegative(6) },
    growthStats: { papk: assertNonNegative(2), hp: assertNonNegative(3) },
    requiredLevel: assertNonNegative(1),
    upgradeCost: calculateUpgradeCost(60, "mat_wood", 1),
    upgradeRate: DEFAULT_UPGRADE_RATE.common,
};

export const woodStaff: Weapon = {
    id: "wpn_wood_staff",
    name: "나무 지팡이",
    type: "weapon",
    weaponType: "staff",
    rarity: "common",
    description: "마법 수련용으로 사용되는 단단한 나무 지팡이.",
    value: assertNonNegative(40),
    maxUpgradeLevel: assertNonNegative(3),
    currentUpgradeLevel: assertNonNegative(0),
    baseStats: { mapk: assertNonNegative(7) },
    growthStats: { mapk: assertNonNegative(2), mp: assertNonNegative(4) },
    requiredLevel: assertNonNegative(1),
    upgradeCost: calculateUpgradeCost(70, "mat_wood", 1),
    upgradeRate: DEFAULT_UPGRADE_RATE.common,
};

export const woodBow: Weapon = {
    id: "wpn_wood_bow",
    name: "나무 활",
    type: "weapon",
    weaponType: "bow",
    rarity: "common",
    description: "간단한 나무 활. 가까운 거리에서 효과적입니다.",
    value: assertNonNegative(38),
    maxUpgradeLevel: assertNonNegative(3),
    currentUpgradeLevel: assertNonNegative(0),
    baseStats: { papk: assertNonNegative(5) },
    growthStats: { papk: assertNonNegative(1), def: assertNonNegative(1) },
    requiredLevel: assertNonNegative(1),
    upgradeCost: calculateUpgradeCost(65, "mat_wood", 1),
    upgradeRate: DEFAULT_UPGRADE_RATE.common,
};
