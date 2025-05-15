import type { Stat } from "@/types/character";

export const STAT_LABEL: Record<keyof Stat, string> = {
    str: "힘",
    int: "지능",
    dex: "민첩",
};
