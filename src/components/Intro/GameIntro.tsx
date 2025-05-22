import React from "react";
import ProgressBar from "../ui/ProgressBar";

interface GameIntroProps {
    typedText: string;
    loadingProgress: number;
    version: string;
    onStartGame: () => void;
}

const GameIntro: React.FC<GameIntroProps> = ({
    typedText,
    loadingProgress = 60,
    version = import.meta.env.VITE_APP_VERSION || "0.0.0",
    onStartGame,
}) => {
    return (
        <div className="relative flex size-full min-h-screen flex-col bg-brand-bg dark overflow-x-hidden font-pixel">
            <div className="flex h-full grow flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl p-6 md:p-10 border-4 border-brand-green-dark bg-brand-bg-content shadow-retro-glow rounded-none">
                    <h1 className="text-brand-green-light text-shadow text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center pb-6 pt-4 animate-flicker">
                        텍스트 히어로즈
                    </h1>
                    <p className="text-brand-green-textdesc text-base sm:text-lg leading-relaxed pb-8 pt-2 px-4 text-center whitespace-pre-line">
                        {typedText}
                    </p>
                    <div className="flex flex-col gap-4 p-4">
                        <ProgressBar
                            progress={loadingProgress}
                            label="게임 로딩 진행률"
                        />
                        <div className="flex justify-center">
                            <button
                                className={`relative w-full max-w-xs px-0 py-3 border-4 border-brand-green-dark bg-brand-green-darker text-brand-green-light font-pixel text-2xl tracking-widest uppercase shadow-retro-glow transition-none rounded-none outline-none select-none ${
                                    loadingProgress < 100
                                        ? "opacity-60 cursor-not-allowed animate-flicker-slow"
                                        : "cursor-pointer animate-flicker-fast"
                                }
  `}
                                onClick={onStartGame}
                                disabled={loadingProgress < 100}
                            >
                                {loadingProgress < 100
                                    ? "로딩 중..."
                                    : "게임 시작"}
                            </button>
                        </div>
                    </div>
                    <p className="text-brand-green-medium text-xs sm:text-sm font-normal leading-normal pt-6 px-4 text-center">
                        버전 {version}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GameIntro;
