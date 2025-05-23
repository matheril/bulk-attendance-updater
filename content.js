console.log("Attendance Updater content script loaded.");

let selectedElements = [];
let skipEmptyDropdowns = true;

const pluginContainer = document.querySelector(".attendance-main-contents-inner");

if (pluginContainer) {
    const paintInterface = document.createElement("div");
    paintInterface.textContent = "一括変更: ";
    const selectionInterface = document.createElement("div");
    selectionInterface.textContent = "選択方法: ";
    selectionInterface.style.marginTop = "10px"; // Add some vertical spacing

    const paintSelectMenu = createPaintSelectMenu();
    const applyButton = createApplyButton();
    const selectAllButton = createSelectAllButton();
    const skipEmptyDropdownsCheckboxContainer = createSkipEmptyCheckbox();
    const daySelector = createDaySelector();

    paintInterface.appendChild(paintSelectMenu);
    paintInterface.appendChild(applyButton);
    selectionInterface.appendChild(daySelector);
    selectionInterface.appendChild(selectAllButton);
    selectionInterface.appendChild(skipEmptyDropdownsCheckboxContainer);

    pluginContainer.prepend(selectionInterface);
    pluginContainer.prepend(paintInterface);

    initializeHoverSelection();
}

