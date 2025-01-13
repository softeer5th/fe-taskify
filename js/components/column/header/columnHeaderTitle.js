export const columnHeaderTitle = (title) => {
    const columnHeaderTitle = document.createElement("div");
    columnHeaderTitle.className = "column-header-title";
    columnHeaderTitle.textContent = title;
    return columnHeaderTitle;
} 