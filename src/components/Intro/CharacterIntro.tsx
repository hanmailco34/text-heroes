import useTypewriter from "@/hooks/useTypewriter";
import useCharacterStore from "@/store/characterStore";
import { JOBS, type CharacterStore } from "@/types/characterTypes";
import styles from "@/styles/Container.module.css";
//import introStyles from "./GameIntro.module.css";
import { getCharacterIntroNarration } from "@/data/introData";
import PressEnterButton from "../ui/PressEnterButton";
import { useNavigate } from "react-router-dom";

const CharacterIntro: React.FC = () => {
    const character: CharacterStore = useCharacterStore.getState();
    const { job, name } = character;
    const safeName = name ?? "???";
    const safeJob = job ?? JOBS.WARRIOR;
    const navigate = useNavigate();

    const typedText = useTypewriter(
        getCharacterIntroNarration(safeName, safeJob),
        50
    );

    const handleStart = () => {
        navigate("/main");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleStart();
        }
    };

    return (
        <div className={styles.container} onKeyDown={handleKeyDown}>
            <div>{typedText}</div>
            <PressEnterButton onClick={handleStart}>
                &gt; 마을에 입장
            </PressEnterButton>
        </div>
    );
};

export default CharacterIntro;
