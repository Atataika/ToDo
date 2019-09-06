const button = document.querySelector("button"),
    div = document.querySelector("div");
let taskCounter = localStorage.length;
let arr;
if (JSON.parse(localStorage.getItem('undoneTasks')) === null) {
    arr = [];
} else {
    arr = JSON.parse(localStorage.getItem('undoneTasks'));
}
render();

button.addEventListener("click", function () {
    const toDoInput = document.getElementById("ToDo-input").value;
    const removeButton = `<span id="delete-${taskCounter}">X</span>`;
    const radioInput = `<input type="checkbox" id="checkbox-${taskCounter}">`;
    const listItem = document.createElement('li');

    if (toDoInput === "") {
        return alert("Input must not be empty");
    }
    listItem.innerHTML = `${removeButton}${radioInput}<span>${toDoInput}</span>`;
    arr.push(listItem.innerHTML);
    localStorage.setItem(`undoneTasks`, JSON.stringify(arr));
    document.querySelector("input").value = "";
    taskCounter++;
    render();
}, false);

function render() {
    let listItem = '';
    document.querySelector("ul").remove();
    const ul = document.createElement("ul");
    document.querySelector("body").append(ul);

    for (let i = 0; i < arr.length; i++) {
        listItem = document.createElement('li');
        let tmpArr = JSON.parse(localStorage.getItem('undoneTasks'));
        listItem.innerHTML = tmpArr[i];
        ul.append(listItem);

        document.getElementById(`delete-${i}`).onclick = () => {
            removeElem(tmpArr, i);
            // document.getElementById(`delete-${i}`).parentNode.remove();
        }

        // document.getElementById(`checkbox-${i}`).onclick = () => {
        //     document.getElementById(`checkbox-${i}`);

        //     if (checkBox.checked) {
        //         console.log('checked');
        //     } else console.log('unchecked');
        // }
    }
}

function removeElem(tmpArr, outerKey) {
    arr = [];
    tmpArr[outerKey] = null;
    for (let key of tmpArr) {
        if (key !== null) {
            arr.push(key);
        }
    }
    localStorage.setItem(`undoneTasks`, JSON.stringify(arr));
    console.log(arr);

    console.log(tmpArr);
}

div.onclick = () => {
    taskCounter = 0;
    localStorage.clear();
    arr = [];

    render();
};