import { VILLAGES } from "@/data/villageData";
import styles from "./Village.module.css";
import { MENU_LABELS } from "@/data/menuData";
import useCharacterStore from "@/store/characterStore";
import type { VillageType } from "@/types/villageTypes";
import { useNavigate } from "react-router-dom";
import type { MenuType } from "@/types/mainTypes";
import { getLabel } from "@/utils/objectUtils";

interface VillageProps {
    village: VillageType;
    onMenuChange: (menu: MenuType) => void;
}

const Village: React.FC<VillageProps> = ({ village, onMenuChange }) => {
    const { name, description, connectedVillages } = village;
    const { setCurrentVillage } = useCharacterStore();
    const navigate = useNavigate();

    const moveToVillage = (villageId: string) => {
        setCurrentVillage(villageId);
        navigate("/main");
    };
    return (
        <div className={styles.villageContainer}>
            <h1 className={styles.villageName}>{name}</h1>
            <p className={styles.villageDescription}>{description}</p>
            <div className={styles.menu}>
                {getLabel(MENU_LABELS).map((menu) => (
                    <button
                        key={menu.key}
                        onClick={() => onMenuChange(menu.key)}
                    >
                        {menu.label}
                    </button>
                ))}
                <div className={styles.travel}>
                    <p>다른 마을로 이동</p>
                    {connectedVillages?.map((villageId) => (
                        <button
                            key={villageId}
                            onClick={() => moveToVillage(villageId)}
                        >
                            {VILLAGES[villageId].name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Village;
