import styles from "./StatBarList.module.css";
import {
    type Stat,
    type CombatStat,
    type VitalWithoutMax,
} from "@/types/characterTypes";
import { COMBAT_STAT_LABELS, STAT_LABELS, VITAL_LABELS } from "@/data/statData";
import StatBarSection from "../StatBarSection";

interface StatBarListProps {
    stats: Stat;
    vitals: VitalWithoutMax;
    combat: CombatStat;
}

const StatBarList: React.FC<StatBarListProps> = ({ stats, vitals, combat }) => {
    const statMaxMap = { str: 15, dex: 15, int: 15 };
    const vitalMaxMap = { hp: 150, mp: 150 };
    const combatMaxMap = { papk: 60, mapk: 60, def: 60 };

    return (
        <div className={styles.statList}>
            <StatBarSection
                title="기본 능력치"
                data={stats}
                labels={STAT_LABELS}
                maxMap={statMaxMap}
            ></StatBarSection>
            <StatBarSection
                title="기본 HP&MP"
                data={vitals}
                labels={VITAL_LABELS}
                maxMap={vitalMaxMap}
            ></StatBarSection>
            <StatBarSection
                title="기본 전투능력"
                data={combat}
                labels={COMBAT_STAT_LABELS}
                maxMap={combatMaxMap}
            ></StatBarSection>
        </div>
    );
};

export default StatBarList;
