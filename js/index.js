import { DOMLoaded } from './blocks/Body/index.js';
import { renderRecords, toggleActivityList } from './blocks/Header/index.js';

document.addEventListener("DOMContentLoaded", () =>{
    DOMLoaded();
    toggleActivityList();
    renderRecords();
});