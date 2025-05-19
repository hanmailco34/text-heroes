import { type CharacterState, type Vitals } from "@/types/characterTypes";
import { assertNonNegative, type NonNegativeNumber } from "@/types/nonNegative";

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
