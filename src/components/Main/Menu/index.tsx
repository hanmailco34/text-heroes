import menuStyles from "./Menu.module.css";

const MENU = [
    { key: "explore", label: "탐험하기" },
    { key: "inventory", label: "인벤토리" },
    { key: "shop", label: "상점" },
    { key: "rest", label: "휴식" },
    { key: "save", label: "저장" },
    { key: "settings", label: "설정" },
    { key: "logout", label: "로그아웃" },
];

const Menu: React.FC<{ onClick: (key: string) => void }> = ({ onClick }) => {
    return (
        <div className={menuStyles.main_menu}>
            {MENU.map((menu) => (
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
