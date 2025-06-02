import type { VillageType } from "@/types/villageTypes";
import {
    GREEN_FOREST_VILLAGE_ID,
    YELLOW_FOREST_VILLAGE_ID,
} from "./villageIds";

export const yellowForest: VillageType = {
    id: YELLOW_FOREST_VILLAGE_ID,
    name: "노랑숲 마을",
    description: "노랑 나무가 우거진 마을입니다.",
    connectedVillages: [GREEN_FOREST_VILLAGE_ID],
};
