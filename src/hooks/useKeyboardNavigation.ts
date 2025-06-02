// src/hooks/useKeyboardNavigation.ts
import { useCallback, useEffect, useState } from "react";
import type { MenuItem } from "@/types/menuTypes";

interface UseKeyboardNavigationProps<T extends MenuItem> {
    items: T[];
    onSelect: (item: T) => void;
    onEscape: () => void;
    initialIndex?: number;
}

export const useKeyboardNavigation = <T extends MenuItem>({
    items,
    onSelect,
    onEscape,
    initialIndex = 0,
}: UseKeyboardNavigationProps<T>) => {
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);

    const findNextEnabledIndex = useCallback(
        (startIndex: number, direction: "up" | "down"): number => {
            const length = items.length;
            if (length === 0) return startIndex;

            const step = direction === "up" ? -1 : 1;
            let index = startIndex;

            for (let i = 0; i < length; i++) {
                index = (index + step + length) % length;
                if (!items[index].disabled) {
                    return index;
                }
            }

            return startIndex;
        },
        [items]
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (items.length === 0) return;

            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    setSelectedIndex((prev) =>
                        findNextEnabledIndex(prev, "up")
                    );
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    setSelectedIndex((prev) =>
                        findNextEnabledIndex(prev, "down")
                    );
                    break;
                case "Enter": {
                    event.preventDefault();
                    const currentItem = items[selectedIndex];
                    if (currentItem && !currentItem.disabled) {
                        onSelect(currentItem);
                    }
                    break;
                }
                case "Escape":
                    event.preventDefault();
                    onEscape();
                    break;
                default:
                    break;
            }
        },
        [items, selectedIndex, onSelect, onEscape, findNextEnabledIndex]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (items.length === 0) {
            setSelectedIndex(0);
            return;
        }

        const firstEnabledIndex = items.findIndex((item) => !item.disabled);
        setSelectedIndex(firstEnabledIndex >= 0 ? firstEnabledIndex : 0);
    }, [items]);

    return {
        selectedIndex,
        setSelectedIndex,
        handleHover: (index: number) => {
            if (items[index] && !items[index].disabled) {
                setSelectedIndex(index);
            }
        },
    };
};
