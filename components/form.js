export default function FormHTML() {
    return `
            <form class="card_form card surface-default shadow-normal rounded-100">
                <input name="title" class="text-strong display-bold14" type="text" placeholder="제목을 입력하세요" maxlength="500" />
                <input name="content" class="text-default display-medium14" type="text" placeholder="내용을 입력하세요" maxlength="500" />
                <span>
                    <button class="rounded-100 surface-alt text-default display-bold14" type="button">취소</button>
                    <button class="rounded-100 surface-brand text-white-default display-bold14 disabled" disabled type="submit">제출</button>
                </span>
            </form>
        `;
}
