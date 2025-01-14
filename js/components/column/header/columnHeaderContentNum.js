export const columnHeaderContentCount = (contentCount) => {
    const columnHeaderContentCount = document.createElement("div");
    columnHeaderContentCount.className = "column-header-content-num";
    const contentNumDiv = document.createElement("div");
    contentNumDiv.textContent = contentCount;
    columnHeaderContentCount.appendChild(contentNumDiv);
    return columnHeaderContentCount;
}