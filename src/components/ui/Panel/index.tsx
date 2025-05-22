import React from "react";

interface PanelProps {
    children: React.ReactNode;
    className?: string;
}

const Panel: React.FC<PanelProps> = ({ children, className = "" }) => {
    return (
        <div
            className={`p-6 md:p-10 border-4 border-brand-green-dark bg-brand-bg-content shadow-retro-glow rounded-none ${className}`}
        >
            {children}
        </div>
    );
};

export default Panel;
