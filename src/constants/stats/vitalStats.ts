import {
    VITAL_TYPES,
    type VitalType,
    type VitalWithoutMax,
} from "@/types/characterTypes";

export const VITAL_LABELS: Record<VitalType, string> = {
    [VITAL_TYPES.HP]: "체력",
    [VITAL_TYPES.MAXHP]: "최대 체력",
    [VITAL_TYPES.MP]: "마나",
    [VITAL_TYPES.MAXMP]: "최대 마나",
};

export const DEFAULT_VITAL_MAX_VALUES: Partial<
    Record<keyof VitalWithoutMax, number>
> = {
    hp: 150,
    mp: 150,
};
