import StatBar from "../StatBar";

interface StatBarSectionProps {
    title?: string;
    data: Record<string, number>; // 예: { str: 10, dex: 8 }
    labels: Record<string, string>; // 예: { str: "힘", dex: "민첩" }
    maxValues?: Partial<Record<string, number>>; // 각 스탯의 최대값 (선택적)
    defaultMax?: number; // maxValues에 없는 스탯의 기본 최대값
}

const StatBarSection: React.FC<StatBarSectionProps> = ({
    title,
    data,
    labels,
    maxValues = {},
    defaultMax = 100, // 기본 최대값을 좀 더 일반적인 값으로 변경
}) => {
    const dataEntries = Object.entries(data);

    if (dataEntries.length === 0) {
        return null;
    }

    return (
        <div className="mb-6 last:mb-0">
            {title && (
                <h3 className="text-lg font-semibold mb-3 text-yellow-400 border-b border-gray-700 pb-1">
                    {title}
                </h3>
            )}
            <div className="space-y-1.5">
                {dataEntries.map(([key, currentValue]) => {
                    const label = labels[key] || key.toUpperCase();
                    const maxValue = maxValues[key] || defaultMax;

                    return (
                        <div key={key} className="flex items-center text-sm">
                            <span className="w-1/3 sm:w-1/4 text-gray-300 truncate pr-2">
                                {label}
                            </span>
                            <div className="w-1/3 sm:w-2/4 px-1">
                                <StatBar value={currentValue} max={maxValue} />
                            </div>
                            <span className="w-1/3 sm:w-1/4 text-right text-gray-100 pl-2">
                                {currentValue} / {maxValue}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StatBarSection;
