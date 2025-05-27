import type { MenuItem } from "@/types/menuTypes";

interface MenuDisplayProps {
    title: string;
    items: MenuItem[]; // 표시할 메뉴 아이템 배열 (MenuItem 타입 사용)
    selectedIndex: number;
    onSelectItem: (item: MenuItem) => void; // 선택된 아이템과 인덱스를 전달
    onHoverItem?: (index: number) => void; // 마우스 호버 시 인덱스 전달 (선택적)
    className?: string; // 추가적인 스타일링을 위한 className prop
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
            <div
                className={`p-2 text-sm text-[var(--color-brand-green-medium)] ${className}`}
            >
                표시할 메뉴 항목이 없습니다.
            </div>
        );
    }

    return (
        <div className={className}>
            <h3 className="font-bold text-sm sm:text-base mb-1 text-[var(--color-brand-green-light)]">
                {title}
            </h3>
            {items.map((item, idx) => (
                <div
                    key={`${title}-${item.name}-${idx}`}
                    className={`cursor-pointer px-2 py-1.5 text-sm sm:text-base rounded hover:bg-[var(--color-brand-green-darker)] transition-colors duration-150 ${
                        selectedIndex === idx && !item.disabled
                            ? "bg-[var(--color-brand-green-medium)] text-black font-bold animate-flicker-fast"
                            : "text-[var(--color-brand-green-light)]"
                    } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => {
                        if (!item.disabled) {
                            onSelectItem(item);
                        }
                    }}
                    onMouseEnter={() => {
                        if (!item.disabled && onHoverItem) {
                            onHoverItem(idx);
                        }
                    }}
                >
                    {selectedIndex === idx && !item.disabled ? "▶" : "  "}{" "}
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default MenuDisplay;
