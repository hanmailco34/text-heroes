import { useState, createContext, useContext } from "react";
import styles from "./Toast.module.css";

let toastId = 0;

const ToastContext = createContext<(msg: ToastMessage) => void>(() => {});

export const useToast = () => useContext(ToastContext);

export interface ToastMessage {
    type: "success" | "error" | "warning" | "info";
    text: string;
}

interface InternalToast extends ToastMessage {
    id: number;
}

const icons = {
    success: "✔",
    error: "✖",
    warning: "!",
    info: "ℹ",
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [toasts, setToasts] = useState<InternalToast[]>([]);

    const addToast = (msg: ToastMessage) => {
        const id = toastId++;
        const newToast = { ...msg, id };
        setToasts((prev) => [...prev, newToast]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <div className={styles.toastContainer} aria-live="polite">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`${styles.toast} ${styles[toast.type]}`}
                    >
                        <span className={styles.icon}>{icons[toast.type]}</span>
                        <span className={styles.message}>{toast.text}</span>
                        <button
                            className={styles.closeButton}
                            onClick={() => removeToast(toast.id)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
