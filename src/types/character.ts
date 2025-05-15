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

export interface Character {
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
    setCharacterInfo: (
        data: Partial<Omit<Character, "setCharacterInfo" | "resetCharacter">>
    ) => void;
    resetCharacter: () => void;
}

export interface Description {
    label: string;
    lore: string;
    features: string[];
}
