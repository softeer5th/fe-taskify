import { DynamicCard } from "./dynamicCard.js";
import { ViewCard } from "./viewCard.js";

export const Card = ({
    card,
    onCardDelete,
    onCardUpdate
}) => {
    const { readOnly } = card;

    if (readOnly) {
        // 카드 조회
        return ViewCard(card);
    }

    // 카드 생성/편집
    return DynamicCard(card, onCardDelete, onCardUpdate);
}