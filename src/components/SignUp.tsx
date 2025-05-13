// src/components/SignUp.tsx
import React, { useState } from "react";
import "../css/SignUp.css";

interface SignUpProps {
    onSwitchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            setSuccess(false);
            return;
        }
        if (username.length < 3 || password.length < 4) {
            setError("아이디는 3자 이상, 비밀번호는 4자 이상이어야 합니다.");
            setSuccess(false);
            return;
        }
        setError("");
        setSuccess(true);
    };

    return (
        <div className="login-box">
            <div className="title">회원가입</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <br />
                <button className="login-btn" type="submit">
                    &gt; SIGN UP
                </button>
            </form>

            {error && <div className="error">{error}</div>}
            {success && (
                <div className="success">
                    회원가입 성공!{" "}
                    <span
                        className="press-enter"
                        style={{ fontSize: "1rem", padding: "4px 12px" }}
                        onClick={onSwitchToLogin}
                    >
                        로그인
                    </span>{" "}
                    하세요.
                </div>
            )}

            {!success && (
                <div style={{ marginTop: "18px", color: "#aaffaa" }}>
                    이미 계정이 있나요?{" "}
                    <span
                        className="press-enter"
                        style={{ fontSize: "1rem", padding: "4px 12px" }}
                        onClick={onSwitchToLogin}
                    >
                        로그인
                    </span>
                </div>
            )}
        </div>
    );
};

export default SignUp;
