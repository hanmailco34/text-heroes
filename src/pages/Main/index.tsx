import LocationDisplay from "@/components/main/LocationDisplay";
import GameLogDisplay from "@/components/main/LogDisplay";
import MenuDisplay from "@/components/ui/MenuDisplay";
import { MAIN_MENU_CONFIG } from "@/data/menu/menuConfig";
import CharacterStatusPanel from "@/features/main/CharacterStatusPanel";
import { type GameStage, type MenuItem } from "@/types/menuTypes";
import { useCallback, useMemo, useState } from "react";
import ShopScreen from "../Shop";
import { GREEN_FOREST_VILLAGE_ID } from "@/data/village/villageIds";
import type { VillageType } from "@/types/villageTypes";
import useCharacterStore from "@/store/characterStore";
import { VILLAGES } from "@/data/village";
import { STAGE } from "@/constants/game";
import type { PurchasableItem } from "@/types/itemTypes";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

const MainPage: React.FC = () => {
    const gameTime = "제국력 327년 봄 3일 - 오전";

    const playerGold = useCharacterStore((state) => state.gold);
    const playerLevel = useCharacterStore((state) => state.level);

    const [gameStage, setGameStage] = useState<GameStage>(STAGE.MAIN_MENU);
    const [currentVillageId] = useState<string>(GREEN_FOREST_VILLAGE_ID);
    const [gameLog, setGameLog] = useState<string[]>([]);

    const addLog = useCallback((message: string) => {
        setGameLog((prevLog) => [...prevLog, message].slice(-20));
    }, []);

    const currentVillage: VillageType | undefined = useMemo(
        () => VILLAGES[currentVillageId],
        [currentVillageId]
    );

    const activeMainMenuItems = useMemo(
        () => MAIN_MENU_CONFIG.filter((item) => !item.disabled),
        []
    );

    const handleMenuAction = useCallback(
        (item: MenuItem) => {
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
        [setGameStage]
    );

    const handleExitShopToMainGame = useCallback(() => {
        setGameStage(STAGE.MAIN_MENU);
        addLog("상점에서 나왔습니다.");
    }, [addLog, setGameStage]);

    const handleAttemptPurchase = useCallback(
        (item: PurchasableItem) => {
            addLog(`${item.name} 구매 시도... (가격: ${item.value}G)`);
            if (
                playerLevel <
                (item.type !== "consumable" && item.type !== "material"
                    ? item.requiredLevel
                    : 0)
            ) {
                addLog(
                    `레벨이 부족하여 ${item.name}을(를) 구매할 수 없습니다.`
                );
                return;
            }
            if (playerGold >= item.value) {
                // 스토어 직접 업데이트 대신 액션 디스패치 권장 (Zustand의 경우 setState 사용)
                useCharacterStore.setState((prev) => ({
                    gold: prev.gold - item.value,
                }));
                // TODO: 인벤토리에 아이템 추가 (스토어 액션 호출)
                addLog(`${item.name}을(를) ${item.value}G에 구매했습니다!`);
            } else {
                addLog("골드가 부족합니다.");
            }
        },
        [addLog, playerGold, playerLevel]
    );

    const { selectedIndex, handleHover } = useKeyboardNavigation({
        items: activeMainMenuItems,
        onSelect: handleMenuAction,
        onEscape: () => {
            // No action for Escape in main menu
        },
        initialIndex: 0,
    });

    const renderCurrentStageContent = () => {
        switch (gameStage) {
            case STAGE.MAIN_MENU:
                return (
                    <MenuDisplay
                        title="[메인 메뉴]"
                        items={activeMainMenuItems}
                        selectedIndex={selectedIndex}
                        onSelectItem={(item) => handleMenuAction(item)}
                        onHoverItem={handleHover}
                    />
                );
            case STAGE.SHOP_ACTIVE:
                if (!currentVillage) {
                    addLog("오류: 현재 마을 정보를 찾을 수 없습니다.");
                    setGameStage(STAGE.MAIN_MENU);
                    return <p>마을 정보를 불러오는 중...</p>;
                }
                return (
                    <ShopScreen
                        playerGold={playerGold}
                        playerLevel={playerLevel}
                        currentShopData={currentVillage.shop}
                        // currentLocationName={currentVillage.name} // ShopScreen 내부에서 title 생성 시 사용 가능
                        onAttemptPurchase={handleAttemptPurchase}
                        onExitToMainGame={handleExitShopToMainGame}
                        addLog={addLog}
                    />
                );
            default:
                addLog(`알 수 없는 게임 스테이지: ${gameStage}`);
                return <p>알 수 없는 상태입니다. 메인 메뉴로 돌아갑니다.</p>;
        }
    };

    return (
        <div className="font-vt323 text-[var(--color-brand-green-light)] p-4 min-h-screen flex items-center justify-center bg-[var(--color-brand-bg)]">
            <div
                className="border border-solid border-[var(--color-brand-green-border)] w-full max-w-[45ch] sm:max-w-[55ch] text-base leading-tight shadow-retro-glow bg-[var(--color-brand-bg-content)] p-3 flex flex-col space-y-3" // flex-col과 space-y-3 추가
                style={{ borderRadius: "8px" }}
            >
                <CharacterStatusPanel />

                {currentVillage && (
                    <LocationDisplay
                        locationName={currentVillage.name}
                        gameTime={gameTime}
                    />
                )}

                <div className="border-t border-[var(--color-brand-green-border)] pt-2 flex-1 min-h-[10rem]">
                    {renderCurrentStageContent()}
                </div>

                <GameLogDisplay logEntries={gameLog} />
            </div>
        </div>
    );
};

export default MainPage;
