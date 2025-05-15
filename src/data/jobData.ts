import type { Description, Job, Status } from "@/types/character";

export interface JobInfo {
    name: string;
    desc: string;
    stats: Status;
}

export const JOB_DESC: Record<Job, Description> = {
    warrior: {
        label: "전사",
        lore: "끊임없는 전쟁과 혼란의 시대, 전사는 전장을 누비며 강인한 신체와 불굴의 의지로 살아남은 자입니다. 그의 검은 명예와 신념의 상징입니다.",
        features: ["강인한 체력과 힘", "근접 전투 특화", "높은 방어력"],
    },
    mage: {
        label: "마법사",
        lore: "고대의 지식과 금지된 주문을 탐구하는 마법사는, 세상의 이치를 꿰뚫는 자입니다. 손끝에서 펼쳐지는 불꽃과 번개는 희망이자 공포입니다.",
        features: ["높은 마나와 지능", "강력한 원거리 마법", "낮은 체력"],
    },
    archer: {
        label: "궁수",
        lore: "숲과 그림자, 혹은 도시의 지붕 위에서 자란 궁수는, 타고난 민첩함과 예리한 시야로 적을 제압합니다. 한 발의 화살로 전장을 바꿉니다.",
        features: ["높은 민첩과 정확도", "원거리 공격 특화", "기동성 우수"],
    },
};

export const JOB_OPTION = (
    Object.entries(JOB_DESC) as [Job, (typeof JOB_DESC)[Job]][]
).map(([value, { label }]) => ({ value, label }));

export const getInitialStatusByJob = (job: Job | ""): Status => {
    switch (job) {
        case "warrior":
            return {
                maxhp: 130,
                maxmp: 70,
                str: 13,
                dex: 6,
                int: 3,
                atk: 12,
                def: 11,
            };
        case "mage":
            return {
                maxhp: 70,
                maxmp: 130,
                str: 3,
                dex: 6,
                int: 15,
                atk: 7,
                def: 4,
            };
        case "archer":
            return {
                maxhp: 100,
                maxmp: 100,
                str: 7,
                dex: 14,
                int: 5,
                atk: 10,
                def: 6,
            };
        default:
            return {
                maxhp: 0,
                maxmp: 0,
                str: 0,
                dex: 0,
                int: 0,
                atk: 0,
                def: 0,
            };
    }
};
