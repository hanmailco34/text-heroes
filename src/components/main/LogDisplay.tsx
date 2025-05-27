import { useEffect, useRef } from "react";

interface GameLogDisplayProps {
    logEntries: string[];
    maxVisibleEntries?: number;
}

const GameLogDisplay: React.FC<GameLogDisplayProps> = ({
    logEntries,
    maxVisibleEntries = 5,
}) => {
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop =
                logContainerRef.current.scrollHeight;
        }
    }, [logEntries]);

    const displayedLogs = logEntries.slice(-maxVisibleEntries);

    return (
        <div
            ref={logContainerRef}
            className="border-t border-[var(--color-brand-green-border)] pt-2 text-xs h-20 overflow-y-auto custom-scrollbar"
        >
            {displayedLogs.length > 0 ? (
                displayedLogs.map((log, idx) => (
                    <div
                        key={idx}
                        className="mb-0.5 opacity-90 hover:opacity-100 transition-opacity"
                    >
                        {log}
                    </div>
                ))
            ) : (
                <p className="italic text-[var(--color-brand-green-medium)]">
                    게임 로그가 없습니다.
                </p>
            )}
            {/* Custom Scrollbar 스타일은 MainGameScreen 또는 global.css에서 관리 */}
        </div>
    );
};

export default GameLogDisplay;
