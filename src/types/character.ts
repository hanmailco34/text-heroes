export type Job = "warrior" | "mage" | "archer";
export type StatType = "str" | "dex" | "int";

export interface Stat {
    str: number;
    dex: number;
    int: number;
}

export interface Status extends Stat {
    maxhp: number;
    maxmp: number;
    atk: number;
    def: number;
}

export interface CharacterState {
    name: string | null;
    job: Job | null;
    status: Status;
    point: number;
    level: number;
    gold: number;
    hp: number;
    mp: number;
    exp: number;
    maxExp: number;
    hasCharacter: boolean;
}

export interface CharacterStore extends CharacterState {
    setCharacterInfo: (data: Partial<CharacterState>) => void;
    updateCharacter: (
        data: Partial<Pick<CharacterState, "hp" | "mp" | "gold" | "exp">>
    ) => void;
    resetCharacter: () => void;
    updateCharacterStatus: (data: Partial<Status>) => void;
    getStat: () => Stat;
    levelUp: () => void;
}

export interface Description {
    label: string;
    lore: string;
    features: string[];
}
