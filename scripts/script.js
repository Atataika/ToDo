'use strict'
const button = document.querySelector(".makeToDoBtn"),
    rmButton = document.querySelector(".rmBtn");
let taskCounter,
    arr;
if (JSON.parse(localStorage.getItem('undoneTasks')) === null) {
    arr = [];
    taskCounter = arr.length;
} else {
    arr = JSON.parse(localStorage.getItem('undoneTasks'));
    taskCounter = arr.length;
}
render();

button.addEventListener("click", function () {
    const toDoInput = document.getElementById("ToDo-input").value,
        rmElemBtn = `<span id="delete-${taskCounter}">X</span>`,
        radioInput = `<input type="checkbox" id="checkbox-${taskCounter}">`,
        listItem = document.createElement('li');

    if (toDoInput === "") {
        return alert("Input must not be empty");
    }
    
    listItem.innerHTML = `<label>${radioInput}<span>${toDoInput}</span></label> ${rmElemBtn}`;
    arr.push(listItem.innerHTML);
    localStorage.setItem(`undoneTasks`, JSON.stringify(arr));
    document.querySelector("input").value = "";
    taskCounter++;
    render();
}, false);

function render() {
    let listItem = '';
    const ul = document.createElement("ul");
    document.querySelector("ul").remove();
    document.querySelector("section").append(ul);

    for (let i = 0; i < arr.length; i++) {
        let tmpArr = JSON.parse(localStorage.getItem('undoneTasks'));
        listItem = document.createElement('li');
        listItem.innerHTML = tmpArr[i];
        ul.append(listItem);

        document.getElementById(`delete-${i}`).onclick = function () {
            this.parentNode.remove();
        }

        document.getElementById(`checkbox-${i}`).onchange = function () {
            if (this.checked) {
                this.parentNode.className = 'checked';
            } else {
                this.parentNode.className = 'unchecked';
            }
        }
    }
}

rmButton.onclick = () => {
    taskCounter = 0;
    localStorage.clear();
    arr = [];

    render();
};