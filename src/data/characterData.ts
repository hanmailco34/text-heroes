import { STAT_TYPES, type CharacterState } from "@/types/CharacterTypes";
import { assertNonNegative } from "@/types/NonNegative";

// 초기 상태 정의
export const INITIAL_STATE: CharacterState = {
    name: null,
    job: null,
    stats: {
        [STAT_TYPES.STR]: assertNonNegative(0),
        [STAT_TYPES.DEX]: assertNonNegative(0),
        [STAT_TYPES.INT]: assertNonNegative(0),
    },
    vitals: {
        hp: assertNonNegative(0),
        maxhp: assertNonNegative(0),
        mp: assertNonNegative(0),
        maxmp: assertNonNegative(0),
    },
    combat: {
        papk: assertNonNegative(0),
        mapk: assertNonNegative(0),
        def: assertNonNegative(0),
    },
    statPoints: 0,
    level: 1,
    gold: 0,
    exp: { current: 0, max: 100 },
};
