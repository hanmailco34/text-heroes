import type { MenuItem } from "@/types/menuTypes";
import { MENU_STYLES } from "@/constants/styles/menu";

interface MenuDisplayProps {
    title: string;
    items: MenuItem[];
    selectedIndex: number;
    onSelectItem: (item: MenuItem, index: number) => void;
    onHoverItem?: (index: number) => void;
    className?: string;
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({
    title,
    items,
    selectedIndex,
    onSelectItem,
    onHoverItem,
    className = "",
}) => {
    if (!items || items.length === 0) {
        return (
            <div className={`${MENU_STYLES.NO_ITEMS_MESSAGE} ${className}`}>
                표시할 메뉴 항목이 없습니다.
            </div>
        );
    }

    const getItemClasses = (item: MenuItem, index: number): string => {
        const isActive = selectedIndex === index && !item.disabled;
        const classes = [MENU_STYLES.BASE_ITEM];

        if (isActive) {
            classes.push(MENU_STYLES.SELECTED_ITEM);
        } else {
            classes.push(MENU_STYLES.DEFAULT_ITEM);
        }

        if (item.disabled) {
            classes.push(MENU_STYLES.DISABLED_ITEM);
        } else {
            classes.push("cursor-pointer");
        }

        return classes.join(" ");
    };

    return (
        <div className={className}>
            <h3 className={MENU_STYLES.TITLE}>{title}</h3>
            {items.map((item, idx) => {
                const itemSpecificClasses = getItemClasses(item, idx);
                const isCurrentlySelectedAndActive =
                    selectedIndex === idx && !item.disabled;
                return (
                    <div
                        key={`${title}-${item.name}-${idx}`}
                        className={itemSpecificClasses}
                        onClick={() => {
                            if (!item.disabled) {
                                onSelectItem(item, idx);
                            }
                        }}
                        onMouseEnter={() => {
                            if (!item.disabled && onHoverItem) {
                                onHoverItem(idx);
                            }
                        }}
                        role="menuitem"
                        aria-selected={isCurrentlySelectedAndActive}
                        aria-disabled={item.disabled}
                        tabIndex={item.disabled ? -1 : 0}
                    >
                        {isCurrentlySelectedAndActive ? "▶" : "  "} {item.name}
                    </div>
                );
            })}
        </div>
    );
};

export default MenuDisplay;
