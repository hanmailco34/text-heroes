import type { IStarBar } from "@/types/statBar";

const StarBar: React.FC<IStarBar & { length?: number }> = ({
    value,
    max,
    length = 10,
}) => {
    const filled = Math.round((value / max) * length);
    return (
        <span style={{ fontFamily: "monospace", letterSpacing: 1 }}>
            {"■".repeat(filled)}
            {"□".repeat(length - filled)}
        </span>
    );
};

export default StarBar;
