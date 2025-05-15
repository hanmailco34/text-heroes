// src/components/CharacterCreate.tsx
import React, { useState } from "react";
import styles from "@/styles/Container.module.css";
import charStyles from "./CharacterCreate.module.css";
import InputField from "@/components/ui/InputField";
import PressEnterButton from "@/components/ui/PressEnterButton";
import { useToast } from "@/components/ui/Toast";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import SelectBox from "@/components/ui/SelectBox";
import CharacterStatsPreview from "./CharacterStatsPreview";
import type { Job } from "@/types/character";
import useCharacterStore from "@/store/characterStore";
import { JOB_OPTION, getInitialStatusByJob } from "@/data/jobData";

const CharacterCreate: React.FC = () => {
    const { userId } = useAuthStore();
    const { setCharacterInfo } = useCharacterStore();
    const [name, setName] = useState("");
    const [job, setJob] = useState<Job | "">("");
    const navigate = useNavigate();
    const toast = useToast();

    const jobStatus = getInitialStatusByJob(job);

    const handleSubmit = () => {
        if (!name || name.length < 2) {
            toast({
                type: "error",
                text: "캐릭터 이름은 2자 이상이어야 합니다.",
            });
            return;
        }

        if (!job) {
            toast({
                type: "warning",
                text: "직업을 선택해주세요.",
            });
            return;
        }

        setCharacterInfo({
            name,
            job,
            status: jobStatus,
            hp: jobStatus.maxhp,
            mp: jobStatus.maxmp,
            level: 1,
            exp: 0,
            maxExp: 100,
            gold: 0,
            point: 1,
        });
        toast({
            type: "success",
            text: `${name} (${job}) 캐릭터가 생성되었습니다!`,
        });

        navigate("/main");
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
                    onChange={(value) => setJob(value as Job | "")}
                    options={JOB_OPTION}
                    placeholder="-- 직업을 선택하세요 --"
                    required
                ></SelectBox>
            </div>
            <div>능력치 화면</div>
            <div className={charStyles.statsPreviewWrapper}>
                <CharacterStatsPreview
                    job={job}
                    status={jobStatus}
                ></CharacterStatsPreview>
            </div>

            <PressEnterButton onClick={handleSubmit}>
                &gt; CREATE
            </PressEnterButton>
        </div>
    );
};

export default CharacterCreate;
