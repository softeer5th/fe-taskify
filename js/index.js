import { DOMLoaded } from './blocks/Body/index.js';
import { renderRecords, toggleActivityList } from './blocks/Header/index.js';
import { initializeSort } from './blocks/Header/sort.js';

document.addEventListener("DOMContentLoaded", () =>{
    DOMLoaded();
    toggleActivityList();
    renderRecords();
    initializeSort();
});