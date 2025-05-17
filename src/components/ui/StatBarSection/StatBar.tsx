import type { StatBarData } from '@/types/statBar';

const StatBar: React.FC<StatBarData & { length?: number }> = ({
    value,
    max,
    length = 10,
}) => {
    const filled = Math.round((value / max) * length);
    return (
        <span style={{ fontFamily: 'monospace', letterSpacing: 1 }}>
            {'■'.repeat(filled)}
            {'□'.repeat(length - filled)}
        </span>
    );
};

export default StatBar;
