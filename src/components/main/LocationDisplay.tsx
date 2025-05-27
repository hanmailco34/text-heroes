interface LocationDisplayProps {
    locationName: string;
    gameTime: string;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({
    locationName,
    gameTime,
}) => {
    return (
        <div className="text-xs text-[var(--color-brand-green-textdesc)] border-t border-[var(--color-brand-green-border)] pt-2">
            위치: {locationName} | {gameTime}
        </div>
    );
};

export default LocationDisplay;
