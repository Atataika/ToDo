'use strict'
const rmAllBtn = document.querySelector(".remove-all-btn"),
    makeToDoBtn = document.querySelector(".make-to-do-btn"),
    localStorageTasks = JSON.parse(localStorage.getItem("undoneTasks"));
let taskCounter, listItem, cacheArray;

if (localStorageTasks === null) {
    cacheArray = [];
    taskCounter = 0;
} else {
    cacheArray = localStorageTasks;
    taskCounter = cacheArray.length;
}

for (let i = 0; i < cacheArray.length; i++) {
    listItem = document.createElement("li");
    listItem.innerHTML = localStorageTasks[i];
    document.querySelector("ul").append(listItem);

    document.getElementById(`delete-${i}`).onclick = deleteTask;
    document.getElementById(`checkbox-${i}`).onchange = checkTask;
}

makeToDoBtn.addEventListener("click", function () {
    const toDoInput = document.getElementById("to-do-input").value,
        rmElemBtn = `<span id="delete-${taskCounter}">X</span>`,
        radioInput = `<input type="checkbox" id="checkbox-${taskCounter}">`,
        listItem = document.createElement('li');

    if (toDoInput === "") {
        return alert("Input must not be empty");
    }

    listItem.innerHTML = `<label>${radioInput}<span>${toDoInput}</span></label> ${rmElemBtn}`;
    document.querySelector("ul").append(listItem);

    cacheArray.push(listItem.innerHTML);
    localStorage.setItem("undoneTasks", JSON.stringify(cacheArray));

    document.getElementById(`delete-${taskCounter}`).onclick = deleteTask;
    document.getElementById(`checkbox-${taskCounter}`).onchange = checkTask;

    document.getElementById("to-do-input").value = "";
    taskCounter++;
}, false);

function deleteTask() {
    // let a = JSON.parse(localStorage.getItem('undoneTasks'));
    // a[???] = undefined;
    // a.filter(key => key !== undefined);
    this.parentElement.remove();
}

function checkTask() {
    if (this.checked) {
        this.parentElement.className = 'checked';
    } else {
        this.parentElement.className = 'unchecked';
    }
}

rmAllBtn.onclick = () => {
    const ul = document.createElement("ul");
    document.querySelector("ul").remove();
    document.querySelector("section").append(ul);
    taskCounter = 0;
    localStorage.clear();
    cacheArray = [];
};