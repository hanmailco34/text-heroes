import React from "react";
import styles from "./CharacterStatsPreview.module.css";
import StatBarList from "../ui/StatBarList";
import {
    VITAL_TYPES,
    type CombatStats,
    type Job,
    type Stat,
    type Vitals,
    type VitalWithoutMax,
} from "@/types/characterTypes";
import { JOB_METADATA } from "@/data/jobData";

interface CharacterStatsPreviewProps {
    job: Job | null;
    stats: Stat | null | undefined;
    vitals: Vitals | null | undefined;
    combat: CombatStats | null | undefined;
}

const CharacterStatsPreview: React.FC<CharacterStatsPreviewProps> = ({
    job,
    stats,
    vitals,
    combat,
}) => {
    if (!job || !stats || !vitals || !combat) {
        return (
            <div className={styles.preview}>
                직업을 선택하면 능력치가 표시됩니다.
            </div>
        );
    }
    const { label, lore, features } = JOB_METADATA[job];

    const omitMaxVitals = (vitals: Vitals): VitalWithoutMax => {
        return Object.fromEntries(
            Object.entries(vitals).filter(
                ([key]) =>
                    key !== VITAL_TYPES.MAXHP && key !== VITAL_TYPES.MAXMP
            )
        ) as VitalWithoutMax;
    };

    return (
        <div className={styles.stats_preview_container}>
            <div className={styles.job_name}>{label}</div>
            <div className={styles.job_lore}>{lore}</div>
            <div className={styles.job_features}>
                <b>[특징]</b>
                <ul>
                    {features.map((e) => (
                        <li key={e}>{e}</li>
                    ))}
                </ul>
            </div>
            <StatBarList
                stats={stats}
                vitals={omitMaxVitals(vitals)}
                combat={combat}
            ></StatBarList>
        </div>
    );
};

export default CharacterStatsPreview;
