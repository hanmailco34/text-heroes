import { assertNonNegative } from "@/types/nonNegative";

// 기본 강화 성공률
export const DEFAULT_UPGRADE_RATE = {
    common: { baseRate: 0.9, decreasePerLevel: 0.1, minRate: 0.1 },
    uncommon: { baseRate: 0.75, decreasePerLevel: 0.15, minRate: 0.35 },
};

// 기본 강화 비용 계산 함수
export const calculateUpgradeCost =
    (baseGold: number, materialId: string, baseAmount: number) =>
    (level: number) => ({
        gold: assertNonNegative(baseGold * (level + 1)),
        materials: [
            {
                itemId: materialId,
                amount: assertNonNegative(baseAmount * (level + 1)),
            },
        ],
    });

// 강화 불가 아이템용 기본값
export const NO_UPGRADE = {
    maxUpgradeLevel: assertNonNegative(0),
    currentUpgradeLevel: assertNonNegative(0),
    upgradeCost: () => ({ gold: assertNonNegative(0) }),
    upgradeRate: { baseRate: 0 },
};
