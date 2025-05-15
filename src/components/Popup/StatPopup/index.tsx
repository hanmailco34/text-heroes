import Popup from "@/components/ui/Popup";
import styles from "./StatPoup.module.css";
import { useState } from "react";
import useCharacterStore from "@/store/characterStore";
import type { Stat } from "@/types/character";
import { STAT_LABEL } from "@/data/statData";
import { useToast } from "@/components/ui/Toast";

const StatPoup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { getStat, updateCharacterStatus } = useCharacterStore.getState();
    const baseStat = getStat();
    const [diffMap, setDiffMap] = useState<Partial<Record<keyof Stat, number>>>(
        {}
    );
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
    const autoAssign = () => {};
    const resetStats = () => {
        setDiffMap({});
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
