// src/App.tsx
import React, { useState } from "react";
import Intro from "./components/Intro";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CharacterCreate from "./components/CharacterCreate";
import MainGame from "./components/MainGame";

type Screen = "intro" | "login" | "signup" | "main";

const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>("intro");
    const [username, setUsername] = useState<string | null>(null);
    const [hasCharacter, setHasCharacter] = useState<boolean>(false);

    const handleLoginSuccess = (user: string) => {
        setUsername(user);
        // 로그인 시 캐릭터 생성 여부 판단 (임시로 false 고정)
        setHasCharacter(false);
        setScreen("main");
    };

    if (screen === "intro") {
        return <Intro onStart={() => setScreen("login")} />;
    }

    if (screen === "login") {
        return (
            <Login
                onSwitchToSignUp={() => setScreen("signup")}
                onLoginSuccess={handleLoginSuccess}
            />
        );
    }

    if (screen === "signup") {
        return <SignUp onSwitchToLogin={() => setScreen("login")} />;
    }

    if (screen === "main") {
        // 캐릭터 없으면 생성화면
        if (!hasCharacter) {
            return (
                <CharacterCreate
                    username={username!}
                    onCharacterCreate={() => setHasCharacter(true)}
                />
            );
        }

        // 캐릭터 생성 후 메인 게임 화면
        return (
            <MainGame
                username={username!}
                onLogout={() => setScreen("login")}
            />
        );
    }

    return null;
};

export default App;
