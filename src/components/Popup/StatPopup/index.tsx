import Popup from "@/components/ui/Popup";
import styles from "./StatPoup.module.css";
import { useState } from "react";
import useCharacterStore from "@/store/characterStore";
import { useToast } from "@/components/ui/Toast";
import { STAT_TYPES, type Stat, type StatType } from "@/types/CharacterTypes";
import { assertNonNegative } from "@/types/NonNegative";
import { JOB_METADATA } from "@/data/JobData";

const STAT_LABEL: Record<StatType, string> = {
    str: "힘",
    dex: "민첩",
    int: "지능",
};

function distributeIncrementally(
    current: Stat,
    pointsToAdd: number,
    targetRatio: Stat
): Stat {
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
}

type StatEntry = {
    key: string;
    label: string;
    value: number;
    min: number;
};

function extractCurrentStats(stats: StatEntry[]): Stat {
    return stats.reduce((acc, stat) => {
        acc[stat.key as StatType] = assertNonNegative(stat.value);
        return acc;
    }, {} as Stat);
}

const StatPoup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const store = useCharacterStore.getState();
    const toast = useToast();

    const [diffMap, setDiffMap] = useState<Stat>(
        Object.fromEntries(
            Object.values(STAT_TYPES).map((stat) => [stat, 0])
        ) as Stat
    );
    console.log("🚀 ~ diffMap:", diffMap);
    const [remaining, setRemaining] = useState(store.statPoints);
    const baseStat = store.getStat();

    const getStatData = () =>
        (Object.entries(baseStat) as [StatType, number][]).map(
            ([key, value]) => ({
                key,
                label: STAT_LABEL[key],
                value: value + (diffMap[key] ?? 0),
                min: value,
            })
        );
    console.log("🚀 ~ getStatData:", getStatData());

    const handleAdjust = (key: StatType, delta: number) => {
        if (delta > 0 && remaining <= 0) return;
        if (delta < 0 && (diffMap[key] ?? 0) <= 0) return;
        setDiffMap((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + delta }));
        setRemaining((prev) => prev - delta);
    };

    const autoAssign = () => {
        try {
            const autoStatus = distributeIncrementally(
                extractCurrentStats(getStatData()),
                remaining,
                JOB_METADATA.warrior.targetRatio
            );

            setDiffMap((prev) => ({
                str: prev.str + autoStatus.str,
                dex: prev.dex + autoStatus.dex,
                int: prev.int + autoStatus.int,
            }));
            setRemaining(0);
        } catch (e) {
            toast({ type: "error", text: (e as Error).message });
        }
    };

    // const { getStat, updateStats } = useCharacterStore.getState();
    // const baseStat = getStat();
    // const [diffMap, setDiffMap] = useState<Stat>({
    //     str: assertNonNegative(0),
    //     dex: assertNonNegative(0),
    //     int: assertNonNegative(0),
    // });
    // const [remaining, setRemaining] = useState(
    //     useCharacterStore.getState().statPoints
    // );
    // const toast = useToast();
    // const getStatData = () =>
    //     Object.entries(baseStat).map(([key, value]) => {
    //         const statKey = key as keyof Stat;
    //         const added = diffMap[statKey] ?? 0;
    //         return {
    //             key: statKey,
    //             label: STAT_LABEL[statKey] ?? statKey,
    //             value: value + added,
    //             min: value,
    //         };
    //     });
    // const autoAssign = () => {
    //     const autoStatus = distributeIncrementally(
    //         extractCurrentStats(getStatData()),
    //         remaining,
    //         {
    //             str: 4,
    //             int: 0,
    //             dex: 1,
    //         }
    //     );
    //     Object.keys(autoStatus).forEach((key) => {
    //         const statKey = key as keyof Stat;
    //         const current = diffMap[statKey] ?? 0;
    //         setDiffMap((prev) => ({
    //             ...prev,
    //             [key]: current + autoStatus[statKey],
    //         }));
    //     });
    //     setRemaining(0);
    // };
    // const resetStats = () => {
    //     setDiffMap({
    //         str: 0,
    //         dex: 0,
    //         int: 0,
    //     });
    //     setRemaining(useCharacterStore.getState().point);
    // };
    // const confirmStats = () => {
    //     try {
    //         updateCharacterStatus(diffMap);
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             toast({ type: "error", text: error.message });
    //         }
    //     }
    //     onClose();
    // };
    // const decrease = (key: keyof Stat) => {
    //     const current = diffMap[key] ?? 0;
    //     if (current <= 0) return;
    //     setDiffMap((prev) => ({
    //         ...prev,
    //         [key]: current - 1,
    //     }));
    //     setRemaining((r) => r + 1);
    // };
    // const increase = (key: keyof Stat) => {
    //     if (remaining <= 0) return;
    //     setDiffMap((prev) => ({
    //         ...prev,
    //         [key]: (prev[key] ?? 0) + 1,
    //     }));
    //     setRemaining((r) => r - 1);
    // };
    return (
        <Popup onClose={onClose}>
            <h2 className={styles.stat_popup_title}>스탯 분배</h2>
            <div className={styles.stat_remaining}>
                남은 포인트: <b>{remaining}</b>
            </div>
            <ul className={styles.stat_list}>
                {getStatData().map((stat) => (
                    <li key={stat.key}>
                        <span className={styles.stat_label}>{stat.label}</span>
                        <span className={styles.stat_value}>{stat.value}</span>
                        {/* <button
                            disabled={stat.value <= stat.min}
                            onClick={() => decrease(stat.key)}
                        >
                            -
                        </button>
                        <button
                            disabled={remaining === 0}
                            onClick={() => increase(stat.key)}
                        >
                            +
                        </button> */}
                    </li>
                ))}
            </ul>
            <div className={styles.stat_popup_btns}>
                <button onClick={autoAssign}>자동 분배</button>
                {/* <button onClick={resetStats}>초기화</button>
                <button
                    disabled={remaining === useCharacterStore.getState().point}
                    onClick={confirmStats}
                >
                    확정
                </button> */}
            </div>
        </Popup>
    );
};

export default StatPoup;
