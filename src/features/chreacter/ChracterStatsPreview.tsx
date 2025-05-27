import type { JobDescription } from "@/types/characterTypes";
import JobInformationDisplay from "./JobInformationDisplay";
import StatBarList from "@/components/ui/StatBarList";

const CharacterStatsPreview: React.FC<{
    selectedJobMetadata: JobDescription | null;
}> = ({ selectedJobMetadata }) => {
    if (!selectedJobMetadata) {
        return (
            <div className="flex items-center justify-center h-full min-h-[200px] text-gray-500 border border-dashed border-gray-700 rounded-md bg-gray-900 p-4">
                직업을 선택하면 능력치가 표시됩니다.
            </div>
        );
    }

    const { label, lore, features, initialStats, initialVitals } =
        selectedJobMetadata;

    return (
        <div className="border border-gray-700 p-4 rounded-md bg-gray-800 text-gray-200 min-h-[200px]">
            <JobInformationDisplay
                label={label}
                lore={lore}
                features={features}
            />
            <hr className="my-4 border-gray-600" />
            <StatBarList stats={initialStats} vitals={initialVitals} />
        </div>
    );
};

export default CharacterStatsPreview;
