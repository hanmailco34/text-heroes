import type { NonNegativeNumber } from './nonNegative';

// 캐릭터 스탯
export const STAT_TYPES = {
    STR: 'str',
    DEX: 'dex',
    INT: 'int',
} as const;
export type StatType = (typeof STAT_TYPES)[keyof typeof STAT_TYPES];

// 생명력 관련 스탯
export const VITAL_TYPES = {
    HP: 'hp',
    MAXHP: 'maxhp',
    MP: 'mp',
    MAXMP: 'maxmp',
} as const;
export type VitalType = (typeof VITAL_TYPES)[keyof typeof VITAL_TYPES];

// 전투 관련 스탯
export const COMBAT_STAT_TYPES = {
    PAPK: 'papk',
    MAPK: 'mapk',
    DEF: 'def',
} as const;
export type CombatStatType =
    (typeof COMBAT_STAT_TYPES)[keyof typeof COMBAT_STAT_TYPES];

// 직업 정의
export const JOBS = {
    WARRIOR: 'warrior',
    MAGE: 'mage',
    ARCHER: 'archer',
} as const;
export type Job = (typeof JOBS)[keyof typeof JOBS];

// 스탯 정의
export type Stat = Record<StatType, NonNegativeNumber>;
export type Vital = Record<VitalType, NonNegativeNumber>;
export type CombatStat = Record<CombatStatType, NonNegativeNumber>;

// HP, MP 등 생명력 관련 상태
export interface Vitals {
    [VITAL_TYPES.HP]: NonNegativeNumber;
    [VITAL_TYPES.MAXHP]: NonNegativeNumber;
    [VITAL_TYPES.MP]: NonNegativeNumber;
    [VITAL_TYPES.MAXMP]: NonNegativeNumber;
}

// 전투 관련 상태 (파생 스탯)
export interface CombatStats {
    [COMBAT_STAT_TYPES.PAPK]: NonNegativeNumber;
    [COMBAT_STAT_TYPES.MAPK]: NonNegativeNumber;
    [COMBAT_STAT_TYPES.DEF]: NonNegativeNumber;
}

// 직업별 메타데이터
export interface JobDescription {
    label: string;
    lore: string;
    features: string[];
    initialVitals: Omit<Vitals, typeof VITAL_TYPES.HP | typeof VITAL_TYPES.MP>;
    initialStats: Stat;
    initialCombat: CombatStats;
    targetRatio: Stat;
}

// 캐릭터 상태 정의
export interface CharacterState {
    name: string | null;
    job: Job | null;
    stats: Stat;
    vitals: Vitals;
    combat: CombatStats;
    statPoints: number;
    level: number;
    gold: number;
    exp: { current: number; max: number };
}

export interface CharacterStore extends CharacterState {
    setCharacterInfo: (data: Partial<CharacterState>) => void;
    updateVitals: (data: Partial<Vitals>) => void;
    updateResources: (
        data: Partial<Pick<CharacterState, 'gold' | 'exp'>>
    ) => void;
    resetCharacter: () => void;
    updateStats: (data: Partial<Stat>) => void;
    getStat: () => Stat;
    levelUp: () => void;
}
