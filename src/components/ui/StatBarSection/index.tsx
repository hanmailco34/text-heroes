import StatBar from './StatBar';
import styles from './StatBarSection.module.css';

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
            {title && <h4 className={styles.sectionTitle}>{title}</h4>}
            {Object.entries(data).map(([key, value]) => {
                const label = labels[key] ?? key;
                const max = maxMap[key] ?? 100;

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
