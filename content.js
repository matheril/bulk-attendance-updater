console.log("Attendance Updater content script loaded.");

let selectedElements = [];
let skipEmptyDropdowns = true;

// Adds dropdown to select what to paint with
const paintSelector = document.querySelector(".attendance-main-contents-inner");

if (paintSelector) {
    const mainLabel = document.createElement("label");
    mainLabel.textContent = "一括変更: ";

    const select = document.createElement("select");
    select.style.marginLeft = "4px";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- 選択 --";
    select.appendChild(defaultOption);

    const options = [
        { value: "54027", label: "【オフィス出勤】正社員（フレックス休憩無し）" },
        { value: "54026", label: "【オフィス出勤】正社員（フレックス）" },
        { value: "24011", label: "正社員（フレックス休憩無し）" },
        { value: "11332", label: "正社員（フレックス）" }
    ];

    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.label;
        select.appendChild(option);
    });

    const applyButton = createApplyButton();
    const selectAllButton = createSelectAllButton();
    const skipEmptyDropdownsCheckboxContainer = createSkipEmptyDropdownsCheckbox();

    mainLabel.appendChild(select);
    mainLabel.appendChild(applyButton);
    mainLabel.appendChild(selectAllButton);
    mainLabel.appendChild(skipEmptyDropdownsCheckboxContainer);
    paintSelector.prepend(mainLabel);
}

function createApplyButton() {
    const applyButton = document.createElement("button");
    applyButton.textContent = "Apply";
    applyButton.style.marginLeft = "5px";
    applyButton.addEventListener("click", () => {
        const bulkChangeSelect = paintSelector.querySelector("select");
        const selectedValue = bulkChangeSelect.value;

        if (!selectedValue) {
            alert("Please select a value from the '一括変更' dropdown to apply.");
            return;
        }
        if (selectedElements.length === 0) {
            alert("No dropdowns have been selected. Hold Shift and hover over dropdowns to select them, or Alt and hover to deselect, or use 'Select All'.");
            return;
        }

        console.log(`Applying value '${selectedValue}' to ${selectedElements.length} dropdowns.`);
        selectedElements.forEach(dropdown => {
            updateSelectOption(dropdown, selectedValue);
        });

        selectedElements.forEach(el => el.classList.remove('selectable-highlight'));
        selectedElements = [];
        console.log("Bulk action applied and selection cleared.");
    });
    return applyButton;
}

function createSelectAllButton() {
    const button = document.createElement("button");
    button.textContent = "Select All";
    button.style.marginLeft = "5px";
    button.addEventListener("click", () => {
        const allMatchingDropdowns = document.querySelectorAll(".column-pattern .attendance-select-field");
        let newlySelectedCount = 0;
        
        allMatchingDropdowns.forEach(dropdown => {
            if (skipEmptyDropdowns && dropdown.value === "") {
                console.log("Select All: Skipping empty dropdown due to toggle.", dropdown);
                return;
            }

            if (!selectedElements.includes(dropdown)) {
                selectedElements.push(dropdown);
                dropdown.classList.add('selectable-highlight');
                newlySelectedCount++;
            }
        });
        console.log(`Select All: Added ${newlySelectedCount} dropdowns. Total selected: ${selectedElements.length}`);
    });
    return button;
}

function createSkipEmptyDropdownsCheckbox() {
    const checkboxLabel = document.createElement('label');
    checkboxLabel.textContent = " Skip empty: ";
    checkboxLabel.style.marginLeft = "10px";

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = skipEmptyDropdowns;

    checkbox.addEventListener('change', (event) => {
        skipEmptyDropdowns = event.target.checked;
        console.log(`Skip empty dropdowns toggled to: ${skipEmptyDropdowns}`);
    });

    checkboxLabel.appendChild(checkbox);
    return checkboxLabel;
}

// handle mouse hover for selection/deselection
function handleDropdownMouseOver(e) {
    const dropdown = e.target;
    if (!(dropdown instanceof HTMLSelectElement) || !dropdown.classList.contains('attendance-select-field')) {
        return;
    }
    if (skipEmptyDropdowns && dropdown.value === "") {
        console.log("Skipping empty dropdown due to toggle.");
        return;
    }

    if (e.shiftKey) { // Select with Shift
        if (!selectedElements.includes(dropdown)) {
            selectedElements.push(dropdown);
            dropdown.classList.add('selectable-highlight');
            console.log(`Selected: ${dropdown.name || 'Unnamed Select'}. Total selected: ${selectedElements.length}`);
        }
    } else if (e.altKey) { // Deselect with Alt
        if (selectedElements.includes(dropdown)) {
            selectedElements = selectedElements.filter(el => el !== dropdown);
            dropdown.classList.remove('selectable-highlight');
            console.log(`Deselected: ${dropdown.name || 'Unnamed Select'}. Total selected: ${selectedElements.length}`);
        }
    }
}

function initializeHoverSelection() {
    const container = document.body;
    container.addEventListener('mouseover', handleDropdownMouseOver);
    console.log("Hover selection initialized on the document body for 'attendance-select-field' elements.");
}

initializeHoverSelection();

function updateSelectOption(selectElement, valueToSelect) {
    if (selectElement && selectElement instanceof HTMLSelectElement) {
        const options = selectElement.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === valueToSelect) {
                selectElement.selectedIndex = i;
                const event = new Event('change', { bubbles: true });
                selectElement.dispatchEvent(event);
                break;
            }
        }
    } else {
        console.error('Provided element is not a SELECT dropdown or is null:', selectElement);
    }
}