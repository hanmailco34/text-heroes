export interface HuntingField {
    id: string;
    name: string;
    description: string;
    recommendedLevel: number;
    monsters: Monster[];
    asciiArt?: string;
    isUnlocked?: boolean;
    boss?: Monster;
    rewards?: Item[];
}

export interface Monster {
    id: string; // 고유 식별자
    name: string; // 몬스터 이름
    level: number; // 몬스터 레벨
    hp: number; // 체력
    atk: number; // 공격력
    def: number; // 방어력
    exp: number; // 처치 시 획득 경험치
    gold: number; // 처치 시 획득 골드

    skills?: MonsterSkill[]; // 몬스터 스킬 목록
    description?: string; // 몬스터 설명/소개
    isBoss?: boolean; // 보스 여부

    drops?: DropItem[]; // 드롭 아이템
    behaviorType?: "aggressive" | "defensive" | "random"; // 행동 패턴
}

export interface MonsterSkill {
    name: string;
    damageMultiplier: number; // 공격력 배율
    description?: string;
    effect?: "stun" | "poison" | "burn" | "heal";
    chance?: number; // 발동 확률 (0~1)
}

export interface DropItem {
    itemId: string; // 드롭되는 아이템의 ID
    name: string;
    dropRate: number; // 드롭 확률 (0~1)
    quantity?: number;
}
