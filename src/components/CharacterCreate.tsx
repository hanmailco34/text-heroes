// src/components/CharacterCreate.tsx
import React, { useState } from "react";
import "../css/CharacterCreate.css";

interface CharacterCreateProps {
    username: string;
    onCharacterCreate: (characterName: string, job: string) => void;
}

const CharacterCreate: React.FC<CharacterCreateProps> = ({
    username,
    onCharacterCreate,
}) => {
    const [characterName, setCharacterName] = useState("");
    const [job, setJob] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!characterName || characterName.length < 2) {
            setError("캐릭터 이름은 2자 이상이어야 합니다.");
            return;
        }

        if (!job) {
            setError("직업을 선택해주세요.");
            return;
        }

        // 여기에 API 요청 추가 가능
        setError("");
        onCharacterCreate(characterName, job); // 생성 성공 → MainGame으로
    };

    return (
        <div className="character-create-box">
            <div className="character-create-title">캐릭터 생성</div>
            <div>어서 오세요, {username}님!</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="캐릭터 이름"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    autoFocus
                />
                <div className="job-select-container">
                    <label>직업 선택:</label>
                    <select
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                    >
                        <option value="">-- 선택하세요 --</option>
                        <option value="warrior">전사</option>
                        <option value="mage">마법사</option>
                        <option value="archer">궁수</option>
                        <option value="thief">도적</option>
                    </select>
                </div>
                <button className="create-btn" type="submit">
                    &gt; CREATE
                </button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default CharacterCreate;
