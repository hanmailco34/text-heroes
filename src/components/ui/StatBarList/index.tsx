import type { StatBarData } from '@/types/statBar';
import StarBar from '../StatBarSection/StatBar';
import styles from './StatBarList.module.css';
import type { Stat, Vital, CombatStat } from '@/types/characterTypes';
import { COMBAT_STAT_LABELS, STAT_LABELS, VITAL_LABELS } from '@/data/statData';
import StatBarSection from '../StatBarSection';

interface StatBarListProps {
    stats: Stat;
    vitals: Vital;
    combat: CombatStat;
}

const StatBarList: React.FC<StatBarListProps> = ({ stats, vitals, combat }) => {
    return (
        <div className={styles.statList}>
            <StatBarSection
                title="기본 능력치"
                data={stats}
                labels={STAT_LABELS}
                maxMap={{
                    str: 15,
                    dex: 15,
                    int: 15,
                }}></StatBarSection>
            <StatBarSection
                title="기본 HP&MP"
                data={vitals}
                labels={VITAL_LABELS}
                maxMap={{
                    hp: 200,
                    maxhp: 200,
                    mp: 200,
                    maxmp: 200,
                }}></StatBarSection>
            <StatBarSection
                title="기본 전투능력"
                data={combat}
                labels={COMBAT_STAT_LABELS}></StatBarSection>
        </div>
    );
};

export default StatBarList;
