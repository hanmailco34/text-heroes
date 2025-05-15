export type Job = "warrior" | "mage" | "archer";

export interface Status {
    maxhp: number;
    maxmp: number;
    str: number;
    dex: number;
    int: number;
    atk: number;
    def: number;
}

export interface CharacterState {
    name: string | null;
    job: Job | null;
    status: Status;
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
}

export interface Description {
    label: string;
    lore: string;
    features: string[];
}
