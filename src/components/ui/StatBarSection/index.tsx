import StatBar from "./StatBar";
import styles from "./StatBarSection.module.css";

interface StatBarSectionProps {
    title?: string;
    data: Record<string, number>;
    labels: Record<string, string>;
    maxMap?: Partial<Record<string, number>>;
}

const StatBarSection: React.FC<StatBarSectionProps> = ({
    title,
    data,
    labels,
    maxMap = {},
}) => {
    return (
        <div className={styles.section}>
            {title && <div className={styles.sectionTitle}>{title}</div>}
            {Object.entries(data).map(([key, value]) => {
                const label = labels[key] ?? key;
                const max = maxMap[key] ?? 200;

                return (
                    <div key={key} className={styles.statItem}>
                        <span className={styles.statLabel}>{label}</span>
                        <StatBar value={value} max={max} />
                        <span className={styles.statValue}>{value}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default StatBarSection;
