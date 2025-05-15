import React, { useState } from "react";
import styles from "@/styles/Container.module.css";
import "./Main.module.css";
import Header from "./Header";
import Menu from "./Menu";
import Log, { type LogMessage } from "./Log";
import useCharacterStore from "@/store/characterStore";
import type { CharacterState } from "@/types/character";

const MENU_LABELS: Record<string, string> = {
    explore: "탐험하기",
    inventory: "인벤토리",
    shop: "상점",
    rest: "휴식",
    save: "저장",
    settings: "설정",
    logout: "로그아웃",
};

const INIT_LOGS: LogMessage[] = [
    { message: "마을 광장에 도착했습니다." },
    { message: "HP가 모두 회복되었습니다.", type: "get" },
    { message: "새로운 퀘스트가 시작되었습니다!", type: "important" },
];

const Main: React.FC = () => {
    const [logs, setLogs] = useState(INIT_LOGS);
    const character: CharacterState = useCharacterStore.getState();

    const handleMenuClick = (key: string) => {
        const label = MENU_LABELS[key];
        const newLog: LogMessage = {
            message: `[${label}] 메뉴를 선택했습니다.`,
            type: key === "logout" ? "warning" : undefined,
        };
        setLogs((prev) => [...prev.slice(-4), newLog]);
    };

    return (
        <div className={styles.container}>
            <Header character={character}></Header>
            <Menu onClick={handleMenuClick}></Menu>
            <Log logs={logs}></Log>
        </div>
    );
};

export default Main;
