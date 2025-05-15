import React, { useState } from "react";
import styles from "@/styles/Container.module.css";
import signupStyles from "./SignUp.module.css";
import PressEnterButton from "@/components/ui/PressEnterButton";
import InputField from "@/components/ui/InputField";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/Toast";

const SignUp: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = () => {
        if (username.length < 3 || password.length < 4) {
            toast({
                type: "error",
                text: "아이디는 3자 이상, 비밀번호는 4자 이상이어야 합니다.",
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                type: "error",
                text: "비밀번호가 일치하지 않습니다.",
            });
            return;
        }

        // TODO: 회원가입 로직 (API 연동 등)
        toast({
            type: "success",
            text: "회원가입 성공! 로그인해주세요.",
        });
        navigate("/login");
    };

    const handleGoToLogin = () => {
        navigate("/login");
    };

    return (
        <div className={styles.container}>
            <div className="title">회원가입</div>
            <InputField
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디를 입력하세요"
                required
            />
            <InputField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
            />
            <InputField
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 확인"
                required
            />
            <PressEnterButton onClick={handleSubmit}>
                &gt; SIGN UP
            </PressEnterButton>

            <div className={signupStyles.footer}>
                이미 계정이 있나요?{" "}
                <PressEnterButton
                    style={{
                        fontSize: "1rem",
                        padding: "4px 12px",
                    }}
                    onClick={handleGoToLogin}
                >
                    로그인
                </PressEnterButton>
            </div>
        </div>
    );
};

export default SignUp;
