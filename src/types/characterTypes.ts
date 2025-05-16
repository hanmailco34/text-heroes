import type { NonNegativeNumber } from "./NonNegative";

// 스탯 종류 정의
export const STAT_TYPES = {
    STR: "str",
    DEX: "dex",
    INT: "int",
} as const;
export type StatType = (typeof STAT_TYPES)[keyof typeof STAT_TYPES];

// 직업 정의
export const JOBS = {
    WARRIOR: "warrior",
    MAGE: "mage",
    ARCHER: "archer",
} as const;

export type Job = (typeof JOBS)[keyof typeof JOBS];

// 스탯 정의
export type Stat = Record<StatType, NonNegativeNumber>;

// HP, MP 등 생명력 관련 상태
export interface Vitals {
    hp: NonNegativeNumber;
    maxhp: NonNegativeNumber;
    mp: NonNegativeNumber;
    maxmp: NonNegativeNumber;
}

// 전투 관련 상태 (파생 스탯)
export interface CombatStats {
    papk: NonNegativeNumber;
    mapk: NonNegativeNumber;
    def: NonNegativeNumber;
}

// 직업별 메타데이터
export interface JobDescription {
    label: string;
    lore: string;
    features: string[];
    initialVitals: Omit<Vitals, "hp" | "mp">;
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
        data: Partial<Pick<CharacterState, "gold" | "exp">>
    ) => void;
    resetCharacter: () => void;
    updateStats: (data: Partial<Stat>) => void;
    getStat: () => Stat;
    levelUp: () => void;
}
