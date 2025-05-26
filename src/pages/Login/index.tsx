import AuthForm from "@/features/auth/AuthForm";
import useAuthStore from "@/store/authStore";
import type { LoginFormData } from "@/types/authTypes";
import { fakeApi } from "@/utils/fakeApiUtils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const { login } = useAuthStore();

    const handleLoginSubmit = async (formData: LoginFormData) => {
        setIsLoading(true);
        setApiError(null);
        try {
            await fakeApi("auth/login", formData);
            login(formData.userId);
            navigate("/main");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setApiError(error.message || "로그인 중 오류가 발생했습니다.");
            } else {
                setApiError("알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex flex-1 justify-center items-center p-4 bg-cover bg-center">
            <AuthForm<LoginFormData>
                formType="login"
                onSubmit={handleLoginSubmit}
                titleText="로그인"
                submitButtonText="세계로 접속"
                isLoading={isLoading}
                apiError={apiError}
            ></AuthForm>
        </main>
    );
};

export default LoginPage;
