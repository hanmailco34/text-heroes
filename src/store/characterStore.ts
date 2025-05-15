import type { CharacterStore, Status } from "@/types/character";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultStatus: Status = {
    maxhp: 0,
    maxmp: 0,
    str: 0,
    dex: 0,
    int: 0,
    atk: 0,
    def: 0,
};

const useCharacterStore = create<CharacterStore>()(
    persist(
        (set, get) => ({
            name: null,
            job: null,
            status: { ...defaultStatus },
            level: 1,
            gold: 0,
            hp: 0,
            mp: 0,
            exp: 0,
            maxExp: 0,
            hasCharacter: false,
            setCharacterInfo: (data) =>
                set((state) => ({
                    ...state,
                    ...data,
                    status: data.status
                        ? { ...state.status, ...data.status }
                        : state.status,
                    hasCharacter: true,
                })),
            updateCharacter: (data) => {
                const state = get();

                set({
                    hp: Math.min(
                        Math.max(0, state.hp + (data.hp ?? 0)),
                        state.status.maxhp
                    ),
                    mp: Math.min(
                        Math.max(0, state.mp + (data.mp ?? 0)),
                        state.status.maxmp
                    ),
                    gold: Math.max(0, state.gold + (data.gold ?? 0)),
                    exp: Math.max(0, state.exp + (data.exp ?? 0)),
                });
            },
            resetCharacter: () =>
                set({
                    name: null,
                    job: null,
                    status: { ...defaultStatus },
                    level: 1,
                    gold: 0,
                    exp: 0,
                    maxExp: 100,
                    hasCharacter: false,
                }),
            updateCharacterStatus: (data) => {
                const state = get();
                const newStatus = { ...state.status };
                for (const key in data) {
                    const statKey = key as keyof Status;
                    const current = state.status[statKey];
                    const change = data[statKey];

                    if (
                        typeof current === "number" &&
                        typeof change === "number"
                    ) {
                        newStatus[statKey] = current + change;
                    }
                }
                set({ status: newStatus });
            },
        }),
        {
            name: "character-storage",
            partialize: (state) => ({
                name: state.name,
                job: state.job,
                status: state.status,
                level: state.level,
                gold: state.gold,
                hp: state.hp,
                mp: state.mp,
                exp: state.exp,
                maxExp: state.maxExp,
                hasCharacter: state.hasCharacter,
            }),
        }
    )
);

export default useCharacterStore;
