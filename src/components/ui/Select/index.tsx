import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    id: string;
    options: { value: string; label: string }[];
    labelClassName?: string;
}

const Select: React.FC<SelectProps> = ({
    label,
    id,
    options,
    className = "",
    labelClassName = "block text-lg font-pixel text-brand-green-light mb-2",
    ...props
}) => {
    const selectBaseClasses =
        "form-select bg-brand-bg-content border-2 border-brand-green-dark text-brand-green-light font-pixel py-3 px-9 w-full text-base appearance-none focus:outline-none focus:ring-2 focus:ring-brand-green-dark focus:border-brand-green-light focus:shadow-[0_0_0_2px_theme(colors.brand-bg-content),0_0_0_4px_theme(colors.brand-green-dark)]";

    return (
        <div className="space-y-2">
            <label htmlFor={id} className={labelClassName}>
                {label}
            </label>
            <div className="relative">
                <select
                    id={id}
                    className={`${selectBaseClasses} ${className} custom-arrow`}
                    {...props}
                >
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="bg-brand-bg-content text-brand-green-light"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Select;
