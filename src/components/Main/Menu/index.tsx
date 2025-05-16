import { MENU_LABELS } from "@/data/mainData";
import menuStyles from "./Menu.module.css";

const Menu: React.FC<{ onClick: (key: string) => void }> = ({ onClick }) => {
    const getMenus = () =>
        Object.entries(MENU_LABELS).map(([key, value]) => {
            return { key: key, label: value };
        });

    return (
        <div className={menuStyles.main_menu}>
            {getMenus().map((menu) => (
                <button
                    key={menu.key}
                    className={menuStyles.menu_btn}
                    onClick={() => onClick(menu.key)}
                >
                    {menu.label}
                </button>
            ))}
        </div>
    );
};

export default Menu;
