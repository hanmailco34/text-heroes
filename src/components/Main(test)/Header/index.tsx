import { type CharacterState, VITAL_TYPES } from "@/types/characterTypes";
import headerStyles from "./Header.module.css";

const Header: React.FC<{ character: CharacterState }> = ({ character }) => {
    return (
        <div className={headerStyles.main_header}>
            <div className={headerStyles.main_title}>TEXT HEROES</div>
            <div className={headerStyles.main_charinfo}>
                Lv.{character.level} {character.name} [{character.job}]
            </div>
            <div className={headerStyles.main_stats}>
                <span>
                    HP:{" "}
                    <b className={headerStyles.stat_hp}>
                        {character.vitals[VITAL_TYPES.HP]}
                    </b>{" "}
                    / {character.vitals[VITAL_TYPES.MAXHP]}
                </span>
                <span>
                    MP:{" "}
                    <b className={headerStyles.stat_mp}>
                        {character.vitals[VITAL_TYPES.MP]}
                    </b>{" "}
                    / {character.vitals[VITAL_TYPES.MAXMP]}
                </span>
                <span>
                    GOLD:{" "}
                    <b className={headerStyles.stat_gold}>{character.gold}</b>
                </span>
                <span>
                    EXP: <b>{character.exp.current}</b> / {character.exp.max}
                </span>
            </div>
        </div>
    );
};

export default Header;
