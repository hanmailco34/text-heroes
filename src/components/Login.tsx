// src/components/Login.tsx
import React, { useState } from "react";
import "../css/Login.css";

interface LoginProps {
    onSwitchToSignUp: () => void;
    onLoginSuccess: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToSignUp, onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError("아이디와 비밀번호를 입력하세요.");
            return;
        }
        setError("");
        onLoginSuccess(username);
    };

    return (
        <div className="login-box">
            <div className="title">로그인</div>
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
                <button className="login-btn" type="submit">
                    &gt; LOGIN
                </button>
            </form>
            {error && <div className="error">{error}</div>}
            <div style={{ marginTop: "18px", color: "#aaffaa" }}>
                아직 계정이 없나요?{" "}
                <span
                    className="press-enter"
                    style={{ fontSize: "1rem", padding: "4px 12px" }}
                    onClick={onSwitchToSignUp}
                >
                    회원가입
                </span>
            </div>
        </div>
    );
};

export default Login;
