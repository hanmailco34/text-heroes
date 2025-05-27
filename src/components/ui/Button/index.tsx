import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asLink?: boolean; // 버튼 대신 링크로 렌더링
    href?: string; // 링크 URL
    className?: string; // 추가 클래스
    variant?: "primary" | "secondary"; // 스타일 변형
}

const Button: React.FC<ButtonProps> = ({
    asLink = false,
    href,
    className = "",
    variant = "primary",
    children,
    ...props
}) => {
    const baseClasses =
        "font-pixel uppercase border-4 border-brand-green-dark shadow-retro-glow transition-none rounded-none outline-none select-none cursor-pixel text-sm px-4 py-2";
    const variantClasses = {
        primary:
            "bg-brand-green-darker text-brand-green-light hover:bg-brand-green-light hover:text-brand-bg-content focus:ring-2 focus:ring-brand-green-light focus:ring-offset-2 focus:ring-offset-brand-green-darker",
        secondary:
            "bg-brand-bg-content text-brand-green-light hover:bg-brand-green-dark hover:text-brand-green-light focus:ring-2 focus:ring-brand-green-medium focus:ring-offset-2 focus:ring-offset-brand-bg-content",
        outline:
            "bg-transparent border-4 border-brand-green-light text-brand-green-light hover:bg-brand-green-light hover:text-brand-bg-content",
    };
    const hoverTransformClasses =
        "hover:brightness-110 hover:scale-105 active:brightness-90 active:scale-95 transition-transform";

    const classes = `${baseClasses} ${
        variantClasses[variant]
    } ${hoverTransformClasses} ${
        props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    } ${className}`;

    if (asLink && href) {
        return (
            <Link
                to={href}
                className={classes}
                {...(props as React.HTMLAttributes<HTMLAnchorElement>)}
            >
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;
