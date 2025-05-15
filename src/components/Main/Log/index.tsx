import React, { useEffect, useRef } from "react";
import logStyles from "./Log.module.css";

export type LogMessage = {
    message: string;
    type?: "important" | "warning" | "get"; // 강조 스타일
};

const Log: React.FC<{ logs: LogMessage[] }> = ({ logs }) => {
    const logRef = useRef<HTMLDivElement>(null);

    // 로그 추가될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        const el = logRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [logs]);

    return (
        <div className={logStyles.main_log} ref={logRef}>
            <div className={logStyles.log_title}>
                [시스템 메시지 / 최근 로그]
            </div>
            <ul>
                {logs.slice(-5).map((log, idx) => (
                    <li
                        key={idx}
                        className={`${logStyles.log_item} ${
                            log.type ? logStyles[log.type] : ""
                        }`}
                    >
                        {log.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Log;
