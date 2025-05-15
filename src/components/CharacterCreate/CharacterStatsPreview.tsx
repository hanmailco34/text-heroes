import React from "react";
import styles from "./CharacterStatsPreview.module.css";
import type { Description, Job, Status } from "@/types/character";
import { JOB_DESC } from "@/data/jobData";
import StatBarList from "../ui/StatBarList";

const CharacterStatsPreview: React.FC<{ job: Job | ""; status: Status }> = ({
    job,
    status,
}) => {
    if (!job) return;
    const jobDesc: Description = JOB_DESC[job];

    return (
        <div className={styles.stats_preview_container}>
            <div className={styles.job_name}>{jobDesc?.label}</div>
            <div className={styles.job_lore}>{jobDesc?.lore}</div>
            <div className={styles.job_features}>
                <b>[특징]</b>
                <ul>
                    {jobDesc.features.map((e) => (
                        <li>{e}</li>
                    ))}
                </ul>
            </div>
            <StatBarList status={status}></StatBarList>
        </div>
    );
};

export default CharacterStatsPreview;
