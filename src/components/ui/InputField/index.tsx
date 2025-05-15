import React, { type InputHTMLAttributes } from "react";
import styles from "./InputField.module.css";

const InputField: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
    ...rest // 나머지 input 속성들 (type, value, onChange, placeholder 등)
}) => {
    return (
        <div>
            <input className={styles.input} {...rest} />
        </div>
    );
};

export default InputField;
