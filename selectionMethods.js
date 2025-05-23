// handle mouse hover for selection/deselection
function selectElement(element) {
    if (skipEmptyDropdowns && element.value === "") {
        return;
    }
    if (!selectedElements.includes(element)) {
        selectedElements.push(element);
        element.classList.add('selectable-highlight');
    }
}

function deselectElement(element) {
    if (selectedElements.includes(element)) {
        selectedElements = selectedElements.filter(el => el !== element);
        element.classList.remove('selectable-highlight');
    }
}

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
            selectElement(dropdown);
        }
    } else if (e.altKey) { // Deselect with Alt
        if (selectedElements.includes(dropdown)) {
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
    document.querySelectorAll(".attendance-table-contents .v3")
        .forEach(row => {
            const dayCell = row.querySelector('.column-day');
            const patternCell = row.querySelector('.column-pattern .attendance-select-field');
            if (dayCell && patternCell && dayCell.textContent.includes(day)) {
                selectElement(patternCell);
            }
    });
}

function selectAll() {
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
}

function invert() {
    document.querySelector(".attendance-table-contents .v3 .column-pattern .attendance-select-field")
        .forEach(element => {
            if (selectedElements.includes(element)) {
                deselectElement(element);
            } else {
                selectElement(element);
            }
        })
}