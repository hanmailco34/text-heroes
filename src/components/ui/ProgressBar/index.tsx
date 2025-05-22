import React from "react";

interface ProgressBarProps {
    progress: number; // 0부터 100까지의 값
    label?: string; // 스크린 리더를 위한 레이블 (선택적, 기본값 제공)
    className?: string; // 추가적인 외부 스타일링을 위한 클래스
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    label = "진행률", // 기본 레이블
    className = "",
}) => {
    const cappedProgress = Math.min(100, Math.max(0, progress)); // progress 값을 0과 100 사이로 제한

    return (
        <div
            className={`rounded-none bg-brand-green-darker h-6 border-2 border-brand-green-dark overflow-hidden ${className}`}
            role="progressbar"
            aria-label={label}
            aria-valuenow={cappedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <div
                className="h-full rounded-none bg-brand-green-light loading-bar-stripes transition-width duration-150 ease-linear"
                style={{ width: `${cappedProgress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
