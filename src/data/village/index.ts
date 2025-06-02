import type { VillageType } from "@/types/villageTypes";
import { greenForest } from "./greentForest";
import { yellowForest } from "./yellowForest";
import {
    GREEN_FOREST_VILLAGE_ID,
    YELLOW_FOREST_VILLAGE_ID,
} from "./villageIds";

export const VILLAGES: { [key: string]: VillageType } = {
    [GREEN_FOREST_VILLAGE_ID]: greenForest,
    [YELLOW_FOREST_VILLAGE_ID]: yellowForest,
};
