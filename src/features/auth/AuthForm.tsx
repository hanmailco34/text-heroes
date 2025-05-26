import AuthFormLayout from "@/components/auth/AuthFormLayout";
import type { AuthFormFields } from "@/types/authTypes";
import { useState } from "react";

interface AuthFormProps<T extends AuthFormFields> {
    formType: "login" | "signup";
    onSubmit: (data: T) => Promise<void>;
    titleText: string;
    submitButtonText: string;
    isLoading: boolean;
    apiError: string | null;
}

const AuthForm = <T extends AuthFormFields>({
    formType,
    onSubmit,
    titleText,
    submitButtonText,
    isLoading,
    apiError,
}: AuthFormProps<T>) => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const baseData = { userId, password };
        const extraData =
            formType === "signup" ? { email, passwordConfirm } : {};

        const formData = {
            ...baseData,
            ...extraData,
        } as T;
        onSubmit(formData);
    };

    const fields = [
        {
            label: "아이디",
            id: "userId",
            name: "userId",
            type: "text",
            placeholder: "아이디 입력...",
            value: userId,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setUserId(e.target.value),
            required: true,
        },
        ...(formType === "signup"
            ? [
                  {
                      label: "이메일",
                      id: "email",
                      name: "email",
                      type: "email",
                      placeholder: "이메일 주소...",
                      value: email,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                          setEmail(e.target.value),
                      required: true,
                  },
              ]
            : []),
        {
            label: "비밀번호",
            id: "password",
            name: "password",
            type: "password",
            placeholder: "비밀번호 입력...",
            value: password,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value),
            required: true,
        },
        ...(formType === "signup"
            ? [
                  {
                      label: "비밀번호 확인",
                      id: "passwordConfirm",
                      name: "passwordConfirm",
                      type: "password",
                      placeholder: "비밀번호 다시 입력...",
                      value: passwordConfirm,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                          setPasswordConfirm(e.target.value),
                      required: true,
                  },
              ]
            : []),
    ];

    const footerLinks = (
        <>
            {formType === "login" && (
                <>
                    <p className="text-brand-green-textdesc text-xs font-pixel">
                        계정이 없으신가요?{" "}
                        <a
                            className="text-brand-green-light underline hover:text-white"
                            href="/signup"
                        >
                            새로 만들기
                        </a>
                    </p>
                    <p className="text-brand-green-textdesc text-xs font-pixel">
                        비밀번호를 잊으셨나요?{" "}
                        <a
                            className="text-brand-green-light underline hover:text-white"
                            href="/forgot-password"
                        >
                            비밀번호 찾기
                        </a>
                    </p>
                </>
            )}
            {formType === "signup" && (
                <p className="text-brand-green-textdesc text-xs font-pixel">
                    이미 계정이 있으신가요?{" "}
                    <a
                        className="text-brand-green-light underline hover:text-white"
                        href="/login"
                    >
                        로그인하기
                    </a>
                </p>
            )}
        </>
    );

    return (
        <AuthFormLayout
            formType={formType}
            titleText={titleText}
            submitButtonText={submitButtonText}
            isLoading={isLoading}
            apiError={apiError}
            fields={fields}
            onSubmit={handleSubmit}
            footerLinks={footerLinks}
        />
    );
};

export default AuthForm;
