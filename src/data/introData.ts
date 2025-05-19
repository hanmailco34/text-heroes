import type { Job } from "@/types/characterTypes";

export const getGameIntroNarration = (): string =>
    [
        "1989년, 잊혀진 왕국의 어둠이 깨어난다...",
        "고대의 예언이 속삭인다.",
        '"진실을 아는 자만이 빛을 되찾으리라."',
        "당신은 이름 없는 모험가.",
        "검은 안개가 드리운 세상에서",
        "운명을 건 여정이 시작된다.",
    ].join("\n");

export const getCharacterIntroNarration = (name: string, job: Job): string => {
    const baseLines = [
        "...그리고, 당신의 모험이 시작된다.",
        "어둠이 세상을 삼키던 시절, 희망의 불씨가 당신 손에 쥐어졌다.",
        "이제, 운명의 첫걸음을 내딛을 때가 왔다.",
    ];

    const jobLines: Record<Job, string[]> = {
        warrior: [
            `전사 '${name}', 그 이름은 곧 전설이 될 것이다.`,
            "칼을 든 손에서 용기가 피어난다.",
        ],
        mage: [
            `마법사 '${name}'는 금지된 주문서를 들고 마을로 향했다.`,
            "지혜의 빛이 당신을 인도할 것이다.",
        ],
        archer: [
            `궁수 '${name}'의 화살은 적의 심장을 꿰뚫을 준비가 되어 있다.`,
            "바람이 당신의 동료가 될 것이다.",
        ],
    };

    return [...baseLines, ...jobLines[job]].join("\n");
};
