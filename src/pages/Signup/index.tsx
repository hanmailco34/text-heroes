import AuthForm from "@/features/auth/AuthForm";
import type { SignupFormData } from "@/types/authTypes";
import { fakeApi } from "@/utils/fakeApiUtils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const handleSignupSubmit = async (formData: SignupFormData) => {
        setIsLoading(true);
        setApiError(null);
        try {
            await fakeApi("auth/signup", formData);
            navigate("/login");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setApiError(
                    error.message || "회원가입 중 오류가 발생했습니다."
                );
            } else {
                setApiError("알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main
            className="flex flex-1 justify-center items-center p-4 bg-cover bg-center"
            style={{
                backgroundImage: "url('/assets/images/retro-background.png')",
            }}
        >
            <AuthForm<SignupFormData>
                formType="signup"
                onSubmit={handleSignupSubmit}
                titleText="회원가입"
                submitButtonText="히어로 등록"
                isLoading={isLoading}
                apiError={apiError}
            />
        </main>
    );
};

export default SignupPage;
