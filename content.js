console.log("Attendance Updater content script loaded.");

let selectedWorkStatuses = [];
let skipHolidays = true;

const pluginContainer = document.querySelector(".attendance-main-contents-inner");

if (pluginContainer) {
    const paintInterface = document.createElement("div");
    paintInterface.textContent = "一括変更: ";
    const selectionInterface = document.createElement("div");
    selectionInterface.textContent = "選択方法: マウス＋Shift/Altまたは以下のボタン";
    selectionInterface.style.marginTop = "10px"; // Add some vertical spacing

    const paintSelectMenu = createPaintSelectMenu();
    const applyButton = createApplyButton();
    const selectAllButton = createSelectAllButton();
    const deselectAllButton = createDeselectAllButton();
    const invertButton = createInvertButton();
    const skipEmptyDropdownsCheckboxContainer = createSkipEmptyCheckbox();
    const daySelector = createDaySelector();

    paintInterface.appendChild(paintSelectMenu);
    paintInterface.appendChild(applyButton);
    selectionInterface.appendChild(daySelector);
    selectionInterface.appendChild(selectAllButton);
    selectionInterface.appendChild(deselectAllButton);
    selectionInterface.appendChild(invertButton);
    selectionInterface.appendChild(skipEmptyDropdownsCheckboxContainer);

    pluginContainer.prepend(selectionInterface);
    pluginContainer.prepend(paintInterface);

    initializeHoverSelection();
}

