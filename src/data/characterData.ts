import {
    COMBAT_STAT_TYPES,
    STAT_TYPES,
    VITAL_TYPES,
    type CharacterState,
} from '@/types/characterTypes';
import { assertNonNegative } from '@/types/nonNegative';

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
        [VITAL_TYPES.HP]: assertNonNegative(0),
        [VITAL_TYPES.MAXHP]: assertNonNegative(0),
        [VITAL_TYPES.MP]: assertNonNegative(0),
        [VITAL_TYPES.MAXMP]: assertNonNegative(0),
    },
    combat: {
        [COMBAT_STAT_TYPES.PAPK]: assertNonNegative(0),
        [COMBAT_STAT_TYPES.MAPK]: assertNonNegative(0),
        [COMBAT_STAT_TYPES.DEF]: assertNonNegative(0),
    },
    statPoints: 0,
    level: 1,
    gold: 0,
    exp: { current: 0, max: 100 },
};
