// src/components/MainGame.tsx
import React from "react";
import "../css/MainGame.css";

interface MainGameProps {
    username: string;
    onLogout: () => void;
}

const MainGame: React.FC<MainGameProps> = ({ username, onLogout }) => {
    return (
        <div className="main-game-box">
            <div className="main-title">TEXT HEROES</div>
            <div className="welcome-message">환영합니다, {username}님!</div>
            <div className="main-description">당신의 여정이 시작됩니다...</div>
            <button className="logout-btn" onClick={onLogout}>
                &gt; 로그아웃
            </button>
        </div>
    );
};

export default MainGame;
