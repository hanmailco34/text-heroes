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
} from "../item";
import {
    GREEN_FOREST_VILLAGE_ID,
    YELLOW_FOREST_VILLAGE_ID,
} from "./villageIds";

export const greenForest: VillageType = {
    id: GREEN_FOREST_VILLAGE_ID,
    name: "초록숲 마을",
    description: "푸른 나무가 우거진 마을입니다.",
    connectedVillages: [YELLOW_FOREST_VILLAGE_ID],
    shop: {
        weapon: [woodSword, woodStaff, woodBow],
        armor: [clothArmor],
        consumable: [minorHealPotion, minorManaPotion],
        material: [wood, cloth],
    },
};
