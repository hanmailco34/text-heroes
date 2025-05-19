import type { MenuItem } from "@/types/mainTypes";

export const getLabel = <T extends Record<string, string>>(
    labels: T
): MenuItem[] => {
    return Object.entries(labels).map(([key, value]) => ({
        key,
        label: value,
    }));
};
