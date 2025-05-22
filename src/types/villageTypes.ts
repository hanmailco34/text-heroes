import type { HuntingField } from "./huntingField";
import type { Armor, Consumable, Material, Weapon } from "./itemTypes";

export interface VillageShop {
    weapon: Weapon[];
    armor: Armor[];
    consumable: Consumable[];
    material: Material[];
}

export interface VillageType {
    name: string;
    description: string;
    huntingFields?: HuntingField[];
    connectedVillages?: string[];
    shop?: VillageShop;
    // weapons: Weapon[]; // 무기 상점 판매 무기
    // quests: Quest[]; // 마을 퀘스트 목록
    // npcs?: Npc[]; // 마을 NPC 목록 (촌장, 상인, 주민 등)
    // shops?: Shop[]; // 상점(무기/방어구/아이템/마법 등)
    // inn?: Facility; // 여관/휴식처 정보
    // facilities?: Facility[]; // 대장간, 마법사탑 등 기타 시설
    // events?: Event[]; // 마을 내 특별 이벤트/이벤트 트리거
    // bgm?: string; // 마을 BGM 파일명/URL
    // asciiArt?: string; // 마을 ASCII 아트(텍스트 연출용)
    // mapImage?: string; // 마을 지도 이미지(픽셀/일러스트)

    // time?: "day" | "night" | "rain" | "festival"; // 마을의 현재 시간/이벤트 상태
    // isSafeZone?: boolean; // 전투 불가/안전지대 여부
    // tips?: string[]; // 마을 입장 시 랜덤 안내/팁
}
