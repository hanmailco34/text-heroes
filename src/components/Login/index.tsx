import React, { useState } from "react";
import styles from "@/styles/Container.module.css";
import loginStyles from "./Login.module.css";
import PressEnterButton from "@/components/ui/PressEnterButton";
import InputField from "@/components/ui/InputField";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { useToast } from "@/components/ui/Toast";
import useCharacterStore from "@/store/characterStore";

const Login: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const toast = useToast();

    const handleSignUpClick = () => {
        navigate("/signup");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (!userId || !password) {
            toast({
                type: "error",
                text: "아이디와 비밀번호를 입력하세요.",
            });
            return;
        }
        login(userId);
        const hasCharacter = useCharacterStore.getState().hasCharacter;

        if (hasCharacter) navigate("/main");
        else navigate("/character-create");
    };

    return (
        <div className={styles.container}>
            <div className="title">로그인</div>
            <InputField
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디를 입력하세요"
                required
            />
            <InputField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="비밀번호를 입력하세요"
                required
            />
            <PressEnterButton onClick={handleSubmit}>
                &gt; LOGIN
            </PressEnterButton>
            <div className={loginStyles.footer}>
                아직 계정이 없나요?{" "}
                <PressEnterButton
                    style={{
                        fontSize: "1rem",
                        padding: "4px 12px",
                    }}
                    onClick={handleSignUpClick}
                >
                    회원가입
                </PressEnterButton>
            </div>
        </div>
    );
};

export default Login;
