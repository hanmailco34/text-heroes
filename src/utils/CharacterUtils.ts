import { JOB_METADATA } from "@/data/JobData";
import {
    JOBS,
    type CharacterState,
    type CombatStats,
    type Job,
    type Stat,
    type Vitals,
} from "@/types/CharacterTypes";
import { assertNonNegative, type NonNegativeNumber } from "@/types/NonNegative";

export const clampValue = (
    value: number,
    min: number,
    max: number
): NonNegativeNumber => assertNonNegative(Math.min(Math.max(min, value), max));

export const updateResource = (
    vitals: Vitals,
    key: keyof Vitals,
    value: number,
    maxKey: keyof Vitals
) => clampValue(vitals[key] + (value ?? 0), 0, vitals[maxKey]);

export const updateResources = (
    state: CharacterState,
    data: Partial<Pick<CharacterState, "gold" | "exp">>
) => ({
    gold: clampValue(state.gold + (data.gold ?? 0), 0, Infinity),
    exp: {
        current: clampValue(
            state.exp.current + (data.exp?.current ?? 0),
            0,
            state.exp.max
        ),
        max: state.exp.max,
    },
});

export function calculateCombatStats(job: Job, stats: Stat): CombatStats {
    const initialCombatStats = JOB_METADATA[job].initialCombat;
    const { str, dex, int } = stats;

    switch (job) {
        case JOBS.WARRIOR:
            return {
                papk: assertNonNegative(
                    initialCombatStats.papk + str * 2 + dex * 1
                ),
                mapk: assertNonNegative(initialCombatStats.mapk + int * 1),
                def: assertNonNegative(
                    initialCombatStats.def + str * 1 + dex * 0.5
                ),
            };
        case JOBS.MAGE:
            return {
                papk: assertNonNegative(initialCombatStats.papk + str * 1),
                mapk: assertNonNegative(initialCombatStats.mapk + int * 2),
                def: assertNonNegative(
                    initialCombatStats.def + int * 0.5 + dex * 0.5
                ),
            };
        case JOBS.ARCHER:
            return {
                papk: assertNonNegative(
                    initialCombatStats.papk + dex * 2 + str * 1
                ),
                mapk: assertNonNegative(initialCombatStats.mapk + int * 1),
                def: assertNonNegative(
                    initialCombatStats.def + dex * 1 + str * 0.5
                ),
            };
        default:
            throw new Error(`직업 정보가 없습니다.: ${job}`);
    }
}
