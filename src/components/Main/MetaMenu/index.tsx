import { META_MENU_LABELS } from "@/data/menuData";
import styles from "./MetaMenu.module.css";
import type { MetaMenuType } from "@/types/mainTypes";
import { getLabel } from "@/utils/objectUtils";

const MetaMenu: React.FC = () => {
    const onMetaMenuChange = (key: MetaMenuType) => {
        console.log(key);
    };

    return (
        <div className={styles.metaMenu}>
            {getLabel(META_MENU_LABELS).map((menu) => (
                <button
                    key={menu.key}
                    onClick={() => onMetaMenuChange(menu.key)}
                >
                    {menu.label}
                </button>
            ))}
        </div>
    );
};

export default MetaMenu;
