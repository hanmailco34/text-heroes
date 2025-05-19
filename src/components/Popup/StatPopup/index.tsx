import Popup from "@/components/ui/Popup";
import styles from "./StatPoup.module.css";
import { useState } from "react";
import useCharacterStore from "@/store/characterStore";
import { useToast } from "@/components/ui/Toast";
import { STAT_TYPES, type Stat, type StatType } from "@/types/characterTypes";
import { assertNonNegative } from "@/types/nonNegative";
import { JOB_METADATA } from "@/data/jobData";
import { STAT_LABELS } from "@/data/statData";
import {
    distributeIncrementally,
    extractCurrentStats,
    getStatData,
    initializeEmptyStat,
} from "@/utils/statUtils";

const StatPoup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const store = useCharacterStore.getState();
    const toast = useToast();
    const [diffMap, setDiffMap] = useState<Stat>(initializeEmptyStat());
    const [remaining, setRemaining] = useState(store.statPoints);
    const baseStat = store.getStat();

    const handleAdjust = (key: StatType, delta: number) => {
        if (
            (delta > 0 && remaining <= 0) ||
            (delta < 0 && (diffMap[key] ?? 0) <= 0)
        )
            return;
        setDiffMap((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + delta }));
        setRemaining((prev) => prev - delta);
    };

    const autoAssign = () => {
        try {
            const autoStatus = distributeIncrementally(
                extractCurrentStats(
                    getStatData(baseStat, diffMap, STAT_LABELS)
                ),
                remaining,
                JOB_METADATA.warrior.targetRatio
            );

            setDiffMap((prev) => {
                return Object.values(STAT_TYPES).reduce((acc, key) => {
                    acc[key] = assertNonNegative(prev[key] + autoStatus[key]);
                    return acc;
                }, {} as typeof prev);
            });
            setRemaining(0);
        } catch (e) {
            toast({ type: "error", text: (e as Error).message });
        }
    };

    const resetStats = () => {
        setDiffMap(initializeEmptyStat());
        setRemaining(store.statPoints);
    };

    const confirmStats = () => {
        try {
            store.updateStats(diffMap);
        } catch (error) {
            if (error instanceof Error) {
                toast({ type: "error", text: error.message });
            }
        }
        onClose();
    };

    const statData = getStatData(baseStat, diffMap, STAT_LABELS);

    return (
        <Popup onClose={onClose}>
            <h2 className={styles.stat_popup_title}>스탯 분배</h2>
            <div className={styles.stat_remaining}>
                남은 포인트: <b>{remaining}</b>
            </div>
            <ul className={styles.stat_list}>
                {statData.map((stat) => (
                    <li key={stat.key}>
                        <span className={styles.stat_label}>{stat.label}</span>
                        <span className={styles.stat_value}>{stat.value}</span>
                        <button
                            disabled={stat.value <= stat.min}
                            onClick={() => handleAdjust(stat.key, -1)}
                        >
                            -
                        </button>
                        <button
                            disabled={remaining === 0}
                            onClick={() => handleAdjust(stat.key, 1)}
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
                    disabled={
                        remaining === useCharacterStore.getState().statPoints
                    }
                    onClick={confirmStats}
                >
                    확정
                </button>
            </div>
        </Popup>
    );
};

export default StatPoup;
