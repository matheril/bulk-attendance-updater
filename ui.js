const DAYS_IN_WEEK = 7;

function createPaintSelectMenu() {
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
    return select;
}

function createApplyButton() {
    const applyButton = document.createElement("button");
    applyButton.textContent = "Apply";
    applyButton.style.marginLeft = "5px";
    applyButton.addEventListener("click", () => {
        const bulkChangeSelect = pluginContainer.querySelector("select");
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
    });
    return applyButton;
}

function createSelectAllButton() {
    const button = document.createElement("button");
    button.textContent = "全て";
    button.style.marginLeft = "5px";
    button.addEventListener("click", () => {
        selectAll();
    });
    return button;
}

function createInvertButton() {
    const button = document.createElement("button");
    button.textContent = "反対";
    button.addEventListener('click', () => {
        invert();
    })
}

function createSkipEmptyCheckbox() {
    const checkboxLabel = document.createElement('label');
    checkboxLabel.textContent = "休日以外： ";
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

const days = [
    "日",
    "月",
    "火",
    "水",
    "木",
    "金",
    "土"
];

function createDaySelector() {
    const dayList = document.createElement('p');
    for (let i = 0; i < DAYS_IN_WEEK; ++i) {
        const dayButton = document.createElement('button');
        dayButton.textContent = days[i];
        dayButton.addEventListener("click", () => {
            selectByDay(dayButton.textContent);
        })
        dayList.appendChild(dayButton);
    }
    return dayList;
}