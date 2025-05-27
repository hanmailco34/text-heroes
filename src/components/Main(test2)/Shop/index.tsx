import { useState } from "react";
import type { BaseItem } from "@/types/itemTypes";
import type { VillageShop } from "@/types/villageTypes";

type ShopCategory = "weapon" | "armor" | "consumable" | "material";

const categoryLabels: Record<ShopCategory, string> = {
    weapon: "⚔️ 무기 상점",
    armor: "🛡️ 방어구 상점",
    consumable: "🧪 물약 상점",
    material: "🪵 재료 상점",
};

interface ShopProps {
    shop: VillageShop | undefined;
    onBack: () => void;
}

const Shop: React.FC<ShopProps> = ({ shop, onBack }) => {
    const [selectedCategory, setSelectedCategory] =
        useState<ShopCategory | null>(null);

    // shop이 없는 경우 early return
    if (!shop) {
        return (
            <div className="p-4">
                <p>이 마을에는 상점이 없습니다.</p>
                <button
                    onClick={onBack}
                    className="mt-2 px-4 py-1 bg-gray-300 rounded"
                >
                    마을로 돌아가기
                </button>
            </div>
        );
    }

    const handleSelectCategory = (category: ShopCategory) => {
        setSelectedCategory(category);
    };

    const items = selectedCategory ? shop[selectedCategory] ?? [] : [];

    return (
        <div className="p-4 space-y-4">
            {!selectedCategory ? (
                <>
                    <h2 className="text-xl font-bold">🛒 상점가</h2>
                    <p>방문할 상점을 선택하세요:</p>
                    <ul className="space-y-2">
                        {(Object.keys(shop) as ShopCategory[]).map(
                            (category) => (
                                <li key={category}>
                                    <button
                                        onClick={() =>
                                            handleSelectCategory(category)
                                        }
                                        className="w-full text-left px-4 py-2 bg-green-200 hover:bg-green-300 rounded"
                                    >
                                        {categoryLabels[category]}
                                    </button>
                                </li>
                            )
                        )}
                    </ul>
                    <button
                        onClick={onBack}
                        className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                    >
                        마을로 돌아가기
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-bold">
                        {categoryLabels[selectedCategory]}
                    </h2>
                    {items.length === 0 ? (
                        <p>판매 중인 아이템이 없습니다.</p>
                    ) : (
                        <ul className="space-y-2">
                            {items.map((item: BaseItem<ShopCategory>) => (
                                <li
                                    key={item.id}
                                    className="p-2 bg-white rounded shadow"
                                >
                                    <div className="font-semibold">
                                        {item.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {item.description}
                                    </div>
                                    <div className="text-sm">
                                        가격: {item.value}G
                                    </div>
                                    <button className="mt-1 px-2 py-1 bg-blue-300 hover:bg-blue-400 rounded">
                                        구매
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="mt-4 space-x-2">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="px-4 py-2 bg-yellow-200 hover:bg-yellow-300 rounded"
                        >
                            ⬅️ 상점 선택으로
                        </button>
                        <button
                            onClick={onBack}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                        >
                            마을로 돌아가기
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Shop;
