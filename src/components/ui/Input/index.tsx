interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    className?: string;
    labelClassName?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    className = "",
    labelClassName = "block text-lg font-pixel text-brand-green-light mb-2",
    ...props
}) => {
    return (
        <div className="space-y-1">
            <label htmlFor={id} className={labelClassName}>
                {label}
            </label>
            <input
                id={id}
                className={`bg-brand-bg-content border-2 border-brand-green-dark text-brand-green-light font-pixel p-2.5 w-full text-sm caret-brand-green-light placeholder-brand-green-textdesc focus:outline-none focus:ring-2 focus:ring-brand-green-dark focus:border-brand-green-light focus:shadow-[0_0_0_2px_theme(colors.brand-bg-content),0_0_0_4px_theme(colors.brand-green-dark)] rounded-none transition-colors ${className}`}
                {...props}
            />
        </div>
    );
};

export default Input;
