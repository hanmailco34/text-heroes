import React from "react";

interface GameTitleProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; // 어떤 헤딩 태그로 렌더링할지
}

const GameTitle: React.FC<GameTitleProps> = ({
    text,
    className = "",
    as: HeadingTag = "h1", // 기본값 h1
}) => {
    return (
        <HeadingTag
            className={`text-brand-green-light text-shadow text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center pb-6 pt-4 animate-flicker ${className}`}
        >
            {text}
        </HeadingTag>
    );
};

export default GameTitle;
