import { STAT_TYPES, type Stat, type StatType } from "@/types/characterTypes";
import { assertNonNegative } from "@/types/nonNegative";

export const initializeEmptyStat = (): Stat =>
    Object.fromEntries(
        Object.values(STAT_TYPES).map((stat) => [stat, 0])
    ) as Stat;

export const extractCurrentStats = (
    stats: { key: StatType; value: number }[]
): Stat =>
    Object.fromEntries(
        stats.map(({ key, value }) => [key, assertNonNegative(value)])
    ) as Stat;

export const getStatData = (
    baseStat: Stat,
    diffMap: Stat,
    labels: Record<StatType, string>
) =>
    (Object.entries(baseStat) as [StatType, number][]).map(([key, value]) => ({
        key,
        label: labels[key],
        value: value + (diffMap[key] ?? 0),
        min: value,
    }));

export const distributeIncrementally = (
    current: Stat,
    pointsToAdd: number,
    targetRatio: Stat
): Stat => {
    // 입력 검증
    if (pointsToAdd < 0) throw new Error("포인트는 음수로 올 수 없습니다.");
    const ratioSum = Object.values(targetRatio).reduce(
        (sum, value) => sum + value,
        0
    );
    if (ratioSum === 0)
        throw new Error("자동 분배 파라미터의 합이 0이 될 수 없습니다.");

    const normalized = Object.fromEntries(
        Object.entries(STAT_TYPES).map(([, statKey]) => [
            statKey,
            targetRatio[statKey] / ratioSum,
        ])
    ) as Record<StatType, number>;

    const result = Object.fromEntries(
        Object.values(STAT_TYPES).map((stat) => [stat, 0])
    ) as Stat;

    const virtual: Stat = { ...current };

    for (let i = 0; i < pointsToAdd; i++) {
        const total = Object.values(virtual).reduce((sum, val) => sum + val, 0);

        // 현재 비율 계산
        const currentRatio =
            total === 0
                ? Object.fromEntries(
                      Object.values(STAT_TYPES).map((stat) => [stat, 1 / 3])
                  )
                : Object.fromEntries(
                      Object.entries(virtual).map(([key, val]) => [
                          key,
                          val / total,
                      ])
                  );

        // 각 스탯의 부족 정도 계산
        const diff = Object.fromEntries(
            Object.entries(normalized).map(([key, val]) => [
                key,
                val - currentRatio[key],
            ])
        ) as Record<StatType, number>;

        // 가장 부족한 스탯에 1 포인트 추가
        const mostLacking = (Object.entries(diff) as [StatType, number][]).sort(
            (a, b) => b[1] - a[1]
        )[0][0];

        result[mostLacking]++;
        virtual[mostLacking]++;
    }

    return result;
};
