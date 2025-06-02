import { COMBAT_STAT_TYPES, type CombatStatType } from "@/types/characterTypes";

export const COMBAT_STAT_LABELS: Record<CombatStatType, string> = {
    [COMBAT_STAT_TYPES.PAPK]: "물리 공격력",
    [COMBAT_STAT_TYPES.MAPK]: "마법 공격력",
    [COMBAT_STAT_TYPES.DEF]: "방어력",
};
