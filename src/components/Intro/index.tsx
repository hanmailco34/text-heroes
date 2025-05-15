import styles from "@/styles/Container.module.css";
import introStyles from "./Intro.module.css";
import PressEnterButton from "@/components/ui/PressEnterButton";
import { useNavigate } from "react-router-dom";
import useTypewriter from "@/hooks/useTypewriter";

const Intro: React.FC = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/login");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleStart();
        }
    };

    const fullText = [
        "1989년, 잊혀진 왕국의 어둠이 깨어난다...",
        "고대의 예언이 속삭인다.",
        '"진실을 아는 자만이 빛을 되찾으리라."',
        "당신은 이름 없는 모험가.",
        "검은 안개가 드리운 세상에서",
        "운명을 건 여정이 시작된다.",
    ].join("\n");

    const typedText = useTypewriter(fullText, 50);

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
                &gt; PRESS ENTER TO BEGIN
            </PressEnterButton>
        </div>
    );
};

export default Intro;
