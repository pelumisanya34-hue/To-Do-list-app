const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn");
const listContainer = document .getElementById("list-container");
const taskCount = document .getElementById("task-count");
const clearAll = document . getElementById("clear-all");
const date = document . getElementById("date");
//DATE
const today = new Date();

date.innerHTML = today.toDateString();

// DEFAULT TASKS
const defaultTasks = [
    "Create portfolio page",
    "Play video games",
    "Find money",
    "Learn Javascript",
    "Build a landing page",
    "Upload project to Github",
    "Go to the gym",
    "Read a book",
    "Drink 2L of water"
];

//CREATE TASK
function createTask(taskText, completed =false){

    let li= document.createElement("li");
    
    li.innerHTML = taskText;

    if (completed){
        li.classList.add("checked");
    }

    listContainer.appendChild(li);

    let span = document. createElement("span");

    span.innerHTML = "/u00d7";

    li.appendChild(span);

    updateTaskCount();
}

// ADD TASK
function addTask(){
    if(inputBox.value === ""){
        alert ("Press enter a task");
    }
    else{
        createTask(inputBox.value);

        saveData();    
    }

    inputBox.value = "";
}

// BUTTON CLICK
addBtn.addEventListener("click",addTask);

// ENTER KEY
inputBox.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});
// TASK ACTIONS
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateTaskCount();
    }
}, false);

// CLEAR ALL
clearAll.addEventListener("click", function(){
    listContainer.innerHTML = "";
    saveData();
    updateTaskCount();
});

// UPDATE TASK COUNT
function updateTaskCount(){
    const total  = document.querySelectorAll("#list-container li").length;
    taskCount.innerHTML = total;
}

// SAVE DATA
function saveData(){
    localStorage.setItem("todoData", listContainer.innerHTML);
}

// SHOW TASKS
function showTasks(){
    if(localStorage.getItem("todoData")){
        listContainer.innerHTML = localStorage.getItem("todoData");
    }
    else{
        createTask("Create portfolio page");
        createTask("Play video games");
        createTask("Find money");
        createTask("Learn Javascript", true);
        createTask("Build a landing page", true);
        createTask("Upload project to Github", true);
        createTask("Go to the gym");
        createTask("Read a book");
        createTask("Drink 2L of water");

        saveData();
    }

    updateTaskCount();
}