import {
    COMBAT_STAT_TYPES,
    type CombatStatType,
    type Stat,
    STAT_TYPES,
    VITAL_TYPES,
    type VitalType,
} from '@/types/characterTypes';

export const STAT_LABELS: Record<keyof Stat, string> = {
    [STAT_TYPES.STR]: '힘',
    [STAT_TYPES.DEX]: '민첩',
    [STAT_TYPES.INT]: '지능',
};

export const VITAL_LABELS: Record<VitalType, string> = {
    [VITAL_TYPES.HP]: '체력',
    [VITAL_TYPES.MAXHP]: '최대 체력',
    [VITAL_TYPES.MP]: '마나',
    [VITAL_TYPES.MAXMP]: '최대 마나',
};

export const COMBAT_STAT_LABELS: Record<CombatStatType, string> = {
    [COMBAT_STAT_TYPES.PAPK]: '물리 공격력',
    [COMBAT_STAT_TYPES.MAPK]: '마법 공격력',
    [COMBAT_STAT_TYPES.DEF]: '방어력',
};
