import type { Weapon, Armor, Consumable, Material } from "@/types/itemTypes";
import { assertNonNegative } from "@/types/nonNegative";
import {
    DEFAULT_UPGRADE_RATE,
    calculateUpgradeCost,
    NO_UPGRADE,
} from "@/data/constants";

// 전사 초보자 장비
const ironSword: Weapon = {
    id: "wpn_iron_sword",
    name: "녹슨 철검",
    type: "weapon",
    weaponType: "sword",
    rarity: "common",
    description: "초보 전사용 기본 검. 약간 녹이 슬어있지만 쓸만합니다.",
    value: assertNonNegative(50),
    maxUpgradeLevel: assertNonNegative(3),
    currentUpgradeLevel: assertNonNegative(0),
    baseStats: { papk: assertNonNegative(8) },
    growthStats: { papk: assertNonNegative(2), hp: assertNonNegative(5) },
    requiredLevel: assertNonNegative(1),
    upgradeCost: calculateUpgradeCost(100, "mat_iron_ore", 2),
    upgradeRate: DEFAULT_UPGRADE_RATE.common,
    icon: "/assets/items/iron_sword.png",
};

const leatherArmor: Armor = {
    id: "arm_leather",
    name: "가죽 갑옷",
    type: "armor",
    armorType: "chest",
    rarity: "common",
    description: "두꺼운 가죽으로 만든 기본 방어구",
    value: assertNonNegative(80),
    maxUpgradeLevel: assertNonNegative(2),
    currentUpgradeLevel: assertNonNegative(0),
    baseStats: { def: assertNonNegative(5) },
    growthStats: { def: assertNonNegative(3) },
    requiredLevel: assertNonNegative(1),
    upgradeCost: (level: number) => ({
        gold: assertNonNegative(80 * (level + 1)),
        materials: [
            {
                itemId: "mat_leather",
                amount: assertNonNegative(1 * (level + 1)),
            },
        ],
    }),
    upgradeRate: { baseRate: 0.85, decreasePerLevel: 0.15, minRate: 0.5 },
    icon: "/assets/armors/leather_armor.png",
};

// 마법사 초보자 장비
const apprenticeStaff: Weapon = {
    id: "wpn_apprentice_staff",
    name: "수습 지팡이",
    type: "weapon",
    weaponType: "staff",
    rarity: "common",
    description: "마법을 배우기 시작한 이들을 위한 기본 지팡이",
    value: assertNonNegative(60),
    maxUpgradeLevel: assertNonNegative(3),
    currentUpgradeLevel: assertNonNegative(0),
    baseStats: { mapk: assertNonNegative(10) },
    growthStats: { mapk: assertNonNegative(3), mp: assertNonNegative(5) },
    requiredLevel: assertNonNegative(1),
    upgradeCost: calculateUpgradeCost(120, "mat_wood", 2), // 재료 수량 조정 (3 → 2)
    upgradeRate: DEFAULT_UPGRADE_RATE.uncommon,
    icon: "/assets/items/apprentice_staff.png",
};

// 궁수 초보자 장비
const shortBow: Weapon = {
    id: "wpn_short_bow",
    name: "단순한 활",
    type: "weapon",
    weaponType: "bow",
    rarity: "common",
    description: "기본 사냥용 활. 정확도는 떨어지지만 쏠 수는 있습니다.",
    value: assertNonNegative(70),
    maxUpgradeLevel: assertNonNegative(3),
    currentUpgradeLevel: assertNonNegative(0),
    baseStats: { papk: assertNonNegative(6) },
    growthStats: { papk: assertNonNegative(2), def: assertNonNegative(1) },
    requiredLevel: assertNonNegative(1),
    upgradeCost: calculateUpgradeCost(90, "mat_string", 1),
    upgradeRate: DEFAULT_UPGRADE_RATE.common,
    icon: "/assets/items/short_bow.png",
};

// 공용 소모품
const minorHealPotion: Consumable = {
    id: "con_minor_heal",
    name: "소형 치유 물약",
    type: "consumable",
    consumableType: "heal",
    rarity: "common",
    description: "체력을 50 회복시켜주는 기본 물약",
    value: assertNonNegative(30),
    amount: assertNonNegative(50),
    maxStack: assertNonNegative(10), // 누락된 속성 추가
    ...NO_UPGRADE,
    icon: "/assets/items/minor_heal_potion.png",
};

// 재료
const manaEssence: Material = {
    id: "mat_mana_essence",
    name: "마나 정수",
    type: "material",
    materialType: "essence",
    rarity: "uncommon",
    description: "기본 마법 강화에 사용되는 정수",
    value: assertNonNegative(25),
    tier: assertNonNegative(1),
    isEnhancementMaterial: true,
    maxStack: assertNonNegative(20), // 누락된 속성 추가
    ...NO_UPGRADE,
    icon: "/assets/items/mana_essence.png",
};

// 상점 판매 목록
export const firstTownShop = {
    weapons: [ironSword, apprenticeStaff, shortBow],
    armors: [leatherArmor],
    consumables: [minorHealPotion],
    materials: [manaEssence],
};
