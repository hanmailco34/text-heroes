import { JOB_METADATA } from "@/data/jobData";
import {
    COMBAT_STAT_TYPES,
    JOBS,
    type CombatStats,
    type Job,
    type Stat,
} from "@/types/characterTypes";
import { assertNonNegative } from "@/types/nonNegative";

export function calculateCombatStats(job: Job, stats: Stat): CombatStats {
    const initialCombatStats = JOB_METADATA[job].initialCombat;
    const { str, dex, int } = stats;

    switch (job) {
        case JOBS.WARRIOR:
            return {
                [COMBAT_STAT_TYPES.PAPK]: assertNonNegative(
                    initialCombatStats.papk + str * 2 + dex * 1
                ),
                [COMBAT_STAT_TYPES.MAPK]: assertNonNegative(
                    initialCombatStats.mapk + int * 1
                ),
                [COMBAT_STAT_TYPES.DEF]: assertNonNegative(
                    initialCombatStats.def + str * 1 + dex * 0.5
                ),
            };
        case JOBS.MAGE:
            return {
                [COMBAT_STAT_TYPES.PAPK]: assertNonNegative(
                    initialCombatStats.papk + str * 1
                ),
                [COMBAT_STAT_TYPES.MAPK]: assertNonNegative(
                    initialCombatStats.mapk + int * 2
                ),
                [COMBAT_STAT_TYPES.DEF]: assertNonNegative(
                    initialCombatStats.def + int * 0.5 + dex * 0.5
                ),
            };
        case JOBS.ARCHER:
            return {
                [COMBAT_STAT_TYPES.PAPK]: assertNonNegative(
                    initialCombatStats.papk + dex * 2 + str * 1
                ),
                [COMBAT_STAT_TYPES.MAPK]: assertNonNegative(
                    initialCombatStats.mapk + int * 1
                ),
                [COMBAT_STAT_TYPES.DEF]: assertNonNegative(
                    initialCombatStats.def + dex * 1 + str * 0.5
                ),
            };
        default:
            throw new Error(`직업 정보가 없습니다.: ${job}`);
    }
}
