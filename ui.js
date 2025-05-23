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
    applyButton.textContent = "変更";
    applyButton.style.marginLeft = "5px";
    applyButton.addEventListener("click", () => {
        paintCells();
    });
    return applyButton;
}

function createSelectAllButton() {
    const button = document.createElement("button");
    button.textContent = "全て";
    button.addEventListener("click", () => {
        selectAll();
    });
    return button;
}

function createDeselectAllButton() {
    const button = document.createElement("button");
    button.textContent = "全選択解除";
    button.style.marginLeft = "5px";
    button.addEventListener("click", () => {
        deselectAll();
    });
    return button;
}

function createInvertButton() {
    const button = document.createElement("button");
    button.textContent = "反対";
    button.addEventListener('click', () => {
        invert();
    });
    return button;
}

function createSkipEmptyCheckbox() {
    const checkboxLabel = document.createElement('label');
    checkboxLabel.textContent = "休日以外： ";
    checkboxLabel.style.marginLeft = "10px";

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = skipHolidays;

    checkbox.addEventListener('change', (event) => {
        toggleSkipHolidays(event);
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