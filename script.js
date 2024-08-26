const formEl = document.getElementById("add-to-list-form");
const addToListButtonEl = document.getElementById("add-btn");
const inputElem = document.getElementById("input-item");
const listElements = document.querySelector(".lists");


// Event Listeners
formEl.addEventListener("submit", e => e.preventDefault());
addToListButtonEl.addEventListener("click", handleAddToList);


// Functions
function handleAddToList() {
    const inputValue = inputElem.value;

    const itemsArray = getItemsFromStorage();

    if (inputValue) {
        const newObj = { itemName: inputValue, id: Date.now() };
        itemsArray.push(newObj);

        localStorage.setItem("groceryItems", JSON.stringify(itemsArray));
    }

    inputElem.value = "";
    inputElem.focus();

    renderItemsToDB();
};

function getItemsFromStorage() {
    const items = JSON.parse(localStorage.getItem("groceryItems")) || [];

    return items;
};

function renderItemsToDB() {
    const items = getItemsFromStorage();

    // if (items.length === 0) return;

    listElements.innerHTML = '';

    for (const item of items) {
        createAndAppendElements(item);
    };
};

function createAndAppendElements(item) {

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = item.itemName;

    const button = document.createElement("button");
    button.className = 'delete-item-btn';
    button.textContent = "X";
    button.addEventListener("click", function () {
        const itemId = item.id;
        const items = getItemsFromStorage();
        const newItemsArray = items.filter(item => item.id !== itemId) || [];
        console.log(newItemsArray);


        localStorage.setItem("groceryItems", JSON.stringify(newItemsArray));
        renderItemsToDB();

    });

    li.append(span, button);
    listElements.appendChild(li);
};

getItemsFromStorage();
renderItemsToDB();