import React from "react";
import Panel from "../ui/Panel";
import GameTitle from "../ui/GameTitle";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface FormField {
    label: string;
    id: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

interface AuthFormLayoutProps {
    formType: "login" | "signup";
    titleText: string;
    submitButtonText: string;
    isLoading: boolean;
    apiError: string | null;
    fields: FormField[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    footerLinks: React.ReactNode;
}

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({
    formType,
    titleText,
    submitButtonText,
    isLoading,
    apiError,
    fields,
    onSubmit,
    footerLinks,
}) => {
    return (
        <Panel className="max-w-md w-full space-y-8">
            <GameTitle
                text={titleText}
                as="h2"
                className="text-3xl sm:text-4xl"
            />
            <form
                className="space-y-6"
                onSubmit={onSubmit}
                aria-labelledby={`${formType}-heading`}
            >
                {fields.map((field) => (
                    <Input
                        key={field.id}
                        label={field.label}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                        required={field.required}
                        aria-required={field.required ? "true" : undefined}
                    />
                ))}
                {apiError && (
                    <p className="text-red-500 text-xs font-pixel text-center">
                        {apiError}
                    </p>
                )}
                <Button
                    type="submit"
                    className="w-full text-base"
                    disabled={isLoading}
                >
                    {isLoading ? "처리 중..." : submitButtonText}
                </Button>
            </form>
            <div className="text-center space-y-2">{footerLinks}</div>
        </Panel>
    );
};

export default AuthFormLayout;
