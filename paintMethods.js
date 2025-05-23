function paintCells() {
    const bulkChangeSelect = pluginContainer.querySelector("select");
    const selectedValue = bulkChangeSelect.value;

    if (selectedWorkStatuses.length === 0) {
        alert("何も選択されていません");
        return;
    }

    selectedWorkStatuses.forEach(dropdown => {
        updateSelectOption(dropdown, selectedValue);
    });

    selectedWorkStatuses.forEach(el => el.classList.remove('selectable-highlight'));
    selectedWorkStatuses = [];
}