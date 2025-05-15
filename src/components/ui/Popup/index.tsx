import type { ReactNode } from "react";
import styles from "./Popup.module.css";

interface PopupProps {
    children: ReactNode;
    onClose?: () => void;
}

const Popup = ({ children, onClose }: PopupProps) => {
    return (
        <div className={styles.popup_overlay}>
            <div
                className={styles.popup_content}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.popup_close_button} onClick={onClose}>
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Popup;
