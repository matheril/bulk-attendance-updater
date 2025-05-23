function paintCells() {
    const bulkChangeSelect = pluginContainer.querySelector("select");
    const selectedValue = bulkChangeSelect.value;

    if (!selectedValue) {
        alert("Please select a value from the '一括変更' dropdown to apply.");
        return;
    }
    if (selectedWorkStatuses.length === 0) {
        alert("No dropdowns have been selected. Hold Shift and hover over dropdowns to select them, or Alt and hover to deselect, or use 'Select All'.");
        return;
    }

    console.log(`Applying value '${selectedValue}' to ${selectedWorkStatuses.length} dropdowns.`);
    selectedWorkStatuses.forEach(dropdown => {
        updateSelectOption(dropdown, selectedValue);
    });

    selectedWorkStatuses.forEach(el => el.classList.remove('selectable-highlight'));
    selectedWorkStatuses = [];
}