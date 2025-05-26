import { useEffect, useState } from "react";

interface StatBarProps {
    value: number;
    max: number;
    barColor?: string;
    emptyBarColor?: string;
    height?: string;
    rounded?: string;
    // 트랜지션 관련 props
    transitionDuration?: string; // 예: 'duration-300', 'duration-500'
    transitionTimingFunction?: string; // 예: 'ease-out', 'ease-in-out'
}

const StatBar: React.FC<StatBarProps> = ({
    value,
    max,
    barColor = "bg-green-500",
    emptyBarColor = "bg-gray-700",
    height = "h-3",
    rounded = "rounded",
    transitionDuration = "duration-500",
    transitionTimingFunction = "ease-out",
}) => {
    const [currentWidthPercentage, setCurrentWidthPercentage] = useState(0);

    useEffect(() => {
        const targetPercentage = max > 0 ? (value / max) * 100 : 0;
        setCurrentWidthPercentage(Math.min(100, Math.max(0, targetPercentage)));
    }, [value, max]); // value 또는 max가 변경될 때만 실행

    return (
        <div
            className={`w-full ${height} ${emptyBarColor} ${rounded} overflow-hidden my-auto relative`}
        >
            <div
                className={`h-full ${barColor} ${rounded} transition-all ${transitionDuration} ${transitionTimingFunction}`}
                style={{ width: `${currentWidthPercentage}%` }}
            ></div>
        </div>
    );
};

export default StatBar;
