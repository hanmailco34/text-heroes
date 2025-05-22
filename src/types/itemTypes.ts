import type { NonNegativeNumber } from "./nonNegative";

type ItemType = "weapon" | "armor" | "accessory" | "consumable" | "material";
type ItemRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";
type WeaponType =
    | "sword"
    | "axe"
    | "staff"
    | "wand"
    | "bow"
    | "dagger"
    | "hammer"
    | "spear";
type ArmorType = "helmet" | "chest" | "gloves" | "boots" | "shield";
type AccessoryType = "ring" | "necklace" | "belt" | "earring";
type ConsumableType = "heal" | "mana";
type MaterialType =
    | "ore"
    | "gem"
    | "herb"
    | "monsterPart"
    | "essence"
    | "crafting";

type CombatStats = {
    papk?: number;
    mapk?: number;
    def?: number;
};

type GrowthStats = CombatStats & {
    hp?: number;
    mp?: number;
};

interface UpgradeCost {
    gold: NonNegativeNumber;
    materials?: {
        itemId: string;
        amount: NonNegativeNumber;
    }[];
}

interface UpgradeRate {
    baseRate: number; // 기본 성공률 (0~1)
    decreasePerLevel?: number; // 레벨당 성공률 감소량
    minRate?: number; // 최소 성공률
}

export interface BaseItem<T extends ItemType> {
    id: string;
    name: string;
    description: string;
    type: T;
    rarity: ItemRarity;
    value: NonNegativeNumber;
    maxUpgradeLevel: NonNegativeNumber;
    currentUpgradeLevel: NonNegativeNumber;
    upgradeCost: (level: number) => UpgradeCost;
    upgradeRate: UpgradeRate;
}

export interface Weapon extends BaseItem<"weapon"> {
    weaponType: WeaponType;
    baseStats: CombatStats;
    growthStats: GrowthStats;
    requiredLevel: NonNegativeNumber;
}

export interface Armor extends BaseItem<"armor"> {
    armorType: ArmorType;
    baseStats: CombatStats;
    growthStats: GrowthStats;
    requiredLevel: NonNegativeNumber;
}

export interface Accessory extends BaseItem<"accessory"> {
    accessoryType: AccessoryType;
    baseStats: CombatStats;
    growthStats: GrowthStats;
    requiredLevel: NonNegativeNumber;
}

export interface Consumable extends BaseItem<"consumable"> {
    consumableType: ConsumableType;
    amount: NonNegativeNumber;
}

export interface Material extends BaseItem<"material"> {
    materialType: MaterialType;
    tier: 1 | 2 | 3 | 4 | 5;
    isEnhancementMaterial: boolean;
}
