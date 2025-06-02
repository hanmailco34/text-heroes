import { STAT_TYPES, type Stat } from "@/types/characterTypes";

export const STAT_LABELS: Record<keyof Stat, string> = {
    [STAT_TYPES.STR]: "힘",
    [STAT_TYPES.DEX]: "민첩",
    [STAT_TYPES.INT]: "지능",
};

export const DEFAULT_STAT_MAX_VALUES: Partial<Record<keyof Stat, number>> = {
    str: 15,
    dex: 15,
    int: 15,
};
