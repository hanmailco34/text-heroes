import type { IStatBar } from "@/types/statBar";
import StarBar from "../StarBar";
import styles from "./StatBarList.module.css";
import type { Stat } from "@/types/CharacterTypes";

const StatBarList: React.FC<{ status: Stat }> = ({ status }) => {
    const getStatBarData = (status: Status): IStatBar[] => [
        { label: "힘", value: status.str, max: 15 },
        { label: "민첩", value: status.dex, max: 15 },
        { label: "지능", value: status.int, max: 15 },
        { label: "공격력", value: status.atk, max: 15 },
        { label: "방어력", value: status.def, max: 15 },
    ];

    const statBarData = getStatBarData(status);

    return (
        <div className={styles.statList}>
            {statBarData.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                    <span className={styles.statLabel}>{stat.label}</span>
                    <StarBar value={stat.value} max={stat.max} />
                    <span className={styles.statValue}>{stat.value}</span>
                </div>
            ))}
        </div>
    );
};

export default StatBarList;
