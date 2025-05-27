import GameTitle from "@/components/ui/GameTitle";
import Input from "@/components/ui/Input";
import Panel from "@/components/ui/Panel";
import Select from "@/components/ui/Select";
import { JOB_METADATA, JOB_OPTIONS } from "@/data/jobData";
import type { CharacterState, Job } from "@/types/characterTypes";
import { useMemo, useState, type FormEvent } from "react";
import CharacterStatsPreview from "./ChracterStatsPreview";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import { fakeApi, type FakeApiRequestMap } from "@/utils/fakeApiUtils";
import useCharacterStore from "@/store/characterStore";
import { useNavigate } from "react-router-dom";
import { calculateCombatStats } from "@/utils/combatUtils";

interface FormErrors {
    characterName?: string;
    selectedJob?: string;
}

const CHARACTER_NAME_MIN_LENGTH = 2;
const CHARACTER_NAME_MAX_LENGTH = 12;
const CHARACTER_NAME_REGEX = /^[a-zA-Z0-9가-힣]+$/;

const CharacterCreationForm: React.FC = () => {
    const [characterName, setCharacterName] = useState("");
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setCharacterInfo } = useCharacterStore();
    const toast = useToast();
    const navigate = useNavigate();

    const currentJobMetadata = useMemo(() => {
        if (selectedJob && JOB_METADATA[selectedJob]) {
            return JOB_METADATA[selectedJob];
        }
        return null;
    }, [selectedJob]);

    const handleJobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        const isValidJob = (val: string): val is Job =>
            JOB_OPTIONS.some((opt) => opt.value === val);

        setSelectedJob(isValidJob(value) ? value : null);
    };

    const validateForm = (): {
        isValid: boolean;
        errors: FormErrors;
    } => {
        const errors: FormErrors = {};

        if (!characterName.trim()) {
            errors.characterName = "캐릭터 이름을 입력해주세요.";
        } else if (characterName.trim().length < CHARACTER_NAME_MIN_LENGTH) {
            errors.characterName = "캐릭터 이름은 최소 2자 이상이어야 합니다.";
        } else if (characterName.trim().length > CHARACTER_NAME_MAX_LENGTH) {
            errors.characterName = "캐릭터 이름은 최대 12자까지 가능합니다.";
        } else if (!CHARACTER_NAME_REGEX.test(characterName.trim())) {
            errors.characterName =
                "캐릭터 이름에는 특수문자를 사용할 수 없습니다.";
        }

        if (!selectedJob) {
            errors.selectedJob = "직업을 선택해주세요.";
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors,
        };
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        const validationResult = validateForm();

        setIsSubmitting(true);
        if (validationResult.isValid) {
            if (!selectedJob || !currentJobMetadata) {
                toast({
                    type: "error",
                    text: "내부 오류: 직업 정보가 유효하지 않습니다.",
                });
                setIsSubmitting(false);
                return;
            }

            const characterData: FakeApiRequestMap["character/create"] = {
                characterName: characterName.trim(),
                job: selectedJob,
            };
            try {
                const response = await fakeApi(
                    "character/create",
                    characterData
                );

                const combatStats = calculateCombatStats(
                    selectedJob,
                    currentJobMetadata.initialStats
                );

                const newCharacterData: Partial<CharacterState> = {
                    id: response.characterId,
                    name: characterName,
                    job: selectedJob,
                    stats: currentJobMetadata.initialStats,
                    vitals: {
                        hp: currentJobMetadata.initialVitals.hp,
                        maxhp: currentJobMetadata.initialVitals.hp,
                        mp: currentJobMetadata.initialVitals.mp,
                        maxmp: currentJobMetadata.initialVitals.mp,
                    },
                    combat: combatStats,
                    level: 1,
                    statPoints: 1,
                    exp: { current: 0, max: 100 },
                    gold: 0,
                };

                setCharacterInfo(newCharacterData);

                toast({
                    type: "success",
                    text: `${characterName} 캐릭터가 성공적으로 생성되었습니다!`,
                });

                setCharacterName("");
                setSelectedJob(null);

                navigate("/main");
            } catch (error) {
                toast({
                    type: "error",
                    text: `${error}`,
                });
            }
        } else {
            const formErrors = validationResult.errors;
            toast({
                type: "error",
                text:
                    formErrors.characterName ||
                    formErrors.selectedJob ||
                    "입력 값을 확인해주세요.",
            });
        }
        setIsSubmitting(false);
    };

    return (
        <Panel className="w-full max-w-4xl space-y-6 p-6 md:p-8 bg-gray-900 text-gray-100 rounded-lg shadow-xl">
            <GameTitle
                text="캐릭터 생성"
                as="h1"
                className="text-3xl md:text-4xl mb-8 text-center font-pixel text-brand-green-light"
            ></GameTitle>
            <div className="md:flex md:space-x-8">
                <div className="md:w-1/2 space-y-6">
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <Input
                            label="캐릭터 이름"
                            id="characterName"
                            placeholder="2~12자 (특수문자 제외)"
                            type="text"
                            value={characterName}
                            onChange={(e) => setCharacterName(e.target.value)}
                            required
                        />
                        <Select
                            label="직업 선택"
                            id="characterClass"
                            options={JOB_OPTIONS}
                            value={selectedJob || ""}
                            onChange={handleJobChange}
                            className="font-pixel"
                            required
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "생성 중..." : "캐릭터 생성"}
                        </Button>
                    </form>
                </div>

                <div className="md:w-1/2 mt-8 md:mt-0">
                    <CharacterStatsPreview
                        selectedJobMetadata={currentJobMetadata}
                    ></CharacterStatsPreview>
                </div>
            </div>
        </Panel>
    );
};

export default CharacterCreationForm;
