'use strict'
const rmAllBtn = document.querySelector(".remove-all-btn"),
    makeToDoBtn = document.querySelector(".make-to-do-btn"),
    localStorageTasks = JSON.parse(localStorage.getItem("undoneTasks"));
let listItem, cacheArray,
    ul = document.createElement("ul");

cacheArray = localStorageTasks === null ? cacheArray = [] : cacheArray = localStorageTasks;

document.querySelector("section").append(ul);
ul.addEventListener("click", listListener, false);
makeToDoBtn.addEventListener("click", makeToDo, false);
rmAllBtn.addEventListener("click", removeAllTasks, false);

for (let key of cacheArray) {
    listItem = document.createElement("li");
    listItem.innerHTML = key;
    ul.append(listItem);
}

function makeToDo() {
    const toDoInput = document.getElementById("to-do-input").value,
        listItem = document.createElement('li'),
        radioInput = `<input type="checkbox">`,
        rmElemBtn = `<span>X</span>`;

    if (toDoInput === "") {
        return alert("Input must not be empty");
    }

    listItem.innerHTML = `<label class="unchecked">${radioInput}${toDoInput}</label>${rmElemBtn}`;

    cacheArray.push(listItem.innerHTML);
    localStorage.setItem("undoneTasks", JSON.stringify(cacheArray));

    document.getElementById("to-do-input").value = "";
    ul.append(listItem);
}

function listListener(event) {
    if (event.target.nodeName === "INPUT") {
        chengeTaskState(event);
    } else if (event.target.nodeName === "SPAN") {
        deleteTask(event);
    }
}

///// Баг при удалении завершенных тасков
///// Баг при удалении одноименных тасков
function deleteTask(e) {
    let tmpArray = JSON.parse(localStorage.getItem("undoneTasks"));

    console.log(e);
    for (let i = 0; i < tmpArray.length; i++) {
        if (e.target.parentElement.innerHTML === tmpArray[i]) {
            tmpArray[i] = undefined;
        }
    }

    tmpArray = tmpArray.filter(key => key !== undefined);
    localStorage.setItem("undoneTasks", JSON.stringify(tmpArray));
    e.target.parentElement.remove();
}

function chengeTaskState(e) {
    if (e.target.checked) {
        e.target.parentElement.className = "checked";
    } else {
        e.target.parentElement.className = 'unchecked';
    }
}

function removeAllTasks() {
    ul.remove();
    ul = document.createElement("ul");
    document.querySelector("section").append(ul);
    ul.addEventListener("click", listListener, false);
    localStorage.clear();
    cacheArray = [];
};