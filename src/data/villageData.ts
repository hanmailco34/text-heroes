import type { VillageType } from "@/types/villageTypes";
import {
    cloth,
    clothArmor,
    minorHealPotion,
    minorManaPotion,
    wood,
    woodBow,
    woodStaff,
    woodSword,
} from "./item";

export const greenForestVillageId = "greenForest";
export const yellowForestVillageId = "yellowForest";

const greenForest: VillageType = {
    id: greenForestVillageId,
    name: "초록숲 마을",
    description: "푸른 나무가 우거진 마을입니다.",
    connectedVillages: [yellowForestVillageId],
    shop: {
        weapon: [woodSword, woodStaff, woodBow],
        armor: [clothArmor],
        consumable: [minorHealPotion, minorManaPotion],
        material: [wood, cloth],
    },
};

const yellowForest: VillageType = {
    id: yellowForestVillageId,
    name: "노랑숲 마을",
    description: "노랑 나무가 우거진 마을입니다.",
    connectedVillages: [greenForestVillageId],
};

export const VILLAGES: { [key: string]: VillageType } = {
    [greenForestVillageId]: greenForest,
    [yellowForestVillageId]: yellowForest,
};
