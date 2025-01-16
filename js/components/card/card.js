import { DynamicCard } from "./dynamicCard.js";
import { ViewCard } from "./viewCard.js";

export const Card = ({
    card,
    columnId,
    onCardDelete = null,
    onCardUpdate = null
}) => {

    const { readOnly } = card;

    if (readOnly) {
        // 카드 조회
        return ViewCard(card, columnId, onCardDelete, onCardUpdate);
    }

    // 카드 생성/편집
    return DynamicCard(card, onCardDelete, onCardUpdate);
}