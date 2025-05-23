function isDayHoliday(dayType) {
    return (dayType.textContent.includes("休日"));
}

function selectRow(row) {
    if (skipHolidays && isDayHoliday(selectDayTypeFromRow(row))) {
        return;
    }
    selectElement(selectWorkStatusFromRow(row));
}

function deselectRow(row) {
    if (skipHolidays && isDayHoliday(selectDayTypeFromRow(row))) {
        return;
    }
    deselectElement(selectWorkStatusFromRow(row));
}

function toggleRow(row) {
    if (skipHolidays && isDayHoliday(selectDayTypeFromRow(row))) {
        return;
    }
    const workStatus = selectWorkStatusFromRow(row);
    if (selectedWorkStatuses.includes(workStatus)) {
        deselectRow(row);
    } else {
        selectRow(row);
    }
}

function selectElement(element) {
    if (!element) {
        console.warn("Attempted to select null element");
        return;
    }
    if (!selectedWorkStatuses.includes(element)) {
        selectedWorkStatuses.push(element);
        element.classList.add('selectable-highlight');
    }
}

function deselectElement(element) {
    if (!element) {
        console.warn("Attempted to deselect null element");
        return;
    }
    if (selectedWorkStatuses.includes(element)) {
        selectedWorkStatuses = selectedWorkStatuses.filter(el => el !== element);
        element.classList.remove('selectable-highlight');
    }
}

function handleDropdownMouseOver(e) {
    const dropdown = e.target;
    if (!(dropdown instanceof HTMLSelectElement) || !dropdown.classList.contains('attendance-select-field')) {
        return;
    }
    if (skipHolidays && dropdown.value === "") {
        console.log("Skipping empty dropdown due to toggle.");
        return;
    }

    if (e.shiftKey) { // Select with Shift
        if (!selectedWorkStatuses.includes(dropdown)) {
            selectElement(dropdown);
        }
    } else if (e.altKey) { // Deselect with Alt
        if (selectedWorkStatuses.includes(dropdown)) {
            deselectElement(dropdown);
        }
    }
}

function initializeHoverSelection() {
    const container = document.body;
    container.addEventListener('mouseover', handleDropdownMouseOver);
    console.log("Hover selection initialized on the document body for 'attendance-select-field' elements.");
}

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

// Select by day of the week
function selectByDay(day) {
    const rows = selectAllRows();
    rows
        .forEach(row => {
            console.log(row);
            const dayCell = selectDayFromRow(row);
            console.log(dayCell);
            if (dayCell.textContent.includes(day)) {
                toggleRow(row);
            }
    });
}

function selectAll() {
    const allWorkStatuses = selectAllWorkStatuses();

    allWorkStatuses.forEach(dropdown => {
        if (skipHolidays && dropdown.value === "") {
            console.log("Select All: Skipping empty dropdown due to toggle.", dropdown);
            return;
        }

        if (!selectedWorkStatuses.includes(dropdown)) {
            selectedWorkStatuses.push(dropdown);
            dropdown.classList.add('selectable-highlight');
        }
    });
}

function invert() {
    selectAllRows()
        .forEach(row => {
            const workStatus = selectWorkStatusFromRow(row);
            if (selectedWorkStatuses.includes(workStatus)) {
                deselectElement(workStatus);
            } else {
                selectElement(workStatus);
            }
        })
}

function toggleSkipHolidays(event) {
    skipHolidays = event.target.checked;
}

function selectAllRows() {
    return document.querySelectorAll(".attendance-table-contents tr.v3");
}

function selectAllWorkStatuses() {
    return document.querySelectorAll(".column-pattern .attendance-select-field");
}

function selectWorkStatusFromRow(row) {
    return row.querySelector(".column-pattern .attendance-select-field");
}

function selectDayFromRow(row) {
    return row.querySelector(".column-day");
}

function selectDayTypeFromRow(row) {
    return row.querySelector(".column-classification");
}