import Panel from "@/components/ui/Panel";
import StatBar from "@/components/ui/StatBar";
import { useToast } from "@/components/ui/Toast";
import { JOB_METADATA } from "@/data/job";
import useCharacterStore from "@/store/characterStore";

const CharacterStatusPanel: React.FC = () => {
    const name = useCharacterStore((state) => state.name);
    const job = useCharacterStore((state) => state.job);
    const level = useCharacterStore((state) => state.level);
    const gold = useCharacterStore((state) => state.gold);
    const vitals = useCharacterStore((state) => state.vitals);
    const exp = useCharacterStore((state) => state.exp);

    const toast = useToast();

    if (!job || !name) {
        toast({ type: "error", text: "잘못된 접근입니다." });
        return;
    }

    const currentHp = vitals?.hp ?? 0;
    const maxHp = vitals?.maxhp ?? 1;
    const currentMp = vitals?.mp ?? 0;
    const maxMp = vitals?.maxmp ?? 1;
    const currentExp = exp?.current ?? 0;
    const maxExp = exp?.max ?? 100;

    return (
        <Panel className="text-brand-green p-2 md:p-3">
            <div className="mb-1 font-bold text-base">[캐릭터 상태 패널]</div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-1 mb-2 text-sm">
                <span>이름: {name}</span>
                <span>직업: {JOB_METADATA[job].label}</span>
                <span>Lv.{level || 0}</span>
                <span>GOLD: {gold || 0}G</span>
            </div>
            <div className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-3">
                {/* HP */}
                <div className="flex items-center flex-1 min-w-0">
                    <span className="text-sm whitespace-nowrap pr-1">HP:</span>
                    <StatBar
                        value={currentHp}
                        max={maxHp}
                        barColor="bg-hp"
                        emptyBarColor="bg-empty-bar"
                        height="h-2"
                        rounded="rounded-none"
                    />
                </div>
                {/* MP */}
                <div className="flex items-center flex-1 min-w-0">
                    <span className="text-sm whitespace-nowrap pr-1">MP:</span>
                    <StatBar
                        value={currentMp}
                        max={maxMp}
                        barColor="bg-mp"
                        emptyBarColor="bg-empty-bar"
                        height="h-2"
                        rounded="rounded-none"
                    />
                </div>
                {/* EXP */}
                <div className="flex items-center flex-1 min-w-0">
                    <span className="text-sm whitespace-nowrap pr-1">EXP:</span>
                    <StatBar
                        value={currentExp}
                        max={maxExp}
                        barColor="bg-exp"
                        emptyBarColor="bg-empty-bar"
                        height="h-2"
                        rounded="rounded-none"
                    />
                </div>
            </div>
        </Panel>
    );
};

export default CharacterStatusPanel;
