import Popup from "@/components/ui/Popup";
import styles from "./StatPoup.module.css";
import { useState } from "react";
import useCharacterStore from "@/store/characterStore";
import type { Stat, StatType } from "@/types/character";
import { STAT_LABEL } from "@/data/statData";
import { useToast } from "@/components/ui/Toast";

function distributeIncrementally(
    current: Stat,
    pointsToAdd: number,
    targetRatio: Stat
): Stat {
    // 입력 검증
    if (pointsToAdd < 0) throw new Error("포인트는 음수로 올 수 없습니다.");
    const ratioSum = targetRatio.str + targetRatio.dex + targetRatio.int;
    if (ratioSum === 0)
        throw new Error("자동 분배 파라미터의 합이 0이 될 수 없습니다.");

    // 목표 비율 정규화
    const normalizedTarget: Record<StatType, number> = {
        str: targetRatio.str / ratioSum,
        dex: targetRatio.dex / ratioSum,
        int: targetRatio.int / ratioSum,
    };

    const result: Stat = { str: 0, dex: 0, int: 0 }; // 이번에 투자된 값만 저장
    const virtualStat: Stat = { ...current }; // 현재 능력치 + 시뮬레이션용

    for (let i = 0; i < pointsToAdd; i++) {
        const total = virtualStat.str + virtualStat.dex + virtualStat.int;

        // 현재 비율 계산
        const currentRatio =
            total === 0
                ? { str: 1 / 3, dex: 1 / 3, int: 1 / 3 } // 초기 상태 보호
                : {
                      str: virtualStat.str / total,
                      dex: virtualStat.dex / total,
                      int: virtualStat.int / total,
                  };

        // 각 스탯의 부족 정도 계산
        const diff: Record<StatType, number> = {
            str: normalizedTarget.str - currentRatio.str,
            dex: normalizedTarget.dex - currentRatio.dex,
            int: normalizedTarget.int - currentRatio.int,
        };

        // 가장 부족한 스탯에 1 포인트 추가
        const mostLacking = (Object.entries(diff) as [StatType, number][]).sort(
            (a, b) => b[1] - a[1]
        )[0][0];

        result[mostLacking]++;
        virtualStat[mostLacking]++;
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
        acc[stat.key as keyof Stat] = stat.value;
        return acc;
    }, {} as Stat);
}

const StatPoup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { getStat, updateCharacterStatus } = useCharacterStore.getState();
    const baseStat = getStat();
    const [diffMap, setDiffMap] = useState<Stat>({
        str: 0,
        dex: 0,
        int: 0,
    });
    const [remaining, setRemaining] = useState(
        useCharacterStore.getState().point
    );

    const toast = useToast();
    const getStatData = () =>
        Object.entries(baseStat).map(([key, value]) => {
            const statKey = key as keyof Stat;
            const added = diffMap[statKey] ?? 0;
            return {
                key: statKey,
                label: STAT_LABEL[statKey] ?? statKey,
                value: value + added,
                min: value,
            };
        });
    const autoAssign = () => {
        const autoStatus = distributeIncrementally(
            extractCurrentStats(getStatData()),
            remaining,
            {
                str: 4,
                int: 0,
                dex: 1,
            }
        );
        Object.keys(autoStatus).forEach((key) => {
            const statKey = key as keyof Stat;
            const current = diffMap[statKey] ?? 0;
            setDiffMap((prev) => ({
                ...prev,
                [key]: current + autoStatus[statKey],
            }));
        });
        setRemaining(0);
    };
    const resetStats = () => {
        setDiffMap({
            str: 0,
            dex: 0,
            int: 0,
        });
        setRemaining(useCharacterStore.getState().point);
    };
    const confirmStats = () => {
        try {
            updateCharacterStatus(diffMap);
        } catch (error) {
            if (error instanceof Error) {
                toast({ type: "error", text: error.message });
            }
        }
        onClose();
    };
    const decrease = (key: keyof Stat) => {
        const current = diffMap[key] ?? 0;
        if (current <= 0) return;
        setDiffMap((prev) => ({
            ...prev,
            [key]: current - 1,
        }));
        setRemaining((r) => r + 1);
    };
    const increase = (key: keyof Stat) => {
        if (remaining <= 0) return;
        setDiffMap((prev) => ({
            ...prev,
            [key]: (prev[key] ?? 0) + 1,
        }));
        setRemaining((r) => r - 1);
    };
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
                        <button
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
                        </button>
                    </li>
                ))}
            </ul>
            <div className={styles.stat_popup_btns}>
                <button onClick={autoAssign}>자동 분배</button>
                <button onClick={resetStats}>초기화</button>
                <button
                    disabled={remaining === useCharacterStore.getState().point}
                    onClick={confirmStats}
                >
                    확정
                </button>
            </div>
        </Popup>
    );
};

export default StatPoup;
