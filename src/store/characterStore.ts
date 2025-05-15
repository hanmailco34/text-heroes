import type { Character, Status } from "@/types/character";
import { create } from "zustand";

const defaultStatus: Status = {
    maxhp: 0,
    maxmp: 0,
    str: 0,
    dex: 0,
    int: 0,
    atk: 0,
    def: 0,
};

const useCharacterStore = create<Character>((set) => ({
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
}));

export default useCharacterStore;
