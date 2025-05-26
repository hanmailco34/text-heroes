interface JobInformationDisplayProps {
    label: string;
    lore: string;
    features: string[];
}

const JobInformationDisplay: React.FC<JobInformationDisplayProps> = ({
    label,
    lore,
    features,
}) => {
    return (
        <>
            <div className="text-2xl font-bold mb-2 text-blue-400">{label}</div>
            <div className="text-sm mb-4 text-gray-400 italic">{lore}</div>
            <div className="text-sm mb-4">
                <b className="font-bold text-purple-400">[특징]</b>
                <ul className="list-disc pl-5 mt-1">
                    {features.map((feature, index) => (
                        <li
                            key={`feature-${index}-${feature.slice(0, 5)}`}
                            className="mb-1"
                        >
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default JobInformationDisplay;
