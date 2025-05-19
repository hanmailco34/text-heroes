import { VILLAGES } from "@/data/villageData";
import useCharacterStore from "@/store/characterStore";
import { useState } from "react";
import Village from "./Village";
import { MENU_TYPES, type MenuType } from "@/types/mainTypes";
import MetaMenu from "./MetaMenu";

const Main: React.FC = () => {
    const { currentVillage } = useCharacterStore();
    const village = VILLAGES[currentVillage ?? "greenForest"];
    const [activeMain, setActiveMain] = useState<MenuType>(MENU_TYPES.VILLAGE);

    return (
        <>
            {activeMain === MENU_TYPES.VILLAGE && (
                <Village village={village} onMenuChange={setActiveMain} />
            )}
            <MetaMenu></MetaMenu>
        </>
    );
};

export default Main;
