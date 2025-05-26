import { useEffect, useState } from "react";
import type { Job, Stat, VitalWithoutMax } from "@/types/characterTypes";
import { JOB_METADATA } from "@/data/jobData";
import JobInformationDisplay from "./JobInformationDisplay";
import StatBarList from "@/components/ui/StatBarList";

interface CharacterStatsPreviewProps {
    job: Job | null;
}

const CharacterStatsPreview: React.FC<CharacterStatsPreviewProps> = ({
    job,
}) => {
    const [previewStats, setPreviewStats] = useState<Stat | null>(null);
    const [previewVitals, setPreviewVitals] = useState<VitalWithoutMax | null>(
        null
    );

    const [jobInfo, setJobInfo] = useState<{
        label: string;
        lore: string;
        features: string[];
    } | null>(null);

    useEffect(() => {
        if (job && JOB_METADATA[job]) {
            const baseData = JOB_METADATA[job];
            setPreviewStats(baseData.initialStats);
            setPreviewVitals(baseData.initialVitals);
            setJobInfo({
                label: baseData.label,
                lore: baseData.lore,
                features: baseData.features,
            });
        } else {
            setPreviewStats(null);
            setPreviewVitals(null);
            setJobInfo(null);
        }
    }, [job]);

    if (!job || !previewStats || !previewVitals || !jobInfo) {
        return (
            <div className="flex items-center justify-center h-full min-h-[200px] text-gray-500 border border-dashed border-gray-700 rounded-md bg-gray-900 p-4">
                직업을 선택하면 능력치가 표시됩니다.
            </div>
        );
    }

    return (
        <div className="border border-gray-700 p-4 rounded-md bg-gray-800 text-gray-200 min-h-[200px]">
            <JobInformationDisplay
                label={jobInfo.label}
                lore={jobInfo.lore}
                features={jobInfo.features}
            />
            <hr className="my-4 border-gray-600" />
            <StatBarList stats={previewStats} vitals={previewVitals} />
        </div>
    );
};

export default CharacterStatsPreview;
