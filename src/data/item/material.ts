import type { Material } from "@/types/itemTypes";
import { assertNonNegative } from "@/types/nonNegative";
import { NO_UPGRADE } from "./upgrade";

export const wood: Material = {
    id: "mat_wood",
    name: "단단한 나무",
    type: "material",
    materialType: "crafting",
    tier: 1,
    isEnhancementMaterial: true,
    rarity: "common",
    description: "무기 제작 및 강화에 사용되는 나무 재료",
    value: assertNonNegative(8),
    ...NO_UPGRADE,
};

export const cloth: Material = {
    id: "mat_cloth",
    name: "질긴 천",
    type: "material",
    materialType: "crafting",
    tier: 1,
    isEnhancementMaterial: true,
    rarity: "common",
    description: "방어구 제작 및 강화에 사용되는 천 재료",
    value: assertNonNegative(8),
    ...NO_UPGRADE,
};
