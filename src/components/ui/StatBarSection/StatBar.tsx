import type { StatBarData } from "@/types/statBar";
import styles from "./StatBar.module.css";

const StatBar: React.FC<StatBarData & { length?: number }> = ({
    value,
    max,
    length = 10,
}) => {
    const filled = Math.round((value / max) * length);
    return (
        <span className={styles.statbar}>
            {"■".repeat(filled)}
            {"□".repeat(length - filled)}
        </span>
    );
};

export default StatBar;
