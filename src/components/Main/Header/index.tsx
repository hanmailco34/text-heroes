import type { Character } from "@/types/character";
import headerStyles from "./Header.module.css";

const Header: React.FC<{ character: Character }> = ({ character }) => {
    return (
        <div className={headerStyles.main_header}>
            <div className={headerStyles.main_title}>TEXT HEROES</div>
            <div className={headerStyles.main_charinfo}>
                Lv.{character.level} {character.name} [{character.job}]
            </div>
            <div className={headerStyles.main_stats}>
                <span>
                    HP: <b className={headerStyles.stat_hp}>{character.hp}</b> /{" "}
                    {character.status.maxhp}
                </span>
                <span>
                    MP: <b className={headerStyles.stat_mp}>{character.mp}</b> /{" "}
                    {character.status.maxmp}
                </span>
                <span>
                    GOLD:{" "}
                    <b className={headerStyles.stat_gold}>{character.gold}</b>
                </span>
                <span>
                    EXP: <b>{character.exp}</b> / {character.maxExp}
                </span>
            </div>
        </div>
    );
};

export default Header;
