import React from "react";
import "../css/Intro.css";

interface IntroProps {
    onStart: () => void;
}

const Intro: React.FC<IntroProps> = ({ onStart }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            onStart();
        }
    };

    return (
        <div className="intro-box" tabIndex={0} onKeyDown={handleKeyDown}>
            <div className="title">T E X T&nbsp;&nbsp;H E R O E S</div>
            <p>1987년, 잊혀진 왕국의 어둠이 깨어난다...</p>
            <p>고대의 예언이 속삭인다.</p>
            <p>"진실을 아는 자만이 빛을 되찾으리라."</p>
            <p>당신은 이름 없는 모험가.</p>
            <p>검은 안개가 드리운 세상에서 운명을 건 여정이 시작된다.</p>

            <div className="divider" />
            <div className="press-enter" onClick={onStart}>
                &gt; PRESS ENTER TO BEGIN
            </div>
        </div>
    );
};

export default Intro;
