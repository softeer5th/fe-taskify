import { DOMLoaded } from './blocks/Body/index.js';
import { renderRecords, toggleClockBtn } from './blocks/Header/index.js';

document.addEventListener("DOMContentLoaded", () =>{
    DOMLoaded();
    toggleClockBtn();
    renderRecords();
});