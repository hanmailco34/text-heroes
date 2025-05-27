import LocationDisplay from "@/components/main/LocationDisplay";
import GameLogDisplay from "@/components/main/LogDisplay";
import MenuDisplay from "@/components/main/MenuDisplay";
import { MAIN_MENU_CONFIG } from "@/data/menuData";
import CharacterStatusPanel from "@/features/main/CharacterStatusPanel";
import { type GameStage, type MenuItem } from "@/types/menuTypes";
import { useCallback, useEffect, useState } from "react";
import ShopScreen from "../Shop";
import { greenForestVillageId, VILLAGES } from "@/data/villageData";
import type { VillageType } from "@/types/villageTypes";

const MainPage: React.FC = () => {
    const gameTime = "제국력 327년 봄 3일 - 오전";

    const [gameStage, setGameStage] = useState<GameStage>("main_menu");
    const [selectedMainMenuIndex, setSelectedMainMenuIndex] = useState(0);

    const [currentVillageId, setCurrentVillageId] =
        useState<string>(greenForestVillageId);

    const currentVillage: VillageType | undefined = VILLAGES[currentVillageId];

    const [gameLog, setGameLog] = useState<string[]>([
        "마을에 도착했습니다.",
        "HP와 MP가 모두 회복되었습니다.",
    ]);

    const addLog = useCallback((message: string) => {
        setGameLog((prevLog) => [...prevLog, message]);
    }, []);

    const activeMainMenuItems = MAIN_MENU_CONFIG.filter(
        (item) => !item.disabled
    );

    const handleMenuAction = useCallback(
        (item: MenuItem) => {
            addLog(`선택: ${item.name}`);
            setSelectedMainMenuIndex(0);

            if (
                item.actionType === "setGameStage" &&
                typeof item.actionValue === "string"
            ) {
                setGameStage(item.actionValue as GameStage);
            } else if (
                item.actionType === "runFunction" &&
                typeof item.actionValue === "function"
            ) {
                item.actionValue();
            }
        },
        [addLog, setSelectedMainMenuIndex, setGameStage]
    );

    const handleExitShopToMainGame = () => {
        setGameStage("main_menu");
        addLog("상점에서 나왔습니다.");
    };

    useEffect(() => {
        if (gameStage !== "main_menu") return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowUp") {
                event.preventDefault();
                setSelectedMainMenuIndex(
                    (prev) =>
                        (prev - 1 + activeMainMenuItems.length) %
                        activeMainMenuItems.length
                );
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                setSelectedMainMenuIndex(
                    (prev) => (prev + 1) % activeMainMenuItems.length
                );
            } else if (event.key === "Enter") {
                event.preventDefault();
                const selectedMenu = activeMainMenuItems[selectedMainMenuIndex];
                if (selectedMenu) {
                    handleMenuAction(selectedMenu);
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [
        gameStage,
        selectedMainMenuIndex,
        activeMainMenuItems,
        handleMenuAction,
    ]);

    return (
        <div className="font-vt323 text-[var(--color-brand-green-light)] p-4 min-h-screen flex items-center justify-center bg-[var(--color-brand-bg)]">
            <div
                className="border border-solid border-[var(--color-brand-green-border)] w-full max-w-[45ch] sm:max-w-[55ch] text-base leading-tight shadow-retro-glow bg-[var(--color-brand-bg-content)] p-3 flex flex-col space-y-3" // flex-col과 space-y-3 추가
                style={{ borderRadius: "8px" }}
            >
                <CharacterStatusPanel />

                <LocationDisplay
                    locationName={currentVillage.name || "알 수 없는 곳"}
                    gameTime={gameTime}
                />

                <div className="border-t border-[var(--color-brand-green-border)] pt-2 flex-1 min-h-[10rem]">
                    {gameStage === "main_menu" && (
                        <MenuDisplay
                            title="[메인 메뉴]"
                            items={activeMainMenuItems}
                            selectedIndex={selectedMainMenuIndex}
                            onSelectItem={handleMenuAction}
                            onHoverItem={(index) => {
                                if (
                                    activeMainMenuItems[index] &&
                                    !activeMainMenuItems[index].disabled
                                ) {
                                    setSelectedMainMenuIndex(index);
                                }
                            }}
                        />
                    )}
                    {gameStage === "shop_active" && (
                        <ShopScreen
                            currentShopData={currentVillage.shop}
                            onExitToMainGame={handleExitShopToMainGame}
                            addLog={addLog}
                        ></ShopScreen>
                    )}
                </div>

                <GameLogDisplay logEntries={gameLog} />
            </div>
        </div>
    );
};

export default MainPage;
