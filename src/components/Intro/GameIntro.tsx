import styles from "@/styles/Container.module.css";
import introStyles from "./GameIntro.module.css";
import PressEnterButton from "@/components/ui/PressEnterButton";
import { useNavigate } from "react-router-dom";
import useTypewriter from "@/hooks/useTypewriter";
import { getGameIntroNarration } from "@/data/introData";

const GameIntro: React.FC = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/login");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleStart();
        }
    };

    const typedText = useTypewriter(getGameIntroNarration(), 50);

    return (
        <div
            className={styles.container}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div className={styles.title}>T E X T&nbsp;&nbsp;H E R O E S</div>
            <div className={introStyles.story}>{typedText}</div>

            <div className={styles.divider} />
            <PressEnterButton onClick={handleStart}>
                &gt; PRESS TO BEGIN
            </PressEnterButton>
        </div>
    );
};

export default GameIntro;
