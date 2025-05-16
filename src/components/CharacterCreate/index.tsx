import { useMemo, useState } from "react";
import styles from "@/styles/Container.module.css";
import charStyles from "./CharacterCreate.module.css";
import InputField from "@/components/ui/InputField";
import PressEnterButton from "@/components/ui/PressEnterButton";
import { useToast } from "@/components/ui/Toast";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import SelectBox from "@/components/ui/SelectBox";
import CharacterStatsPreview from "./CharacterStatsPreview";
import useCharacterStore from "@/store/characterStore";
import { JOB_METADATA, JOB_OPTIONS } from "@/data/JobData";
import type { CharacterState, Job } from "@/types/CharacterTypes";
import { calculateCombatStats } from "@/utils/CharacterUtils";

const CharacterCreate: React.FC = () => {
    const { userId } = useAuthStore();
    const { setCharacterInfo } = useCharacterStore();
    const [name, setName] = useState("");
    const [job, setJob] = useState<Job | null>(null);
    const navigate = useNavigate();
    const toast = useToast();

    const jobData = useMemo(() => {
        if (!job) return null;
        const metadata = JOB_METADATA[job];
        const combat = calculateCombatStats(job, metadata.initialStats);
        return {
            stats: metadata.initialStats,
            vitals: {
                hp: metadata.initialVitals.maxhp,
                maxhp: metadata.initialVitals.maxhp,
                mp: metadata.initialVitals.maxmp,
                maxmp: metadata.initialVitals.maxmp,
            },
            combat,
        };
    }, [job]);

    const validateInput = (): boolean => {
        if (!name || name.length < 2) {
            toast({
                type: "error",
                text: "캐릭터 이름은 2자 이상이어야 합니다.",
            });
            return false;
        }

        if (!job) {
            toast({
                type: "warning",
                text: "직업을 선택해주세요.",
            });
            return false;
        }

        return true;
    };

    const createCharacter = () => {
        if (!job || !jobData) return;

        const characterData: Partial<CharacterState> = {
            name,
            job,
            stats: jobData.stats,
            vitals: jobData.vitals,
            combat: jobData.combat,
            level: 1,
            statPoints: 1,
            exp: { current: 0, max: 100 },
            gold: 0,
        };

        setCharacterInfo(characterData);
        toast({
            type: "success",
            text: `${name} (${JOB_METADATA[job].label}) 캐릭터가 생성되었습니다!`,
        });
        navigate("/main");
    };

    const handleSubmit = () => {
        if (validateInput()) {
            createCharacter();
        }
    };

    return (
        <div className={`${styles.container}`}>
            <div className="title">캐릭터 생성</div>
            <div className={charStyles.welcome}>어서 오세요, {userId}님!</div>
            <InputField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="캐릭터 이름"
                required
                autoFocus
            />

            <div className={charStyles.job_select_container}>
                <SelectBox
                    id="job"
                    value={job}
                    onChange={(value) =>
                        setJob(value === "" ? null : (value as Job))
                    }
                    options={JOB_OPTIONS}
                    placeholder="-- 직업을 선택하세요 --"
                    required
                ></SelectBox>
            </div>
            <div className={charStyles.statsPreviewLabel}>능력치 미리보기</div>
            <div className={charStyles.statsPreviewWrapper}>
                <CharacterStatsPreview
                    job={job}
                    stats={jobData?.stats}
                    vitals={jobData?.vitals}
                    combat={jobData?.combat}
                ></CharacterStatsPreview>
            </div>

            <PressEnterButton onClick={handleSubmit}>
                &gt; CREATE
            </PressEnterButton>
        </div>
    );
};

export default CharacterCreate;
