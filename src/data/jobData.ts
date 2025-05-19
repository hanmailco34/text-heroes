import {
    COMBAT_STAT_TYPES,
    JOBS,
    STAT_TYPES,
    VITAL_TYPES,
    type Job,
    type JobDescription,
} from "@/types/characterTypes";
import { assertNonNegative } from "@/types/nonNegative";

export const JOB_METADATA: Record<Job, JobDescription> = {
    [JOBS.WARRIOR]: {
        label: "전사",
        lore: "끊임없는 전쟁과 혼란의 시대, 전사는 전장을 누비며 강인한 신체와 불굴의 의지로 살아남은 자입니다. 그의 검은 명예와 신념의 상징입니다.",
        features: ["강인한 체력과 힘", "근접 전투 특화", "높은 방어력"],
        initialVitals: {
            [VITAL_TYPES.MAXHP]: assertNonNegative(150),
            [VITAL_TYPES.MAXMP]: assertNonNegative(60),
        },
        initialStats: {
            [STAT_TYPES.STR]: assertNonNegative(15),
            [STAT_TYPES.DEX]: assertNonNegative(6),
            [STAT_TYPES.INT]: assertNonNegative(2),
        },
        initialCombat: {
            [COMBAT_STAT_TYPES.PAPK]: assertNonNegative(20),
            [COMBAT_STAT_TYPES.MAPK]: assertNonNegative(5),
            [COMBAT_STAT_TYPES.DEF]: assertNonNegative(15),
        },
        targetRatio: {
            [STAT_TYPES.STR]: assertNonNegative(3),
            [STAT_TYPES.DEX]: assertNonNegative(1),
            [STAT_TYPES.INT]: assertNonNegative(1),
        },
    },
    [JOBS.MAGE]: {
        label: "마법사",
        lore: "고대의 지식과 금지된 주문을 탐구하는 마법사는, 세상의 이치를 꿰뚫는 자입니다. 손끝에서 펼쳐지는 불꽃과 번개는 희망이자 공포입니다.",
        features: ["높은 마나와 지능", "강력한 원거리 마법", "낮은 체력"],
        initialVitals: {
            [VITAL_TYPES.MAXHP]: assertNonNegative(70),
            [VITAL_TYPES.MAXMP]: assertNonNegative(150),
        },
        initialStats: {
            [STAT_TYPES.STR]: assertNonNegative(2),
            [STAT_TYPES.DEX]: assertNonNegative(6),
            [STAT_TYPES.INT]: assertNonNegative(15),
        },
        initialCombat: {
            [COMBAT_STAT_TYPES.PAPK]: assertNonNegative(5),
            [COMBAT_STAT_TYPES.MAPK]: assertNonNegative(20),
            [COMBAT_STAT_TYPES.DEF]: assertNonNegative(8),
        },
        targetRatio: {
            [STAT_TYPES.STR]: assertNonNegative(1),
            [STAT_TYPES.DEX]: assertNonNegative(1),
            [STAT_TYPES.INT]: assertNonNegative(3),
        },
    },
    [JOBS.ARCHER]: {
        label: "궁수",
        lore: "숲과 그림자, 혹은 도시의 지붕 위에서 자란 궁수는, 타고난 민첩함과 예리한 시야로 적을 제압합니다. 한 발의 화살로 전장을 바꿉니다.",
        features: ["높은 민첩과 정확도", "원거리 공격 특화", "기동성 우수"],
        initialVitals: {
            [VITAL_TYPES.MAXHP]: assertNonNegative(110),
            [VITAL_TYPES.MAXMP]: assertNonNegative(90),
        },
        initialStats: {
            [STAT_TYPES.STR]: assertNonNegative(6),
            [STAT_TYPES.DEX]: assertNonNegative(13),
            [STAT_TYPES.INT]: assertNonNegative(4),
        },
        initialCombat: {
            [COMBAT_STAT_TYPES.PAPK]: assertNonNegative(18),
            [COMBAT_STAT_TYPES.MAPK]: assertNonNegative(8),
            [COMBAT_STAT_TYPES.DEF]: assertNonNegative(12),
        },
        targetRatio: {
            [STAT_TYPES.STR]: assertNonNegative(1),
            [STAT_TYPES.DEX]: assertNonNegative(3),
            [STAT_TYPES.INT]: assertNonNegative(1),
        },
    },
};

export const JOB_OPTIONS = Object.entries(JOB_METADATA).map(
    ([value, { label }]) => ({
        value: value as Job,
        label,
    })
);
