import React, { type CSSProperties } from "react";
import styles from "./PressEnterButton.module.css";

interface PressEnterButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    style?: CSSProperties;
}

const PressEnterButton: React.FC<PressEnterButtonProps> = ({
    onClick,
    children,
    style,
}) => {
    return (
        <div className={styles.pressEnter} onClick={onClick} style={style}>
            {children}
        </div>
    );
};

export default PressEnterButton;
