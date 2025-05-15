import React from "react";
import styles from "./SelectBox.module.css";

interface SelectBoxProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    required?: boolean;
    className?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
    id,
    value,
    onChange,
    options,
    placeholder,
    required = false,
    className = "",
}) => {
    return (
        <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${styles.select} ${className}`}
            required={required}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectBox;
