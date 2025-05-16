import { INITIAL_STATE } from "@/data/CharacterData";

import {
    STAT_TYPES,
    type CharacterStore,
    type StatType,
} from "@/types/CharacterTypes";
import { assertNonNegative } from "@/types/NonNegative";
import {
    calculateCombatStats,
    clampValue,
    updateResource,
    updateResources,
} from "@/utils/CharacterUtils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 상수 정의
const LEVEL_UP_STAT_POINTS = 5;

const useCharacterStore = create<CharacterStore>()(
    persist(
        (set, get) => ({
            ...INITIAL_STATE,
            setCharacterInfo: (data) =>
                set((state) => {
                    const mergedStats = data.stats
                        ? { ...state.stats, ...data.stats }
                        : state.stats;
                    return {
                        ...state,
                        ...data,
                        stats: data.stats
                            ? { ...state.stats, ...data.stats }
                            : state.stats,
                        vitals: data.vitals
                            ? {
                                  ...state.vitals,
                                  ...data.vitals,
                                  hp: clampValue(
                                      data.vitals.hp ?? state.vitals.hp,
                                      0,
                                      state.vitals.maxhp
                                  ),
                                  mp: clampValue(
                                      data.vitals.mp ?? state.vitals.mp,
                                      0,
                                      state.vitals.maxmp
                                  ),
                              }
                            : state.vitals,
                        combat: state.job
                            ? calculateCombatStats(state.job, mergedStats)
                            : state.combat,
                    };
                }),
            updateVitals: (data) =>
                set((state) => ({
                    vitals: {
                        ...state.vitals,
                        hp: updateResource(
                            state.vitals,
                            "hp",
                            data.hp ?? 0,
                            "maxhp"
                        ),
                        mp: updateResource(
                            state.vitals,
                            "mp",
                            data.mp ?? 0,
                            "maxmp"
                        ),
                    },
                })),
            updateResources: (data) =>
                set((state) => ({
                    ...state,
                    ...updateResources(state, data),
                })),
            resetCharacter: () => set(() => ({ ...INITIAL_STATE })),
            updateStats: (data) => {
                const state = get();
                const newStats = { ...state.stats };
                let totalIncrease = 0;

                for (const key in data) {
                    const statKey = key as StatType;
                    if (statKey in STAT_TYPES) {
                        const change = data[statKey];
                        if (typeof change === "number" && change < 0) {
                            throw new Error(
                                "스탯은 음수로 감소시킬 수 없습니다."
                            );
                        }
                        totalIncrease += change ?? 0;
                        newStats[statKey] = assertNonNegative(
                            (newStats[statKey] ?? 0) + (change ?? 0)
                        );
                    }
                }

                if (state.statPoints < totalIncrease) {
                    throw new Error("스탯 포인트가 부족합니다.");
                }

                set({
                    stats: newStats,
                    statPoints: state.statPoints - totalIncrease,
                    combat: state.job
                        ? calculateCombatStats(state.job, newStats)
                        : state.combat,
                });
            },
            getStat: () => {
                const state = get();
                return { ...state.stats };
            },
            levelUp: () => {
                const state = get();
                set({
                    level: state.level + 1,
                    statPoints: state.statPoints + LEVEL_UP_STAT_POINTS,
                    exp: { current: 0, max: state.exp.max + 50 },
                });
            },
        }),
        {
            name: "character-storage",
            partialize: (state) => ({
                name: state.name,
                job: state.job,
                stats: state.stats,
                vitals: state.vitals,
                combat: state.combat,
                statPoints: state.statPoints,
                level: state.level,
                gold: state.gold,
                exp: state.exp,
                maxExp: state.exp.max,
            }),
        }
    )
);

export default useCharacterStore;
