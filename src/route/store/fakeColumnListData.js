import { CardData } from "../data/cardData.js";
import { ColumnData } from "../data/columnData.js";

export var columnData = [
        new ColumnData(
            "해야할 일",
            [
                new CardData(
                    "제목1",
                    "내용1",
                    "web"
                ),
                new CardData(
                    "제목2",
                    "내용2",
                    "web"
                ),
            ]

        ),
        new ColumnData(
            "하고 있는 일",
            [
                new CardData(
                    "제목1",
                    "내용1",
                    "web"
                ),
                new CardData(
                    "제목2",
                    "내용2",
                    "web"
                ),
                new CardData(
                    "제목3",
                    "내용3",
                    "web"
                )
            ]
        ),
        new ColumnData(
            "완료한 일"

        ),
    ]
