import type { Consumable } from "@/types/itemTypes";
import { assertNonNegative } from "@/types/nonNegative";
import { NO_UPGRADE } from "./upgrade";

export const minorHealPotion: Consumable = {
    id: "con_minor_heal",
    name: "소형 치유 물약",
    type: "consumable",
    consumableType: "heal",
    rarity: "common",
    description: "체력을 30 회복시켜주는 기본 물약",
    value: assertNonNegative(20),
    amount: assertNonNegative(30),
    ...NO_UPGRADE,
};

export const minorManaPotion: Consumable = {
    id: "con_minor_mana",
    name: "소형 마나 물약",
    type: "consumable",
    consumableType: "mana",
    rarity: "common",
    description: "마나를 30 회복시켜주는 기본 물약",
    value: assertNonNegative(20),
    amount: assertNonNegative(30),
    ...NO_UPGRADE,
};
