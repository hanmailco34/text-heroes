import {
    type Stat,
    type VitalWithoutMax,
    type CombatStatType,
} from "@/types/characterTypes";
import StatBarSection from "../StatBarSection";
import {
    DEFAULT_STAT_MAX_VALUES,
    DEFAULT_VITAL_MAX_VALUES,
    STAT_LABELS,
    VITAL_LABELS,
} from "@/data/statData";

interface StatBarListProps {
    stats: Stat;
    vitals: VitalWithoutMax;
    combat?: CombatStatType;
    statMaxValues?: Partial<Record<keyof Stat, number>>;
    vitalMaxValues?: Partial<Record<keyof VitalWithoutMax, number>>;
    combatMaxValues?: Partial<Record<keyof CombatStatType, number>>;
}
const StatBarList: React.FC<StatBarListProps> = ({
    stats,
    vitals,
    statMaxValues = DEFAULT_STAT_MAX_VALUES,
    vitalMaxValues = DEFAULT_VITAL_MAX_VALUES,
}) => {
    return (
        <div className="space-y-4">
            <StatBarSection
                title="능력치"
                data={stats}
                labels={STAT_LABELS}
                maxValues={statMaxValues}
                defaultMax={20}
            />
            <StatBarSection
                title="생명력 & 정신력"
                data={vitals}
                labels={VITAL_LABELS}
                maxValues={vitalMaxValues}
                defaultMax={200}
            />
        </div>
    );
};

export default StatBarList;
