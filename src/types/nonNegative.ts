// 정수 숫자 타입
export type NonNegativeNumber = number & { __constraint: "non-negative" };
export const assertNonNegative = (value: number): NonNegativeNumber => {
    if (value < 0) throw new Error("Value cannot be negative");
    return value as NonNegativeNumber;
};
