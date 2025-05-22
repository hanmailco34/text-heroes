import GameIntro from "@/components/Intro/GameIntro";
import { getGameIntroNarration } from "@/data/introData";
import useTypewriter from "@/hooks/useTypewriter";
import { animateProgress } from "@/utils";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const imageModules = import.meta.glob(
//     "/src/assets/**/*.{png,jpg,jpeg,gif,svg,tif}",
//     { query: "url" }
// );

const IntroPage: React.FC = () => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const version = import.meta.env.VITE_APP_VERSION || "0.0.0";

    const typedText = useTypewriter(getGameIntroNarration(), 50);
    const navigate = useNavigate();

    useEffect(() => {
        const totalDuration = 6000;

        const cleanup = animateProgress({
            totalDuration,
            setProgress: setLoadingProgress,
            onComplete: () => {},
        });

        return cleanup;
        // const loadImages = async () => {
        //     const imageUrls = await Promise.all(
        //         Object.values(imageModules).map(async (load) => {
        //             const mod = (await load()) as { default: string };
        //             return mod.default;
        //         })
        //     );
        //     let loadedCount = 0;
        //     const total = imageUrls.length;

        //     if (total === 0) {
        //         setLoadingProgress(100);
        //         return;
        //     }

        //     imageUrls.forEach((src) => {
        //         const img = new Image();
        //         img.src = src;
        //         img.onload = img.onerror = () => {
        //             loadedCount++;
        //             const progress = (loadedCount / total) * 100;
        //             setLoadingProgress(progress);
        //         };
        //     });
        // };

        // loadImages();
    }, []);

    const handleStartGame = () => {
        if (loadingProgress >= 100) {
            navigate("/login");
        }
    };

    return (
        <GameIntro
            typedText={typedText}
            loadingProgress={loadingProgress}
            version={version}
            onStartGame={handleStartGame}
        />
    );
};

export default IntroPage;
